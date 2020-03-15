import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import BookmarkAPI from './components/BookmarkAPI';

describe('App', () => {
  let performFetchSpy;

  beforeEach(() => {
    performFetchSpy = jest.spyOn(BookmarkAPI, 'perform_fetch');
    performFetchSpy.mockResolvedValue(null);
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
