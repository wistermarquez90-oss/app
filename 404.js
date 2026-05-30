/*!
 * FERMENTUM - SPA Router Fix for GitHub Pages
 * Este script redirige rutas de vuelta al index.html para SPA
 */
(function() {
  // Redirigir cualquier ruta 404 al index con hash
  var path = window.location.pathname;
  var base = '/app/';
  
  if (path.indexOf(base) === 0 && path !== base) {
    var newPath = path.replace(base, '');
    window.location.href = base + '#/' + newPath + window.location.search + window.location.hash;
  }
})();
