// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initNavbarScroll();
    initContactForm();
});

// Smooth scroll
function smoothScroll(event, targetId) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        closeMobileMenu();
    }
}

function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
}

// Mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    mobileMenu.classList.remove('open');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Contact form — sends to backend /api/contact
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const submitBtn     = document.getElementById('submitBtn');
        const submitText    = document.getElementById('submitText');
        const submitLoading = document.getElementById('submitLoading');
        const formError     = document.getElementById('formError');
        const formSuccess   = document.getElementById('formSuccess');
        const formFields    = document.getElementById('formFields');

        // Loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        const btnIcon = submitBtn.querySelector('svg');
        if (btnIcon) btnIcon.style.display = 'none';
        submitLoading.style.display = 'inline-flex';
        formError.style.display = 'none';

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Same origin in production; override via data-backend-url on <form> for local dev
            const backendBase = form.dataset.backendUrl || window.location.origin;
            const apiUrl = `${backendBase}/api/contact`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nom:               data.nom               || data.name || '',
                    email:             data.email,
                    telephone:         data.telephone         || data.phone || '',
                    consultation_pour: data.consultation_pour || data['consultation-pour'] || 'soi-meme',
                    situation:         data.situation,
                    motif:             data.motif
                })
            });

            if (response.ok) {
                formFields.style.display = 'none';
                formSuccess.style.display = 'block';
                lucide.createIcons();
            } else {
                const err = await response.json().catch(() => ({}));
                console.error('Server error:', err);
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            formError.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            const btnIcon2 = submitBtn.querySelector('svg');
            if (btnIcon2) btnIcon2.style.display = 'inline';
            submitLoading.style.display = 'none';
        }
    });
}

// Reset form after success
function resetForm() {
    const form        = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formFields  = document.getElementById('formFields');
    form.reset();
    formSuccess.style.display = 'none';
    formFields.style.display  = 'flex';
}
