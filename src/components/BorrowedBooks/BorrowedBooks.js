import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

import Book from '../Book/Book';

import './BorrowedBooks.css';

class BorrowedBooks extends Component {
  static contextType = UserContext;

  renderBorrowedBooks = () => {
    if (this.context.borrowedBooks) {
      const books = this.context.borrowedBooks.map(book => {
        return <Book key={book.id} book={book}/>
      })
  
      return books;
    }
  }
  

  render() {
    return (
      <div className="borrowed-books">
        {this.renderBorrowedBooks()}
      </div>
    )
  }
}

export default BorrowedBooks;