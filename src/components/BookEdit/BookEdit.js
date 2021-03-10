import React, { Component } from 'react';
import BooksApiService from '../../services/books-api-service';
import UserContext from '../../contexts/UserContext';

import './BookEdit.css';

class BookEdit extends Component {
  static defaultProps = {
    book: {},
    updateBookMode: () => {},
  }

  static contextType = UserContext;

  state = {
    error: null,
    title: this.props.book.title || '',
    authors: this.props.book.authors || '',
    genre: this.props.book.genre || '',
    format: this.props.book.format || '',
    status: this.props.book.status || '',
  }

  updateForm = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  clearForm = () => {
    this.setState({
      title: '',
      authors: '',
      genre: '',
      format: '',
      status: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ error: null });

    const { title, authors, genre, format, status } = this.state;
    const updatedBook = {
      id: this.props.book.id,
      user_id: this.props.book.user_id,
      title,
      authors,
      genre,
      format,
      status,
      borrowed: this.props.book.borrowed
    }

    BooksApiService.updateBook(
      this.props.book.id,
      updatedBook
    )
      .then(() => {
        this.context.setBooks(
          this.context.books.map(book => {
            if (book.id === updatedBook.id)
              return updatedBook;
            else
              return book;
          })
        )
      })
      .then(() => {
        (this.props.book.borrowed)
          ? this.props.updateBookMode('borrowed')
          : this.props.updateBookMode('details')
      })
      .catch(res => this.setState({ error: res.error }))
  }

  firstInput = React.createRef();

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error, title, authors, genre, format, status } = this.state;
    const { updateBookMode } = this.props;
    
    return (
      <form 
        className="edit-form"
        onSubmit={(e) => this.handleSubmit(e)}  
      >
        <div className="error" role="alert">
          {error && <p>{error}</p>}
        </div>
        <label htmlFor="edit-title-input">Title</label>
        <input
          onChange={(e) => this.updateForm(e)} 
          value={title}
          ref={this.firstInput}
          id="edit-title-input"
          name="title"
          placeholder="Title"
          required
        />

        <label htmlFor="edit-authors-input">Authors</label>
        <input 
          onChange={(e) => this.updateForm(e)} 
          value={authors}
          id="edit-authors-input"
          name="authors"
          placeholder="Authors"
          required
        />

        <label htmlFor="edit-genre-input">Genre</label>
        <input
          onChange={(e) => this.updateForm(e)} 
          value={genre}
          id="edit-genre-input"
          name="genre"
          placeholder="Genre"
        />

        <label htmlFor="edit-format-select">Format</label>
        <select
          onChange={(e) => this.updateForm(e)} 
          value={format}
          id="edit-format-select"
          name="format"
          required
        >
          <option value="">-Select-</option>
          <option value="Hardback">Hardback</option>
          <option value="Paperback">Paperback</option>
          <option value="E-Book">E-Book</option>
          <option value="Audio">Audio</option>
        </select>

        <label htmlFor="edit-status-select">Status</label>
        <select
          onChange={(e) => this.updateForm(e)} 
          value={status}
          id="edit-status-select"
          name="status"
          required
        >
          <option value=''>-Select-</option>
          <option value='Unread'>Unread</option>
          <option value='Reading'>Reading</option>
          <option value='Read'>Read</option>
        </select>

        <div className="form-buttons">
          <button 
            onClick={() => updateBookMode('details')} 
            className="btn" 
            type="button"
          >
            Cancel
          </button>
          <button className="btn" type="submit">Update</button>
        </div>
      </form>
    )
  }
}

export default BookEdit;