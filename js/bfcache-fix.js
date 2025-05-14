/**
 * Fix for back/forward cache issues
 * This ensures the page is properly reloaded when navigating with browser back/forward buttons
 */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Page was restored from back/forward cache
    window.location.reload();
  }
});
