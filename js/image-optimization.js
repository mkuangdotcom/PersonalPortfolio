/**
 * Image Optimization and Lazy Loading
 * 
 * This script handles lazy loading of images to improve performance
 * and implements best practices for image loading
 */

document.addEventListener('DOMContentLoaded', () => {
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    const images = document.querySelectorAll('img[data-src]');
    
    if (supportsIntersectionObserver) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.src = img.dataset.src;
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('img-loaded');
                    
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px'
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
            
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
            
            img.classList.add('img-loaded');
        });
    }
});

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
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.setAttribute('width', 'auto');
            img.setAttribute('height', 'auto');
        }
        
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

window.addEventListener('load', updateImagesForResponsiveness);

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

checkWebpSupport();
