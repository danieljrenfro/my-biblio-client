import React from 'react';
import ReactDOM from 'react-dom';
import LibraryBooks from './LibraryBooks';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <LibraryBooks/>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})