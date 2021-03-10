import React from 'react';
import ReactDOM from 'react-dom';
import AddForm from './AddForm';

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
    <AddForm />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})