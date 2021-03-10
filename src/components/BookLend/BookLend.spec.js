import React from 'react';
import ReactDOM from 'react-dom';
import BookLend from './BookLend';

const book = {
  id: 1,
  user_id: 1,
  title: 'Title',
  authors: 'Authors',
  genre: 'Genre',
  format: 'Hardback',
  status: 'Read',
  borrowed: false
}

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BookLend book={book}/>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})

it('renders without crashing without a book prop', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BookLend />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})