/**
 * Timeline Fix JavaScript
 * Ensures the center timeline divider is properly styled
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get the timeline center divider
    const timelineDivider = document.querySelector('.timeline-center-divider');
    
    if (timelineDivider) {
        // Make sure it's visible and properly sized
        const timelineSection = document.querySelector('.timeline-sections');
        if (timelineSection) {
            timelineDivider.style.height = `${timelineSection.offsetHeight}px`;
            
            // Force a repaint to ensure it's visible
            timelineDivider.style.display = 'none';
            setTimeout(() => {
                timelineDivider.style.display = 'block';
            }, 0);
        }
    }
});
