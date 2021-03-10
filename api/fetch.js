
import getConfig from 'next/config';

//TODO : make the params an object 
const fetchData =  (method,query, body = {}) => {
  
  const {publicRuntimeConfig:{MANAGEMENT_URL} } = getConfig() || { }

    switch (method) {
      case 'GET':
        return fetch(`${MANAGEMENT_URL}/${query}`,{headers:body})
      case 'POST':
        const requestOptions = {
            method: 'POST',
            headers,
            body
            // JSON.stringify({ title: 'POST Request ' })
        };
        return fetch(`${MANAGEMENT_URL}/${query}`, requestOptions )
      default:

        break
    }
  }

  export default fetchData