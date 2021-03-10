import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import BooksApiService from '../../services/books-api-service';

import './BookMore.css';

class BookMore extends Component {
  static defaultProps = {
    book: {},
    updateBookMode: () => {},
  }

  static contextType = UserContext;

  state = { error: null };

  handleDeleteClicked = () => {
    BooksApiService.deleteBook(this.props.book.id)
      .then(() => {
        this.context.setBooks(
          this.context.books.filter(book => book.id !== this.props.book.id)
        )
      })
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { updateBookMode, book } = this.props;

    return (
      <>
        {book.borrowed && <button 
          onClick={() => updateBookMode('borrowed')} 
          className="book-btn" 
          type="button"
        >
          Borrowed
        </button>}
        <button 
          onClick={() => updateBookMode('details')} 
          className="book-btn" 
          type="button"
        >
          Details
        </button>
        <button 
          onClick={() => updateBookMode('lend')} 
          className="book-btn" 
          type="button"
        >
          Lend
        </button>
        <button
          onClick={() => updateBookMode('edit')}  
          className="book-btn" 
          type="button"
        >
          Edit
        </button>
        <button 
          onClick={this.handleDeleteClicked}
          className="book-btn" 
          type="button"
        >
          Delete
        </button>
      </>
    )
  }
}

export default BookMore;