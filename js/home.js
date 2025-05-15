/**
 * Home Page JavaScript
 * Contains functionality specific to the home page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Typing effect
    const typingElement = document.querySelector('.hero h2');
    if (typingElement) {
        const roles = ['Software Engineer', 'Machine Learning Specialist', 'Web Developer', 'Flutter Developer'];
        let currentRoleIndex = 0;
        
        // Start with next role
        currentRoleIndex = 1;
        
        setInterval(() => {
            typingAnimation(typingElement, roles[currentRoleIndex]);
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }, 3000);
    }
    
    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-skill');
            
            // Add hover glow effect
            card.addEventListener('mouseenter', function() {
                this.classList.add('skill-glow');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('skill-glow');
            });
        });
    }
    
    // Fix skills animation
    const skillTags = document.querySelectorAll('.skill-tag');
    if (skillTags.length > 0) {
        // Ensure animations start cleanly by explicitly setting initial state
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            // Force a browser reflow to ensure animations work properly
            void tag.offsetWidth;
            
            // Apply animation with consistent delays
            setTimeout(() => {
                tag.style.animation = `fadeInUp 0.5s forwards`;
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('card-hover');
                this.querySelector('.project-image img').classList.add('img-zoom');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('card-hover');
                this.querySelector('.project-image img').classList.remove('img-zoom');
            });
        });
    }
});

// Typing animation
function typingAnimation(element, text) {
    // Store original text
    const originalText = element.textContent;
    
    // Create a span for typing animation
    const typingSpan = document.createElement('span');
    typingSpan.classList.add('typing-text');
    
    // Replace element content
    element.textContent = '';
    element.appendChild(typingSpan);
    
    // Animation to erase current text
    let i = originalText.length;
    const eraseInterval = setInterval(() => {
        if (i > 0) {
            typingSpan.textContent = originalText.substring(0, i-1);
            i--;
        } else {
            clearInterval(eraseInterval);
            // Start typing new text
            typeText(typingSpan, text);
        }
    }, 50);
}

// Type text character by character
function typeText(element, text) {
    let i = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Add skill animation styles
document.head.insertAdjacentHTML('beforeend', `
<style>
.animate-skill {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s forwards;
}

.skill-glow {
    box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
}

.card-hover {
    transform: translateY(-10px);
}

.img-zoom {
    transform: scale(1.1);
}

.typing-text::after {
    content: '|';
    animation: blink 0.7s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
</style>
`);

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && window.innerWidth > 768) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
});
