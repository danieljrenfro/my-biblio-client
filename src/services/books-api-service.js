import config from '../config';
import TokenService from './token-service';

const BooksApiService = {
  getBooks() {
    return fetch(`${config.API_ENDPOINT}/books`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },
  postBook(data) {
    return fetch(`${config.API_ENDPOINT}/books`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: data.title,
        authors: data.authors,
        genre: data.genre,
        format: data.format,
        status: data.status,
        borrowed: false,
      })
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },
  updateBook(id, data) {
    return fetch(`${config.API_ENDPOINT}/books/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: data.title,
        authors: data.authors,
        genre: data.genre,
        format: data.format,
        status: data.status,
        borrowed: data.borrowed
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res  
      )
  },
  deleteBook(id) {
    return fetch(`${config.API_ENDPOINT}/books/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok) 
      ? res.json().then(e => Promise.reject(e))
      : res  
      )
    },
    markBorrowed(id, data) {
      return fetch(`${config.API_ENDPOINT}/books/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify({
          title: data.title,
          borrowed: data.borrowed
        })
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res  
        )
    },
    getBookBorrows(id) {
      return fetch(`${config.API_ENDPOINT}/books/${id}/borrows`, {
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()  
        )
    }
}

export default BooksApiService;