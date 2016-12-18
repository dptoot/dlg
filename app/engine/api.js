import store from './store';
import 'isomorphic-fetch';
import config from './config';

class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'credentials': 'include',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET', false);
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT', false);
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST', false);
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE', false);
  }

  static xhr(route, params, verb, authenticated = false) {

  	console.log('CALLING REST API');

    const url = `${config('API_HOST')}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    
    // Add headers
    options.headers = Api.headers();
    
    return fetch(url, options)
      .then( resp => {
        
        let json = resp.json();
        if (resp.ok) {
          return json
        }
        return json.then(err => {throw err});
      })
      .then( json => json );
  }
}

export default Api