/**
 * Timeline Fix JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get the timeline center divider
    const timelineDivider = document.querySelector('.timeline-center-divider');
    
    if (timelineDivider) {
        const timelineSection = document.querySelector('.timeline-sections');
        if (timelineSection) {
            timelineDivider.style.height = `${timelineSection.offsetHeight}px`;
            
            timelineDivider.style.display = 'none';
            setTimeout(() => {
                timelineDivider.style.display = 'block';
            }, 0);
        }
    }
});
