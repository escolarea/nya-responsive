export default (method,query, body = {}) => {
    switch (method) {
      case 'GET':
        return fetch(`${process.env.MANAGEMENT_URL}/${query}`)
      case 'POST':
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
            // JSON.stringify({ title: 'POST Request ' })
        };
        return fetch(`${process.env.MANAGEMENT_URL}/${query}`, requestOptions )
      default:

        break
    }
  }