/**
 * Fix for back/forward cache issues
 */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Page restored from cache
    window.location.reload();
  }
});
