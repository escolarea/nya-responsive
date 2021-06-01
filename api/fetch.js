import getConfig from 'next/config';
const fetchData =  (params = {}) => {
  const {query = ''} = params
  const {publicRuntimeConfig:{MANAGEMENT_URL} } = getConfig() || { }
  const url = `${MANAGEMENT_URL}/${query}`;

  return fetch(url ,params)
  }

  export default fetchData