import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import BooksApiService from '../../services/books-api-service';

import LibraryBooks from '../../components/LibraryBooks/LibraryBooks';
import AddBook from '../../components/AddBook/AddBook';

import './LibraryRoute.css';

class LibraryRoute extends Component {
  static contextType = UserContext;


  componentDidMount() {
    BooksApiService.getBooks()
      .then(this.context.setBooks)
      .catch(this.context.setError)
  }

  render() {
    return (
      <section className="library-page">
        <h2>Your Library</h2>
        <AddBook />
        <LibraryBooks />
      </section>
    )
  }
}

export default LibraryRoute;