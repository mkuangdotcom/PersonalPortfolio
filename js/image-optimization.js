/**
 * Image Optimization and Lazy Loading
 * 
 * This script handles lazy loading of images to improve performance
 * and implements best practices for image loading
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for browser support
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    // Handle all images on the page
    const images = document.querySelectorAll('img[data-src]');
    
    if (supportsIntersectionObserver) {
        // Use Intersection Observer API for modern browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Replace src with data-src
                    img.src = img.dataset.src;
                    
                    // If there's a srcset defined, update that too
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    // Add loaded class for fade-in effect
                    img.classList.add('img-loaded');
                    
                    // Stop observing image after it's loaded
                    observer.unobserve(img);
                }
            });
        }, {
            // Start loading when image is 10% in view
            threshold: 0.1,
            // Start loading when image is 200px near viewport
            rootMargin: '0px 0px 200px 0px'
        });
        
        // Observe each image
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        // Simple approach - load all images immediately
        images.forEach(img => {
            img.src = img.dataset.src;
            
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
            
            img.classList.add('img-loaded');
        });
    }
});

// Add faded in effect for lazy loaded images
document.head.insertAdjacentHTML('beforeend', `
<style>
img[data-src] {
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.img-loaded {
    opacity: 1;
}
</style>
`);

/**
 * Add responsive image support
 * Use with img tag like:
 * <img data-src="image.jpg" data-srcset="image-sm.jpg 480w, image-md.jpg 768w, image-lg.jpg 1280w" sizes="(max-width: 600px) 100vw, 50vw" alt="Description">
 */
function updateImagesForResponsiveness() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add width and height attributes if missing to prevent layout shifts
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.setAttribute('width', 'auto');
            img.setAttribute('height', 'auto');
        }
        
        // Add loading="lazy" for browsers that support native lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Update images when DOM is fully loaded
window.addEventListener('load', updateImagesForResponsiveness);

// Implement WebP detection and image replacement if needed
function checkWebpSupport() {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    
    webP.onload = function() {
        const hasWebP = (webP.width > 0) && (webP.height > 0);
        document.documentElement.classList.add(hasWebP ? 'webp' : 'no-webp');
    };
    
    webP.onerror = function() {
        document.documentElement.classList.add('no-webp');
    };
}

// Check WebP support
checkWebpSupport();
