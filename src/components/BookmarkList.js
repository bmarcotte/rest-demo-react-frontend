import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import BookmarkAPI from './BookmarkAPI';
import './BookmarkList.css';

class BookmarkList extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      isLoading: true,
      data:      null
    }

    this.reload = this.reload.bind( this );
  }

  show_modal ( action, bookmark ) {
    this.props.show_bookmark_modal( action, bookmark );
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.setState( {
      isLoading: true,
      data:      null
    } );

    return BookmarkAPI.get_all_bookmarks(
      ( responseJson ) => {
        this.setState( {
          isLoading: false,
          data:      responseJson
        } );
      },
      ( error ) => {
        console.error( error );
      }
    );
  }

  render() {
    if ( this.state.isLoading ) {
      return (
        <div>Loading...</div>
      );
    }

    const { data } = this.state;
    if ( typeof data === 'undefined' ) {
      return (
        <div>ERROR: data undefined</div>
      );
    }

    const { bookmarks } = data;
    if ( typeof bookmarks === 'undefined' ) {
      return (
        <div>ERROR: bookmarks undefined</div>
      );
    }

    return (
      <ListGroup>
        {
          bookmarks.map( ( bookmark, index ) =>
            <ListGroupItem
              key={bookmark.id}
              id={ 'lgi' + bookmark.id }
            >
              <div className="list-group-item-text">
                <a href={ encodeURI( bookmark.url ) } target="_blank">{bookmark.name}</a>
                <ButtonGroup className="BookmarkList-add-edit-bg">
                  <Button bsSize="xsmall" onClick={ this.show_modal.bind( this, 'Edit', bookmark ) }>
                    <Glyphicon glyph="pencil" />
                  </Button>
                  <Button bsSize="xsmall" onClick={ this.show_modal.bind( this, 'Delete', bookmark ) }>
                    <Glyphicon glyph="trash" />
                  </Button>
                </ButtonGroup>
              </div>
            </ListGroupItem>
          )
        }
        <ListGroupItem key={0} id={ 'lgiadd' }>
          <ButtonGroup>
            <Button bsSize="small" onClick={ this.show_modal.bind( this, 'Add', null ) }>
              <Glyphicon glyph="plus" /> Add new bookmark
            </Button>
          </ButtonGroup>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default BookmarkList;
