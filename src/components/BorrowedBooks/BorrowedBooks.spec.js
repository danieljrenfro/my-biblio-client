import React from 'react';
import ReactDOM from 'react-dom';
import BorrowedBooks from './BorrowedBooks';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BorrowedBooks />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})