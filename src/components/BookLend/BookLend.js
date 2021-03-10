import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

import BooksApiService from '../../services/books-api-service';
import BorrowsApiService from '../../services/borrows-api-service';
import './BookLend.css';

class BookLend extends Component {
  static defaultProps = {
    book: {},
    updateBookMode: () => {},
  }

  static contextType = UserContext;

  state = {
    error: null,
    name: ''
  }

  updateName = name => {
    this.setState({ name });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ error: null });
    const { name } = event.target;

    const borrowedBook = {
      title: this.props.book.title,
      borrowed: true
    }

    BorrowsApiService.postBorrow(
     name.value,
     this.props.book.id
    )
      .then(borrow => {
        BooksApiService.markBorrowed(borrow.book_id, borrowedBook)
          .then(() => this.context.setBooks(
            this.context.books.map(book => {
              if (book.id === borrow.book_id)
                return {
                  borrowed: true,
                  ...book,
                }
              else
                return book;
            })
          ))
          .then(() => { this.props.updateBookMode('borrowed')})
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { updateBookMode } = this.props;

    return (
      <form 
        className="lend-form"
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <div className="error" role="alert">
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <label htmlFor="lend-name-input">Name</label>
        <input
          onChange={(e) => this.updateName(e.target.value)}
          value={this.state.name}
          id="lend-name-input"
          name="name"
          placeholder="Borrower name"
          required
        />

        <div className="form-buttons">
          <button onClick={() => updateBookMode('details')} className="btn" type="button">Cancel</button>
          <button className="btn" type="submit">Lend</button>
        </div>
      </form>
    )
  }
}

export default BookLend;