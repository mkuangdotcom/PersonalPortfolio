/**
 * Projects Page JavaScript
 * Contains functionality specific to the projects page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Project filtering functionality
    setupProjectFilters();
    
    // Project modal functionality
    setupProjectModals();
    
    // Pre-render all project items instead of animating them
    preRenderProjects();
});

/**
 * Project details data
 */
const projectsData = {
    attendease: {
        title: "AttendEase",
        description: "Facial recognition attendance system that automatically identifies individuals based on their facial features.",
        img: "assets/images/attendease.webp",
        features: [
            "Implemented facial recognition using OpenCV and Dlib",
            "Created database to store attendance data",
            "Built intuitive UI for easy record management",
            "Real-time face detection and recognition"
        ],
        technologies: ["Python", "OpenCV", "Dlib", "SQL", "Machine Learning"],
        repoUrl: "https://github.com/mkuangdotcom/AttendEase",
        category: "machine-learning"
    },
    frauddetection: {
        title: "Fraud Detection Model",
        description: "A neural network model for identifying fraudulent transactions with precision.",
        img: "assets/images/fraud-detection.webp",
        features: [
            "Uses SMOTE for balancing imbalanced datasets",
            "Implements Keras neural network architecture",
            "Achieves high precision in fraud identification",
            "Includes advanced data preprocessing pipelines"
        ],
        technologies: ["Python", "Keras", "TensorFlow", "SMOTE", "Machine Learning"],
        repoUrl: "https://github.com/mkuangdotcom/Fraud_Detection",
        category: "machine-learning"
    },
    cropmaster: {
        title: "CropMaster",
        description: "Satellite-powered farm intelligence that revolutionizes crop yields through AI.",
        img: "assets/images/cropmaster.webp",
        features: [
            "AI-driven crop analysis from satellite imagery",
            "Yield optimization recommendations",
            "Interactive dashboard for farm management",
            "Data visualization for agricultural metrics"
        ],
        technologies: ["Flutter", "Dart", "AI/ML", "Firebase"],
        repoUrl: "https://github.com/NickolasChen04/cropmaster",
        category: "full-stack"
    },
    mexassistant: {
        title: "MEX Assistant",
        description: "A React & Django platform delivering merchant business insights via an AI assistant.",
        img: "assets/images/mex-assistant.webp",
        features: [
            "AI-powered analytics with chatbot interface",
            "Interactive dashboards using Chart.js",
            "RESTful APIs for data processing",
            "Tailwind CSS for modern UI design"
        ],
        technologies: ["React.js", "Django", "Tailwind CSS", "Chart.js"],
        repoUrl: "https://github.com/lingyuqian0301/LLF",
        category: "full-stack"
    }
};

/**
 * Sets up the project filtering functionality
 */
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categorySections = document.querySelectorAll('.category-section');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Handle showing/hiding sections based on filter
            if (filterValue === 'all') {
                // Show all category sections
                categorySections.forEach(section => {
                    section.style.display = 'block';
                    
                    // Animate each section
                    setTimeout(() => {
                        section.style.opacity = 1;
                        section.style.transform = 'translateY(0)';
                    }, 100);
                });
            } else {
                // Show only the selected category section, hide others
                categorySections.forEach(section => {
                    const sectionId = section.id;
                    
                    if (sectionId === `${filterValue}-projects`) {
                        section.style.display = 'block';
                        
                        // Animate the section
                        setTimeout(() => {
                            section.style.opacity = 1;
                            section.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
            
            // Smooth scroll to the first visible section
            setTimeout(() => {
                const firstVisibleSection = document.querySelector('.category-section[style="display: block;"]');
                if (firstVisibleSection) {
                    firstVisibleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    });
}

/**
 * Sets up the project modal functionality
 * Note: Since we're now using direct GitHub links instead of detail buttons, 
 * we'll keep this function for potential future use but modify it to work with 
 * clicking on project cards instead.
 */
function setupProjectModals() {
    const projectItems = document.querySelectorAll('.project-item');
    const modal = document.querySelector('.project-modal');
    
    if (!modal || projectItems.length === 0) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');
    const modalTech = document.getElementById('modal-tech');
    const modalRepo = document.getElementById('modal-repo');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when clicking on project image
    projectItems.forEach(item => {
        const projectImage = item.querySelector('.project-image');
        if (!projectImage) return; // Skip if no image found
        
        const projectTitle = item.querySelector('h3');
        if (!projectTitle) return; // Skip if no title found
        
        const projectId = projectTitle.textContent.toLowerCase().replace(/\s+/g, '');
        
        // Use more efficient event delegation by attaching a single event listener
        projectImage.addEventListener('click', function(e) {
            // Prevent default behavior if any
            e.preventDefault();
            
            // Find project in projectsData by matching the title - use a more direct approach
            let projectKey = null;
            for (const key in projectsData) {
                if (projectsData[key].title.toLowerCase() === projectId.toLowerCase() || 
                    key.toLowerCase() === projectId.toLowerCase()) {
                    projectKey = key;
                    break;
                }
            }
            
            if (projectKey && projectsData[projectKey]) {
                const project = projectsData[projectKey];
                
                // Optimize DOM operations by doing them in batches
                // Populate modal with project data
                modalTitle.textContent = project.title;
                modalImg.src = project.img;
                modalImg.alt = project.title;
                modalDescription.textContent = project.description;
                
                // Create document fragment for better performance
                const featuresFragment = document.createDocumentFragment();
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresFragment.appendChild(li);
                });
                
                // Clear and append all at once
                modalFeatures.innerHTML = '';
                modalFeatures.appendChild(featuresFragment);
                
                // Same for tech tags
                const techFragment = document.createDocumentFragment();
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techFragment.appendChild(span);
                });
                
                modalTech.innerHTML = '';
                modalTech.appendChild(techFragment);
                
                // Set repository link
                modalRepo.href = project.repoUrl;
                
                // Show modal - use RAF for smoother animation
                requestAnimationFrame(() => {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                    
                    // Animate modal opening on next frame
                    requestAnimationFrame(() => {
                        modal.querySelector('.modal-content').classList.add('active');
                    });
                });
            }
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.querySelector('.modal-content').classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.querySelector('.modal-content').classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable scrolling
            }, 300);
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.querySelector('.modal-content').classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable scrolling
            }, 300);
        }
    });
}

/**
 * Pre-renders all project items to prevent animation layout shifts
 */
function preRenderProjects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach((item) => {
        // Remove animation delays and make content visible immediately
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.animationDelay = '0s';
    });
}

/**
 * Initializes hover effects for projects
 */
function initHoverEffects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelectorAll('.project-tech span').forEach((tag, i) => {
                tag.style.transitionDelay = `${i * 0.05}s`;
                tag.classList.add('tag-hover');
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelectorAll('.project-tech span').forEach((tag, i) => {
                tag.style.transitionDelay = '0s';
                tag.classList.remove('tag-hover');
            });
        });
    });
}

/**
 * Initializes scroll-triggered animations
 */
function initScrollEffects() {
    // Hero section parallax effect
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.projects-hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrollY * 0.003);
        }
    });
    
    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    if (sectionTitles.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    }
}

// Add custom styles for advanced animations
document.head.insertAdjacentHTML('beforeend', `
<style>
/* Tag hover animation */
.tag-hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
}

/* Title animation */
.title-animate {
    position: relative;
}

.title-animate::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    animation: lineGrow 1s forwards;
}

@keyframes lineGrow {
    to {
        width: 100px;
    }
}

/* 3D tilt effect on project cards */
.project-item {
    transform-style: preserve-3d;
    perspective: 1000px;
}

.project-content {
    transform: translateZ(20px);
    transition: transform 0.3s ease;
}

.project-image {
    backface-visibility: hidden;
}

/* Animated cursor effect for interactive elements */
.filter-btn {
    position: relative;
    overflow: hidden;
}

.filter-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.7s;
}

.filter-btn:hover::before {
    left: 100%;
}
</style>
`);

// Enable 3D tilt effect if browser supports it
if (window.DeviceOrientationEvent) {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const card = this;
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const angleX = (e.clientY - cardCenterY) / 15;
            const angleY = (cardCenterX - e.clientX) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}
