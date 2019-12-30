const proxy = require( 'http-proxy-middleware' );

const targetURL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:8080'
  : 'http://bookmarkapi:8080';

module.exports = function(app) {
  app.use(
    proxy( '/rest', {
      'target': targetURL,
      'ws': true
    } )
  );
};
