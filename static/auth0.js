import auth0 from 'auth0-js';
import * as settings from '../settings';

const clientID = settings.clientID;
const domain = settings.domain;
const siteUrl = settings.siteUrl

const config = {
  clientID,
  domain: domain,
  // redirectUri: `${siteUrl}/redirect`,
  // responseType: "id_token token",
  // scope: 'openid profile email'
};

const Auth = new auth0.WebAuth(config);

function login() {  
  const options = {
    responseType: 'id_token',
    redirectUri: `${siteUrl}/redirect`,
    scope: 'openid profile email'
  };
  return Auth.authorize(options);
}

function logout(){
  new auth0.WebAuth({
    clientID: clientID,
    domain: domain
  }).logout({
    returnTo: siteUrl,
    clientID:clientID
  });
}

function parseHash(){
  return new Promise((resolve, reject) => {
  Auth.parseHash({hash:window.location.hash}, function(err, authResult) {
    if (err) {
      return reject(err);
    }
    return resolve(authResult);
  });
})
}


export {login, parseHash, logout};