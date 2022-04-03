import React from 'react';
import { createRoot } from 'react-dom/client';

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
    const root = createRoot(div);
    root.render(<App />);
    root.unmount();
  });
});
