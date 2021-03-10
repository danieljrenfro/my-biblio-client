import TokenService from './token-service';
import config from '../config';

const BorrowsApiService = {
  postBorrow(name, book_id) {
    return fetch(`${config.API_ENDPOINT}/borrows`, {
      method: `POST`,
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name,
        book_id,
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()  
      )
  },
  updateBorrow(id, data) {
    return fetch(`${config.API_ENDPOINT}/borrows/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: data.name,
        returned: data.returned
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res  
      )
  }
}

export default BorrowsApiService;