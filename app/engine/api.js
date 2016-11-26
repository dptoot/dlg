import store from './store';

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

  static authenticatedGet(route) {
    return this.xhr(route, null, 'GET', true);
  }

  static authenticatedPut(route, params) {
    return this.xhr(route, params, 'PUT', true);
  }

  static authenticatedPost(route, params) {
    return this.xhr(route, params, 'POST', true);
  }

  static authenticatedDelete(route, params) {
    return this.xhr(route, params, 'DELETE', true);
  }

  static xhr(route, params, verb, authenticated) {
    // const host = 'http://api-douglovesgames.rhcloud.com';
    const host = 'http://localhost:3000';

    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    
    // Add headers
    options.headers = Api.headers();

    // Add Authentication if required
    if (authenticated) {
        Object.assign(options.headers, {
            'Authorization': store.getState().user.token,
            'credentials': 'include',
        });
    }

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