import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Modal
} from 'react-bootstrap';
import BookmarkAPI from './BookmarkAPI';
import './BookmarkModal.css';

class BookmarkModal extends Component {
  constructor( props, context ) {
    super( props, context );

    this.state = this.initial_state();

    this.handleClose = this.handleClose.bind( this );
    this.handleShow  = this.handleShow.bind( this );
  }

  initial_state() {
    return {
      action:   null,
      error:    null,
      id:       0,
      name:     '',
      response: null,
      show:     false,
      url:      ''
    };
  }

  handleClose() {
    this.setState( this.initial_state() );
  }

  handleShow( action, which ) {
    this.setState( {
      action: action,
      show:   true
    } );
    if ( typeof which !== 'undefined' && which !== null ) {
      this.setState( which );
    }
  }

  handleInputChange( event ) {
    const { target      } = event;
    const { name, value } = target;

    this.setState( {
      [name]: value
    } );
  }

  handleSubmit( event ) {
    const success_handler = ( responseJson ) => {
      this.setState( {
        response: responseJson
      } );
      this.props.reload_bookmark_list();
    };
    const error_handler = ( error ) => {
      console.error( error.message );
      this.setState( {
        error: error.message
      } );
    };

    const { action } = this.state;
    if ( action === 'Add' ) {
      BookmarkAPI.add_bookmark(
        {
          'name': this.state.name,
          'url':  this.state.url
        },
        success_handler,
        error_handler
      );
    }
    else if ( action === 'Edit' ) {
      BookmarkAPI.edit_bookmark(
        {
          'id':   this.state.id,
          'name': this.state.name,
          'url':  this.state.url
        },
        success_handler,
        error_handler
      );
    }
    else if ( action === 'Delete' ) {
      BookmarkAPI.delete_bookmark(
        this.state.id,
        success_handler,
        error_handler
      );
    }
    else {
      let message = 'Unknown action: ' + action;
      console.error( message );
      this.setState( {
        error: message
      } );
    }

    event.preventDefault();
  }

  get_status() {
    const { response, error } = this.state;

    if ( typeof response !== 'undefined' && response !== null ) {
      if ( typeof response.rows_affected !== 'undefined' && response.rows_affected > 0 ) {
        setTimeout( () => { this.handleClose() }, 1000 );
        return (
          <div className="BookmarkModal-status">Saved!</div>
        );
      }
      if ( typeof response.message !== 'undefined' && response.message !== null ) {
        return (
          <div className="BookmarkModal-status">Response error: {response.message}</div>
        );
      }
    }

    if ( typeof error !== 'undefined' && error !== null ) {
      return (
        <div className="BookmarkModal-status">Request error: {error}</div>
      );
    }

    return null;
  }

  render() {
    const { action, url, id, name } = this.state;

    if ( typeof action === 'undefined' || action === null ) {
      return null;
    }
    const submit_name = action === 'Delete'
      ? 'Delete'
      : 'Save';

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action} Bookmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="hidden" name="id" value={id} />
            <FormGroup controlId="formName">
              <ControlLabel>Name</ControlLabel>
              { action === 'Delete' ? (
                <FormControl.Static>{name}</FormControl.Static>
              ) : (
                <FormControl
                  name="name"
                  onChange={ this.handleInputChange.bind( this ) }
                  placeholder="Name of bookmark"
                  type="text"
                  value={name}
                />
              ) }
            </FormGroup>

            <FormGroup controlId="formURL">
              <ControlLabel>URL</ControlLabel>
              { action === 'Delete' ? (
                <FormControl.Static>{url}</FormControl.Static>
              ) : (
                <FormControl
                  name="url"
                  onChange={ this.handleInputChange.bind( this ) }
                  placeholder="URL of bookmark"
                  type="text"
                  value={url}
                />
              ) }
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {this.get_status()}
          <Button onClick={ this.handleSubmit.bind( this ) } type="submit">{submit_name}</Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BookmarkModal;
