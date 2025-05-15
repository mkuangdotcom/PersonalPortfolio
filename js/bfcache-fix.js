/**
 * Fix for back/forward cache issues
 */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Page from cache - reload
    window.location.reload();
  }
});
