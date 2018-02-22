const express = require( 'express' );
const package = require( './package' );
const path    = require( 'path' );
const proxy   = require( 'express-http-proxy' );
const app     = express();

app.use(
  express.static( path.join( __dirname, 'build' ) )
);

app.get( '/', function ( req, res ) {
  res.sendFile(
    path.join( __dirname, 'build', 'index.html' )
  );
} );

if ( typeof package.proxy !== 'undefined' ) {
  for ( var proxy_path in package.proxy ) {
    if ( ! package.proxy.hasOwnProperty( proxy_path ) ) {
      continue;
    }

    const proxy_config = package.proxy[ proxy_path ];

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
