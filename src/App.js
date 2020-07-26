import React, { Component } from 'react';
import './App.css';
import BookmarkList  from './components/BookmarkList';
import BookmarkModal from './components/BookmarkModal';
import { Card, Navbar } from 'react-bootstrap';

class App extends Component {
  reload_bookmark_list() {
    this.bookmark_list.reload();
  }

  show_bookmark_modal( action, which ) {
    this.bookmark_modal.handleShow( action, which );
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" expand="lg" variant="dark" className="App-header">
          <Navbar.Brand className="App-title">REST demo: Bookmarks API</Navbar.Brand>
        </Navbar>
        <Card className="App-Card">
          <Card.Header as="h5">Bookmarks:</Card.Header>
          <Card.Body>
            <BookmarkList
              ref={ ( component ) => { this.bookmark_list = component; } }
              show_bookmark_modal={ this.show_bookmark_modal.bind( this ) }
            />
            <BookmarkModal
              ref={ ( component ) => { this.bookmark_modal = component; } }
              reload_bookmark_list={ this.reload_bookmark_list.bind( this ) }
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
