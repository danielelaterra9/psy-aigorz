# PRD - Sophie Aigroz Psychologue FSP

## Original Problem Statement
Créer un site web en français pour Sophie Aigroz, Psychologue FSP basée à Saxon, Valais (Suisse). Site one-page professionnel avec:
- Informations de contact (079 285 62 09, sophie.aigroz@gmail.com)
- Horaires: Lundi et Mercredi 8h00-18h00
- Services: Thérapies relationnelles, Soutien à la parentalité, Suivis individuels
- Formulaire de contact détaillé avec consultation téléphonique préalable
- Style inspiré de David Mariaux Psychologue FSP
- Logo fourni par le client

## User Personas
1. **Individus** - Adultes/adolescents cherchant un accompagnement pour difficultés émotionnelles
2. **Couples** - Partenaires en difficulté relationnelle
3. **Familles** - Parents et familles en situation de crise
4. **Parents** - Cherchant guidance parentale ou accompagnement burn-out parental

## Core Requirements (Static)
- Site en français (fr-CH)
- Design sobre et professionnel (tons beige/blanc/gris avec accents terre cuite)
- Navigation fluide avec scroll smooth
- Formulaire de contact avec champs: nom, email, téléphone, type de consultation, situation, motif
- Responsive (mobile, tablet, desktop)
- Logo personnalisé intégré

## What's Been Implemented (December 2024)
### MVP Complete ✅
- [x] Navigation fixe avec logo et liens
- [x] Section Hero avec photo placeholder et informations clés
- [x] Section Services (3 catégories avec détails)
- [x] Section Approche (approche systémique)
- [x] Section Contact avec formulaire complet
- [x] Footer avec coordonnées
- [x] Backend API pour sauvegarder les demandes de contact
- [x] Design responsive
- [x] Animations d'entrée

### Technical Stack
- Frontend: React 19 + Tailwind CSS + Shadcn/UI
- Backend: FastAPI + MongoDB
- Fonts: Playfair Display (headings) + Mulish (body)

## Prioritized Backlog
### P0 (Bloquant)
- [ ] Intégration Resend pour envoi email (en attente de clé API)

### P1 (Important)
- [ ] Remplacer photo placeholder par vraie photo de Sophie Aigroz
- [ ] SEO meta tags et optimisation

### P2 (Nice to have)
- [ ] Animation de scroll plus fluide (Lenis)
- [ ] Mode sombre optionnel

## Next Tasks
1. Attendre validation client de la preview
2. Obtenir clé API Resend pour activer l'envoi email
3. Remplacer la photo placeholder
4. Configurer le domaine www.psy-aigroz.ch
