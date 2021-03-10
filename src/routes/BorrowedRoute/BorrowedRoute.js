import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import BorrowsApiService from '../../services/borrows-api-service';
import BooksApiService from '../../services/books-api-service';
import BorrowedBooks from '../../components/BorrowedBooks/BorrowedBooks';

import './BorrowedRoute.css';

class BorrowedRoute extends Component {
  static contextType = UserContext;

  generateBooks = (borrows) => {
    let books = [];
    borrows.forEach(borrow => {
      books.push(this.context.books.find(book => book.id === borrow.book_id))
    })

    this.context.setBorrowedBooks(books);
  }

  componentDidMount() {
    BooksApiService.getBooks()
      .then(this.context.setBooks)
      .then(() => {
        BorrowsApiService.getBorrows()
          .then(borrows => {
            this.generateBooks(borrows)
          })
      })
      .catch(this.context.setError)
  }

  render() {
    return (
      <section className="borrowed-page">
        <h2>Borrowed Books</h2>
        <BorrowedBooks/>
      </section>
    )
  }
}

export default BorrowedRoute;