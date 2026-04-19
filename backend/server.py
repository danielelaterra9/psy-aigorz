from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
import asyncio
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first so it is available everywhere
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# SMTP configuration (Infomaniak or any SMTP provider)
SMTP_HOST = os.environ.get('SMTP_HOST', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM = os.environ.get('SMTP_FROM', 'noreply@psy-aigroz.ch')

# Destination email — always Sophie's address
SOPHIE_EMAIL = 'sophie.aigroz@gmail.com'

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============================================================
# MODELS
# ============================================================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactRequest(BaseModel):
    nom: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    telephone: str = Field(..., min_length=10, max_length=20)
    consultation_pour: str  # soi-meme, couple, famille, enfant
    situation: str = Field(..., min_length=10, max_length=1000)
    motif: str = Field(..., min_length=10, max_length=500)

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: str
    telephone: str
    consultation_pour: str
    situation: str
    motif: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False

# ============================================================
# EMAIL SERVICE
# ============================================================

def _send_smtp_email(to: str, subject: str, html_content: str) -> bool:
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = SMTP_FROM
    msg['To'] = to
    msg.attach(MIMEText(html_content, 'html', 'utf-8'))
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
        server.ehlo()
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_FROM, [to], msg.as_string())
    return True

async def send_email(to: str, subject: str, html_content: str) -> bool:
    if SMTP_HOST and SMTP_USER and SMTP_PASSWORD:
        try:
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, _send_smtp_email, to, subject, html_content)
            logger.info(f"Email sent via SMTP to {to}")
            return True
        except Exception as e:
            logger.error(f"SMTP send failed: {e}")
    else:
        logger.warning("SMTP not configured — logging email instead of sending")
    logger.info(f"[MOCK EMAIL] To: {to} | Subject: {subject}")
    return False

def _build_notification_html(contact: dict) -> str:
    consultation_map = {
        'soi-meme': 'Pour soi-même',
        'couple': 'En couple',
        'famille': 'En famille',
        'enfant': 'Pour un enfant',
    }
    label = consultation_map.get(contact.get('consultation_pour', ''), contact.get('consultation_pour', ''))
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: Arial, sans-serif; background:#f5f5f5; padding:30px; }}
    .box {{ background:#ffffff; border-radius:8px; padding:30px; max-width:600px; margin:auto; }}
    h2 {{ color:#5a7a6a; }}
    .field {{ margin-bottom:12px; }}
    .label {{ font-weight:bold; color:#444; }}
    .value {{ color:#222; }}
    .footer {{ margin-top:24px; font-size:12px; color:#999; }}
  </style>
</head>
<body>
  <div class="box">
    <h2>Nouvelle demande de contact — psy-aigroz.ch</h2>
    <div class="field"><span class="label">Nom :</span> <span class="value">{contact['nom']}</span></div>
    <div class="field"><span class="label">Email :</span> <span class="value">{contact['email']}</span></div>
    <div class="field"><span class="label">Téléphone :</span> <span class="value">{contact['telephone']}</span></div>
    <div class="field"><span class="label">Consultation pour :</span> <span class="value">{label}</span></div>
    <div class="field"><span class="label">Motif :</span> <span class="value">{contact['motif']}</span></div>
    <div class="field"><span class="label">Situation :</span><br><span class="value">{contact['situation']}</span></div>
    <div class="footer">Message envoyé depuis le site psy-aigroz.ch</div>
  </div>
</body>
</html>"""

def _build_confirmation_html(nom: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: Arial, sans-serif; background:#f5f5f5; padding:30px; }}
    .box {{ background:#ffffff; border-radius:8px; padding:30px; max-width:600px; margin:auto; }}
    h2 {{ color:#5a7a6a; }}
    p {{ color:#333; line-height:1.6; }}
    .footer {{ margin-top:24px; font-size:12px; color:#999; }}
  </style>
</head>
<body>
  <div class="box">
    <h2>Merci pour votre message, {nom} !</h2>
    <p>Votre demande a bien été reçue. Je vous contacterai dans les plus brefs délais pour convenir d'un entretien téléphonique.</p>
    <p>À bientôt,<br><strong>Sophie Aigroz</strong><br>Psychologue FSP</p>
    <div class="footer">sophie.aigroz@gmail.com · 079 285 62 09 · 1907 Saxon, Valais</div>
  </div>
</body>
</html>"""

# ============================================================
# ROUTES
# ============================================================

@api_router.get("/")
async def root():
    return {"message": "Sophie Aigroz - Psychologue FSP API"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    contact_obj = ContactResponse(
        nom=request.nom,
        email=request.email,
        telephone=request.telephone,
        consultation_pour=request.consultation_pour,
        situation=request.situation,
        motif=request.motif,
    )
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_requests.insert_one(doc)

    email_sent = await send_email(
        to=SOPHIE_EMAIL,
        subject=f"Nouvelle demande de contact de {request.nom} — psy-aigroz.ch",
        html_content=_build_notification_html(doc),
    )
    await send_email(
        to=request.email,
        subject="Votre demande de contact — Sophie Aigroz, Psychologue FSP",
        html_content=_build_confirmation_html(request.nom),
    )
    contact_obj.email_sent = email_sent
    logger.info(f"Contact request processed: {request.nom} ({request.email}) — email_sent={email_sent}")
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts():
    contacts = await db.contact_requests.find({}, {"_id": 0}).to_list(1000)
    for c in contacts:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return contacts

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# ============================================================
# APP SETUP
# ============================================================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
