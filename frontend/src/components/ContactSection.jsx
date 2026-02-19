import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, Phone, Mail, MapPin, Clock, Video } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    consultation_pour: '',
    situation: '',
    motif: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, consultation_pour: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success('Votre demande a été envoyée avec succès. Sophie Aigroz vous contactera prochainement.');
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        consultation_pour: '',
        situation: '',
        motif: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultationOptions = [
    { value: 'soi-meme', label: 'Pour moi-même' },
    { value: 'couple', label: 'Pour mon couple' },
    { value: 'famille', label: 'Pour ma famille' },
    { value: 'enfant', label: 'Pour mon enfant / adolescent·e' },
    { value: 'coparentalite', label: 'Pour une question de coparentalité' },
  ];

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-32 bg-white"
      data-testid="contact-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-[#CD5D45] text-sm font-medium tracking-widest uppercase mb-4">
              Prendre contact
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#2D3339] font-medium mb-6">
              Demander un Entretien
            </h2>
            <p className="text-[#5C6269] text-lg leading-relaxed mb-8">
              Avant tout premier rendez-vous, je propose un entretien téléphonique 
              afin de mieux comprendre votre situation et vos attentes.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <a 
                href="tel:0792856209" 
                className="flex items-center gap-4 group"
                data-testid="contact-phone-link"
              >
                <div className="w-12 h-12 rounded-full bg-[#CD5D45]/10 flex items-center justify-center group-hover:bg-[#CD5D45]/20 transition-colors">
                  <Phone size={20} className="text-[#CD5D45]" />
                </div>
                <div>
                  <p className="text-sm text-[#5C6269]">Téléphone</p>
                  <p className="text-[#2D3339] font-medium group-hover:text-[#CD5D45] transition-colors">
                    079 285 62 09
                  </p>
                </div>
              </a>

              <a 
                href="mailto:sophie.aigroz@gmail.com" 
                className="flex items-center gap-4 group"
                data-testid="contact-email-link"
              >
                <div className="w-12 h-12 rounded-full bg-[#CD5D45]/10 flex items-center justify-center group-hover:bg-[#CD5D45]/20 transition-colors">
                  <Mail size={20} className="text-[#CD5D45]" />
                </div>
                <div>
                  <p className="text-sm text-[#5C6269]">Email</p>
                  <p className="text-[#2D3339] font-medium group-hover:text-[#CD5D45] transition-colors">
                    sophie.aigroz@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CD5D45]/10 flex items-center justify-center">
                  <MapPin size={20} className="text-[#CD5D45]" />
                </div>
                <div>
                  <p className="text-sm text-[#5C6269]">Localisation</p>
                  <p className="text-[#2D3339] font-medium">1907 Saxon, Valais</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CD5D45]/10 flex items-center justify-center">
                  <Clock size={20} className="text-[#CD5D45]" />
                </div>
                <div>
                  <p className="text-sm text-[#5C6269]">Horaires</p>
                  <p className="text-[#2D3339] font-medium">Lundi et Mercredi: 08h00 - 18h00</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#CD5D45]/10 flex items-center justify-center">
                  <Video size={20} className="text-[#CD5D45]" />
                </div>
                <div>
                  <p className="text-sm text-[#5C6269]">Consultations en ligne</p>
                  <p className="text-[#2D3339] font-medium">Disponibles sur demande</p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#FDFBF7] rounded-xl p-6 border border-[#E5E5E0]">
              <p className="text-[#5C6269] text-sm leading-relaxed">
                <strong className="text-[#2D3339]">Uniquement sur rendez-vous.</strong> 
                {' '}Merci de remplir le formulaire ci-contre ou de me contacter par téléphone 
                pour convenir d'un premier entretien téléphonique.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#FDFBF7] rounded-2xl p-8 border border-[#E5E5E0]">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12" data-testid="form-success-message">
                <div className="w-16 h-16 rounded-full bg-[#CD5D45]/10 flex items-center justify-center mb-6">
                  <Send size={28} className="text-[#CD5D45]" />
                </div>
                <h3 className="font-heading text-2xl text-[#2D3339] mb-4">Demande envoyée</h3>
                <p className="text-[#5C6269] mb-6">
                  Merci pour votre message. Je vous contacterai dans les plus brefs délais 
                  pour convenir d'un entretien téléphonique.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="rounded-full"
                  data-testid="form-new-request-button"
                >
                  Nouvelle demande
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="nom" className="text-[#2D3339] font-medium">
                    Nom complet *
                  </Label>
                  <Input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom et prénom"
                    className="mt-2 bg-white border-[#E5E5E0] focus:border-[#CD5D45] focus:ring-[#CD5D45]/20"
                    data-testid="form-input-nom"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-[#2D3339] font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.ch"
                      className="mt-2 bg-white border-[#E5E5E0] focus:border-[#CD5D45] focus:ring-[#CD5D45]/20"
                      data-testid="form-input-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone" className="text-[#2D3339] font-medium">
                      Téléphone *
                    </Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="079 123 45 67"
                      className="mt-2 bg-white border-[#E5E5E0] focus:border-[#CD5D45] focus:ring-[#CD5D45]/20"
                      data-testid="form-input-telephone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="consultation_pour" className="text-[#2D3339] font-medium">
                    Cette consultation est pour *
                  </Label>
                  <Select 
                    value={formData.consultation_pour} 
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger 
                      className="mt-2 bg-white border-[#E5E5E0] focus:border-[#CD5D45] focus:ring-[#CD5D45]/20"
                      data-testid="form-select-consultation"
                    >
                      <SelectValue placeholder="Choisissez une option" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          data-testid={`form-option-${option.value}`}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="situation" className="text-[#2D3339] font-medium">
                    Décrivez brièvement votre situation *
                  </Label>
                  <Textarea
                    id="situation"
                    name="situation"
                    required
                    value={formData.situation}
                    onChange={handleChange}
                    placeholder="Quelques mots sur votre situation actuelle..."
                    rows={3}
                    className="mt-2 bg-white border-[#E5E5E0] focus:border-[#CD5D45] focus:ring-[#CD5D45]/20 resize-none"
                    data-testid="form-textarea-situation"
                  />
                </div>

                <div>
                  <Label htmlFor="motif" className="text-[#2D3339] font-medium">
                    Motif principal de la demande *
                  </Label>
                  <Textarea
                    id="motif"
                    name="motif"
                    required
                    value={formData.motif}
                    onChange={handleChange}
                    placeholder="Qu'est-ce qui vous amène à consulter aujourd'hui ?"
                    rows={3}
                    className="mt-2 bg-white border-[#E5E5E0] focus:border-[#CD5D45] focus:ring-[#CD5D45]/20 resize-none"
                    data-testid="form-textarea-motif"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary rounded-full py-3 text-base font-medium"
                  data-testid="form-submit-button"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Envoyer ma demande
                      <Send size={18} />
                    </span>
                  )}
                </Button>

                <p className="text-xs text-[#5C6269] text-center">
                  Vos données sont traitées de manière confidentielle et ne seront jamais partagées.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
