/**
 * Performance Optimization JavaScript
 * Improves website performance without breaking the design
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Optimize image loading
    optimizeImages();
    
    // 2. Defer non-critical JavaScript
    deferNonCriticalJS();
    
    // 3. Optimize animations
    optimizeAnimations();
    
    // 4. Add intersection observer for lazy loading elements
    setupLazyLoading();
    
    // 5. Optimize font loading
    optimizeFontLoading();
});

/**
 * Optimize image loading by implementing proper lazy loading
 */
function optimizeImages() {
    // Get all images that aren't critical (marked with data-lazy="true")
    const images = document.querySelectorAll('img[data-lazy="true"]');
    
    images.forEach(img => {
        // Set loading attribute to lazy
        img.setAttribute('loading', 'lazy');
        
        // Use native lazy loading with fallback
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports lazy loading
            img.loading = 'lazy';
        } else {
            // Add intersection observer fallback for older browsers
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
                // Replace data-src with src
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
    // Find scripts marked for deferring
    const scripts = document.querySelectorAll('script[data-defer="true"]');
    
    scripts.forEach(script => {
        script.setAttribute('defer', '');
    });
}

/**
 * Optimize animations to reduce repaints and improve performance
 */
function optimizeAnimations() {
    // Get all animated elements
    const animatedElements = document.querySelectorAll('.animate-reveal');
    
    // Use requestAnimationFrame for smoother animations
    if (animatedElements.length > 0) {
        window.requestAnimationFrame(() => {
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.visibility = 'visible';
                }, index * 100);
            });
        });
    }
}

/**
 * Setup Intersection Observer for lazy loading elements
 */
function setupLazyLoading() {
    // Get all elements marked for lazy loading
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
    // Add font-display: swap to ensure text remains visible during font loading
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    } else {
        // Fallback for browsers that don't support Font Loading API
        document.documentElement.classList.add('fonts-loaded');
    }
}
