import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

import BooksApiService from '../../services/books-api-service';

import './AddForm.css';

class AddForm extends Component {
  state = {
    error: null,
    title: '',
    authors: '',
    genre: '',
    format: '',
    status: '',
  }
  
  static defaultProps = {
    toggleIsAdding: () => {}
  }

  static contextType = UserContext;

  firstInput = React.createRef();

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

    const newBook = { title, authors, genre, format, status };

    BooksApiService.postBook(newBook)
      .then(book => {
        this.context.setBooks([...this.context.books, book]);
        this.clearForm();
        this.props.toggleIsAdding()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error, title, authors, genre, format, status } = this.state;

    return (
      <form 
        onSubmit={(e) => this.handleSubmit(e)} 
        className="add-form"
      >
        <div className="error" role="alert">
          {error && <p>{error}</p>}
        </div>
        <label htmlFor="add-title-input">Title*</label>
        <input 
          ref={this.firstInput}
          onChange={(e) => this.updateForm(e)}
          value={title}
          id="add-title-input"
          name="title"
          required
        />

        <label htmlFor="add-authors-input">Authors*</label>
        <input 
          value={authors}
          onChange={(e) => this.updateForm(e)}
          id="add-authors-input"
          name="authors"
          required
        />

        <label htmlFor="add-genre-input">Genre</label>
        <input 
          onChange={(e) => this.updateForm(e)}
          value={genre}
          id="add-genre-input"
          name="genre"
        />

        <label htmlFor="add-format-select">Format*</label>
        <select
          onChange={(e) => this.updateForm(e)}
          value={format}
          id="add-format-select"
          name="format"
          required
        >
          <option value="">-Select-</option>
          <option value="Hardback">Hardback</option>
          <option value="Paperback">Paperback</option>
          <option value="E-Book">E-Book</option>
          <option value="Audio">Audio</option>
        </select>

        <label htmlFor="add-status-select">Status*</label>
        <select
          onChange={(e) => this.updateForm(e)}
          value={status}
          id="add-status-select"
          name="status"
          required
        >
          <option value=''>-Select-</option>
          <option value='Unread'>Unread</option>
          <option value='Reading'>Reading</option>
          <option value='Read'>Read</option>
        </select>

        <div className="form-buttons">
          <button onClick={this.props.toggleIsAdding} className="btn" type="button">Cancel</button>
          <button className="btn" type="submit">Add to Library</button>
        </div>
      </form>
    )
  }
}

export default AddForm;