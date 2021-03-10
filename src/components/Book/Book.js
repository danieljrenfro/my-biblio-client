import React, { Component } from 'react';

import BookDetails from '../BookDetails/BookDetails';
import BookMore from '../BookMore/BookMore';
import BookEdit from '../BookEdit/BookEdit';
import BookBorrow from '../BookBorrow/BookBorrow';
import BookLend from '../BookLend/BookLend';
import './Book.css';

class Book extends Component {
  static defaultProps = {
    book: {}
  }

  state = { 
    mode: this.props.book.borrowed ? 'borrowed' : 'details' 
  };

  updateMode = (mode) => {
    this.setState({ mode });
  }

  renderBook = (book) => {
    const { mode } = this.state;
    
    if (mode === 'details')
      return <BookDetails updateBookMode={this.updateMode} book={book}/>

    if (mode === 'more')
      return <BookMore updateBookMode={this.updateMode} book={book}/>

    if (mode === 'edit')
      return <BookEdit updateBookMode={this.updateMode} book={book}/>

    if (mode === 'borrowed')
      return <BookBorrow updateBookMode={this.updateMode} book={book}/>

    if (mode === 'lend')
      return <BookLend updateBookMode={this.updateMode} book={book}/>
    
  }

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <h3 className="book-title">{book.title}</h3>
        {this.renderBook(book)}
      </div>
    )
  }
}

export default Book;