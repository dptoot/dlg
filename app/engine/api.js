import store from './store';
import 'isomorphic-fetch';
import config from './config';

class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
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

  static authenticatedGet({url, token}) {
    return this.xhr(url, null, 'GET', token);
  }

  static authenticatedPut({url, params, token}) {
    return this.xhr(url, params, 'PUT', token);
  }

  static authenticatedPost({url, params, token}) {
    return this.xhr(url, params, 'POST', token);
  }

  static authenticatedDelete({url, params, token}) {
    return this.xhr(url, params, 'DELETE', token);
  }

  static xhr(route, params, verb, token = false) {

    const url = `${config('API_HOST')}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    
    // Add headers
    options.headers = Api.headers();

    // Add Authentication if required
    if (token) {
        Object.assign(options.headers, {
            'Authorization': token,
            'credentials': 'include',
        });
    }

    return fetch(url, options)
      .then( response => {
        console.log(response)
        let json = response.json();
        if (response.ok) {
          return json
        }
        return json.then(err => {throw err});
      })
      .then( json => json );
  }
}

export default Api;
