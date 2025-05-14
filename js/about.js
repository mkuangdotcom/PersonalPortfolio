/**
 * About Page JavaScript
 * Contains functionality specific to the about page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animate stats counter
    animateStatCounters();
    
    // Animate timeline items when they enter the viewport
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
            
            // Alternate animation direction
            if (item.offsetLeft === 0) {
                item.classList.add('from-left');
            } else {
                item.classList.add('from-right');
            }
        });
    }
    
    // Animate education timeline container
    const educationTimeline = document.querySelector('.education-timeline');
    if (educationTimeline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(educationTimeline);
    }
    
    // Animate education cards
    const educationCards = document.querySelectorAll('.education-card');
    if (educationCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-card');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        educationCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Add timeline dots for education cards
    const educationCardsForDots = document.querySelectorAll('.education-card');
    educationCardsForDots.forEach((card, index) => {
        // Create timeline dot for each education card
        const timelineDot = document.createElement('div');
        timelineDot.className = 'timeline-dot';
        card.appendChild(timelineDot);
    });
    
    // Animate experience timeline container
    const experienceTimeline = document.querySelector('.experience-timeline');
    if (experienceTimeline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(experienceTimeline);
    }
    
    // Animate experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    if (experienceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-card');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        experienceCards.forEach(card => {
            observer.observe(card);
            
            // Add hover animation handler
            card.addEventListener('mouseenter', function() {
                const bgImage = this.querySelector('.experience-bg');
                if (bgImage) {
                    bgImage.style.opacity = '0.05';
                }
                
                const brief = this.querySelector('.experience-brief');
                const content = this.querySelector('.experience-content');
                
                if (brief && content) {
                    brief.style.opacity = '0';
                    brief.style.transform = 'translateY(-20px)';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const bgImage = this.querySelector('.experience-bg');
                if (bgImage) {
                    bgImage.style.opacity = '0';
                }
                
                const brief = this.querySelector('.experience-brief');
                const content = this.querySelector('.experience-content');
                
                if (brief && content) {
                    brief.style.opacity = '1';
                    brief.style.transform = 'translateY(0)';
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';
                }
            });
        });
    }
    
    // Skills progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percentage = entry.target.getAttribute('data-percentage');
                    entry.target.style.width = percentage + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
});

/**
 * Animates the stat number counters with a counting effect
 */
function animateStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // ms
                const step = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counter.setAttribute('data-target', counter.textContent);
        counter.textContent = '0';
        observer.observe(counter);
    });
}

// Add custom styles for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.timeline-item {
    opacity: 0;
    transition: all 0.8s ease;
}

.timeline-item.from-left {
    transform: translateX(-50px);
}

.timeline-item.from-right {
    transform: translateX(50px);
}

.timeline-item.animate-timeline {
    opacity: 1;
    transform: translateX(0);
}

.education-card, .experience-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.education-card.animate-card, .experience-card.animate-card {
    opacity: 1;
    transform: translateY(0);
}

.education-timeline::before, 
.experience-timeline::before {
    /* Removing the vertical timeline line */
    display: none;
}

.education-timeline.animate-timeline::before, 
.experience-timeline.animate-timeline::before {
    /* Removed animation for timeline line */
    display: none;
}

.experience-card:hover .experience-brief {
    opacity: 0 !important;
    transform: translateY(0) !important;
}

.experience-card:hover .experience-content {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.experience-card:hover .experience-bg {
    opacity: 0.1 !important;
    filter: blur(4px);
}

.skill-tag {
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 0.5s forwards;
}

.skill-tag:nth-child(1) { animation-delay: 0.1s; }
.skill-tag:nth-child(2) { animation-delay: 0.15s; }
.skill-tag:nth-child(3) { animation-delay: 0.2s; }
.skill-tag:nth-child(4) { animation-delay: 0.25s; }
.skill-tag:nth-child(5) { animation-delay: 0.3s; }
.skill-tag:nth-child(6) { animation-delay: 0.35s; }
.skill-tag:nth-child(7) { animation-delay: 0.4s; }
.skill-tag:nth-child(8) { animation-delay: 0.45s; }
.skill-tag:nth-child(9) { animation-delay: 0.5s; }
.skill-tag:nth-child(10) { animation-delay: 0.55s; }
.skill-tag:nth-child(11) { animation-delay: 0.6s; }
.skill-tag:nth-child(12) { animation-delay: 0.65s; }
.skill-tag:nth-child(13) { animation-delay: 0.7s; }
.skill-tag:nth-child(14) { animation-delay: 0.75s; }
.skill-tag:nth-child(15) { animation-delay: 0.8s; }
.skill-tag:nth-child(16) { animation-delay: 0.85s; }
.skill-tag:nth-child(17) { animation-delay: 0.9s; }
.skill-tag:nth-child(18) { animation-delay: 0.95s; }
.skill-tag:nth-child(19) { animation-delay: 1s; }
.skill-tag:nth-child(20) { animation-delay: 1.05s; }

.timeline-dot {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--primary-color);
    right: -26px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

@media screen and (max-width: 768px) {
    .timeline-dot {
        display: none;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media screen and (max-width: 992px) {
    .timeline-item.from-left,
    .timeline-item.from-right {
        transform: translateX(-30px);
    }
}
</style>
`);

// Parallax effect on about hero image
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const aboutImage = document.querySelector('.about-hero-image');
    
    if (aboutImage && window.innerWidth > 768) {
        aboutImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
    }
});
