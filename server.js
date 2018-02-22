const express = require( 'express' );
const pkg     = require( './package' );
const path    = require( 'path' );
const proxy   = require( 'express-http-proxy' );
const app     = express();

/* global __dirname process */

app.use(
  express.static( path.join( __dirname, 'build' ) )
);

app.get( '/', function ( req, res ) {
  res.sendFile(
    path.join( __dirname, 'build', 'index.html' )
  );
} );

if ( typeof pkg.proxy !== 'undefined' ) {
  for ( var proxy_path in pkg.proxy ) {
    if ( ! pkg.proxy.hasOwnProperty( proxy_path ) ) {
      continue;
    }

    const proxy_config = pkg.proxy[ proxy_path ];

    let target;
    if ( proxy_config.hasOwnProperty( 'target-prod' ) ) {
      target = proxy_config[ 'target-prod' ];
    }
    else if ( proxy_config.hasOwnProperty( 'target' ) ) {
      target = proxy_config[ 'target' ];
    }
    if ( ! target ) {
      continue;
    }

    app.use( proxy_path,
      proxy( target, {
        proxyReqPathResolver: function( req ) {
          return proxy_path + require( 'url' ).parse( req.url ).path;
        }
      } )
    );
  }
}

const port = process.env.PORT || 3000;
app.listen( port );
