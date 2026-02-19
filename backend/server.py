from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Model
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

# Routes
@api_router.get("/")
async def root():
    return {"message": "Sophie Aigroz - Psychologue FSP API"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    """Submit a contact request"""
    contact_obj = ContactResponse(
        nom=request.nom,
        email=request.email,
        telephone=request.telephone,
        consultation_pour=request.consultation_pour,
        situation=request.situation,
        motif=request.motif
    )
    
    # Convert to dict for MongoDB
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    # Save to database
    await db.contact_requests.insert_one(doc)
    
    # TODO: Send email when Resend is configured
    # For now, just log the contact request
    logger.info(f"New contact request from {request.nom} ({request.email})")
    
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts():
    """Get all contact requests (admin endpoint)"""
    contacts = await db.contact_requests.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
