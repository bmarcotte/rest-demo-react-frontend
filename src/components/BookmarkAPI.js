import fetch from 'isomorphic-fetch';

class BookmarkAPI {
  static base_url () {
    const path = '/rest';

    if ( process.env.BROWSER ) {
      return path;
    }

    let protocol;
    let host_port;
    if ( typeof window !== 'undefined' ) {
      protocol  = window.location.protocol;
      host_port = window.location.host;
    }

    protocol = protocol  || 'http:';
    if ( ! protocol.includes( ':' ) ) {
      protocol = protocol + ':';
    }

    const port = process.env.PORT || 3000;
    host_port = host_port || 'localhost:' + port;
    if ( ! host_port.includes( ':' ) ) {
      host_port = host_port + ':' + port;
    }

    return protocol + '//' + host_port + path;
  }

  static add_bookmark( request_args, success_handler, error_handler ) {
    return this.perform_fetch(
      'POST', '/bookmark', request_args, success_handler, error_handler
    );
  }

  static delete_bookmark( id, success_handler, error_handler ) {
    return this.perform_fetch(
      'DELETE', '/bookmark', { 'id': id }, success_handler, error_handler
    );
  }

  static edit_bookmark( request_args, success_handler, error_handler ) {
    return this.perform_fetch(
      'PUT', '/bookmark', request_args, success_handler, error_handler
    );
  }

  static get_all_bookmarks( success_handler, error_handler ) {
    return this.perform_fetch(
      'GET', '/bookmarks', null, success_handler, error_handler
    );
  }

  static perform_fetch( method, path, request_args, success_handler, error_handler ) {
    let options = {
      'method':  method,
      'headers': {
        'Accept': 'application/json',
      }
    };
    if ( method !== 'GET' ) {
      options[ 'headers' ][ 'Content-Type' ] = 'application/json';
      options[ 'body' ] = JSON.stringify( request_args );
    }

    const url = this.base_url() + path;

    return fetch( url, options )
      .then( ( response ) => response.json() )
      .then( success_handler )
      .catch( error_handler );
  }
}

export default BookmarkAPI;
