import React, { Component } from 'react';

import './BookDetails.css';

class BookDetails extends Component {
  static defaultProps = {
    book: {},
    updateBookMode: () => {},
  }

  render() {
    const { book, updateBookMode } = this.props;

    return (
      <>
        <p>By: {book.authors}</p>
        {book.genre && <p>Genre: {book.genre}</p>}
        <p>Format: {book.format}</p>
        <p>Status: {book.status}</p>
        <button
          onClick={() => updateBookMode('more')}  
          className="book-btn" 
          type="button"
        >
          More
        </button>
      </>
    )
  }
}

export default BookDetails;