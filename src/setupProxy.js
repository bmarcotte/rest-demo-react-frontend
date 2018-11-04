const proxy = require( 'http-proxy-middleware' );
module.exports = function(app) {
app.use(
  proxy( '/rest', {
    "target":      "http://localhost:8080",
    "target-prod": "http://bookmarkapi:8080",
    "ws":          true
  } )
);
}
