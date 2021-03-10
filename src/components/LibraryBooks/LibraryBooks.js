import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

import Book from '../Book/Book';

import './LibraryBooks.css';

class LibraryBooks extends Component {
  static contextType = UserContext;

  renderBooks = () => {
    const books = this.context.books.map(book => {
      return <Book key={book.id} book={book}/>
    })

    return books;
  }

  render() {
    return (
      <div className="all-books">
        {this.renderBooks()}
      </div>
    )
  }
}

export default LibraryBooks;