/**
 * Performance Optimization JavaScript
 * Improves website performance without breaking the design
 */

document.addEventListener('DOMContentLoaded', () => {
    optimizeImages();
    deferNonCriticalJS();
    optimizeAnimations();
    setupLazyLoading();
    optimizeFontLoading();
});

/**
 * Optimize image loading by implementing proper lazy loading
 */
function optimizeImages() {
    const images = document.querySelectorAll('img[data-lazy="true"]');
    
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        } else {
            lazyLoadImage(img);
        }
    });
}

/**
 * Lazy load an image using Intersection Observer API
 */
function lazyLoadImage(img) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                }
                observer.unobserve(image);
            }
        });
    });
    
    observer.observe(img);
}

/**
 * Defer loading of non-critical JavaScript
 */
function deferNonCriticalJS() {
    const scripts = document.querySelectorAll('script[data-defer="true"]');
    
    scripts.forEach(script => {
        script.setAttribute('defer', '');
    });
}

/**
 * Optimize animations to reduce repaints and layout shifts
 */
function optimizeAnimations() {
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        document.body.classList.add('home-page');
    }
    
    const animatedElements = document.querySelectorAll('.animate-reveal');
    
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            if (el.classList.contains('project-card') || 
                el.classList.contains('skills-container') ||
                el.tagName === 'SECTION') {
                el.style.minHeight = '200px';
            }
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animatedElements.forEach(el => {
            if (document.body.classList.contains('home-page') || 
                !el.classList.contains('project-card') && 
                !el.classList.contains('skills-container')) {
                observer.observe(el);
            } else {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
}

/**
 * Setup Intersection Observer for lazy loading elements
 */
function setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy-load="true"]');
    
    if (lazyElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        lazyElements.forEach(element => {
            observer.observe(element);
        });
    }
}

/**
 * Optimize font loading to prevent FOIT (Flash of Invisible Text)
 */
function optimizeFontLoading() {
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    } else {
        document.documentElement.classList.add('fonts-loaded');
    }
}
