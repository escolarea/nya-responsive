module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
      test: 'test'
    },
    publicRuntimeConfig: { // Will be available on both server and client
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID, 
        AUTH0_DOMAIN : process.env.AUTH0_DOMAIN,
        MANAGEMENT_URL : process.env.MANAGEMENT_URL
    }
  }