/**
 * Main JavaScript File
 * Contains shared functionality across all pages
 */

// DOM Elements
const header = document.querySelector('header');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Accessibility
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
});

// Add accessibility attributes to hamburger menu
hamburger.setAttribute('aria-label', 'Toggle navigation menu');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'nav-links');

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Fixed navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Handle form submission if contact form exists
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Show success message
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset the form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    });
}

// Show form message
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Add to DOM after the button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.insertAdjacentElement('afterend', messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => messageElement.remove(), 500);
    }, 5000);
}

// Animate elements when they enter the viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS class to body when DOM is fully loaded
    document.body.classList.add('loaded');
});

// Add smooth scrolling to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update copyright year automatically
const yearSpan = document.querySelector('.copyright span');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Add form message styles
document.head.insertAdjacentHTML('beforeend', `
<style>
.form-message {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: var(--radius-sm);
    font-weight: 500;
}

.form-message.success {
    background-color: #d1fae5;
    color: #065f46;
}

.form-message.error {
    background-color: #fee2e2;
    color: #b91c1c;
}

.form-message.fade-out {
    opacity: 0;
    transition: opacity 0.5s ease;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}
</style>
`);

// Add mobile navigation styles
document.head.insertAdjacentHTML('beforeend', `
<style>
@media screen and (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background-color: var(--bg-color);
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
        transition: left 0.3s ease;
        z-index: 99;
    }
    
    .nav-links.active {
        left: 0;
    }
    
    .nav-links li {
        margin: 1.5rem 0;
    }
    
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 21px;
        cursor: pointer;
    }
    
    .bar {
        width: 100%;
        height: 3px;
        background-color: var(--text-color);
        border-radius: 3px;
        transition: all 0.3s ease;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
}
</style>
`);

// Additional functionality for hamburger menu and responsive behavior
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger and nav links
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Update ARIA expanded state
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Use feature detection instead of user agent detection
    function isMobileDevice() {
        return window.matchMedia('(max-width: 768px)').matches;
    }
    
    // Example of using feature detection
    if (isMobileDevice()) {
        // Mobile-specific code
        console.log('Mobile view detected');
    } else {
        // Desktop-specific code
        console.log('Desktop view detected');
    }
    
    // Listen for window resize to handle responsive behavior properly
    window.addEventListener('resize', function() {
        // Code that needs to adapt to screen size changes
    });
});
