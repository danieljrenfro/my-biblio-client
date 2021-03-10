import React, { Component } from 'react';

import BorrowsApiService from '../../services/borrows-api-service';
import BooksApiService from '../../services/books-api-service';
import './BookBorrow.css';
import UserContext from '../../contexts/UserContext';

class BookBorrow extends Component {
  static defaultProps = {
    book: {},
    updateBookMode: () => {},
  }

  static contextType = UserContext;

  state = {
    borrow: {},
    error: null
  }

  handleReturnedClicked = () => {
    const returnedBorrow = {
      name: this.state.borrow.name,
      returned: true
    }

    const returnedBook = {
      title: this.props.book.title,
      borrowed: false
    }

    BorrowsApiService.updateBorrow(
      this.state.borrow.id,
      returnedBorrow
    )
      .then(() => {
        BooksApiService.markBorrowed(this.props.book.id, returnedBook)
          .then(() => this.context.setBooks(
            this.context.books.map(book => {
              if (book.id === this.props.book.id)
                return { 
                  borrowed: false, 
                  ...book, 
                }
              else
                return book;
            })
          ))
          .then(() => { this.props.updateBookMode('details') })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  generateDateString = () => {
    const date = new Date(this.state.borrow.date).toString()

    return date.slice(3, 15);
  }

  componentDidMount() {
    BooksApiService.getBookBorrows(this.props.book.id)
      .then(borrow => this.setState({ borrow: borrow[0] }))
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { borrow } = this.state;
    const { updateBookMode } = this.props;

    return (
      <>
        {borrow && <p>Borrowed By: {borrow.name}</p>}
        {borrow && <p>Borrowed Date: {this.generateDateString()}</p>}
        <button 
          className="book-btn" 
          onClick={() => updateBookMode('details')} 
          type="button"
        >
          Details
        </button>

        <button 
          onClick={this.handleReturnedClicked}
          className="book-btn" 
          type="button"
        >
          Returned
        </button>
      </>
    )
  }
}

export default BookBorrow;