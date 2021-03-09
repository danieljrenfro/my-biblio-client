import React, { Component } from 'react';

import AddForm from '../AddForm/AddForm';

import './AddBook.css';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = { isAdding: false };
  }

  toggleIsAdding = () => {
    this.setState({ isAdding: !this.state.isAdding });
  }
  
  renderForm = () => {
    return this.state.isAdding
      ? <AddForm toggleIsAdding={this.toggleIsAdding} />
      : <button className="add-book-btn" onClick={this.toggleIsAdding} type="button">Add Book</button>
  }
  
  render() {
    return (
      <div className="add-book">
        {this.renderForm()}
      </div>
    )
  }
}

export default AddBook;