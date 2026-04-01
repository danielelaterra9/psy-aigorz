// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize form handling
    initContactForm();
});

// Smooth scroll function
function smoothScroll(event, targetId) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Scroll to top
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    closeMobileMenu();
}

// Toggle mobile menu
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

// Close mobile menu
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

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const submitLoading = document.getElementById('submitLoading');
        const formError = document.getElementById('formError');
        const formSuccess = document.getElementById('formSuccess');
        const formFields = document.getElementById('formFields');
        
        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitBtn.querySelector('svg').style.display = 'none';
        submitLoading.style.display = 'inline-flex';
        formError.style.display = 'none';
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch('https://formspree.io/f/mykbedbo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Show success message
                formFields.style.display = 'none';
                formSuccess.style.display = 'block';
                // Reinitialize icons for success message
                lucide.createIcons();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            formError.style.display = 'block';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.style.display = 'inline';
            submitBtn.querySelector('svg').style.display = 'inline';
            submitLoading.style.display = 'none';
        }
    });
}

// Reset form
function resetForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formFields = document.getElementById('formFields');
    
    form.reset();
    formSuccess.style.display = 'none';
    formFields.style.display = 'flex';
}
