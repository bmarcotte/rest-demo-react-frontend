import React, { Component } from 'react';
import './App.css';
import BookmarkList  from './components/BookmarkList';
import BookmarkModal from './components/BookmarkModal';

class App extends Component {
  reload_bookmark_list() {
    this.refs.bookmark_list.reload();
  }

  show_bookmark_modal( action, which ) {
    this.refs.bookmark_modal.handleShow( action, which );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">REST demo: Bookmarks API</h1>
        </header>

        <div className="App-Bookmarks">
          <h2>Bookmarks:</h2>
          <BookmarkList
            ref="bookmark_list"
            show_bookmark_modal={ this.show_bookmark_modal.bind( this ) }
          />
          <BookmarkModal
            ref="bookmark_modal"
            reload_bookmark_list={ this.reload_bookmark_list.bind( this ) }
          />
        </div>
      </div>
    );
  }
}

export default App;
