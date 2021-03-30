import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import fetch from 'isomorphic-unfetch';
import * as settings from '../settings';
import jwtDecode from 'jwt-decode'

async function getJWK() {
    const res = await fetch(`https://${settings.domain}/.well-known/jwks.json`);
    const jwk = await res.json();
    return jwk;
  }
  
  async function verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      const jwk = await getJWK();
      let cert = jwk.keys[0].x5c[0];
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
      if (jwk.keys[0].kid === decodedToken.header.kid) {
        try {
          jwt.verify(token, cert);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    }
  }

  function saveToken(jwtToken, accessToken) {
    Cookie.set('user', jwtDecode(jwtToken));
    Cookie.set('jwtToken', jwtToken);
  };
  
  function deleteToken() {
    Cookie.remove('user');
    Cookie.remove('jwtToken');
  };
  async function getTokenForBrowser() {
    const token = Cookie.getJSON('jwtToken');
    const validToken = await verifyToken(token);
    if (validToken) {
      return Cookie.getJSON('user');
    }
  }
  async function getjwtToken (req){
    if (req.headers.cookie) {
      const jwtFromCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwtToken='));
      if (!jwtFromCookie) {
        return undefined;
      }
      const token = jwtFromCookie.split('=')[1];
      if(token){
        return token
      }else{
        return null
      }

    }
  }
  
  async function getTokenForServer(req) {
    if (req.headers.cookie) {
      const jwtFromCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwtToken='));
      if (!jwtFromCookie) {
        return undefined;
      }
      const token = jwtFromCookie.split('=')[1];
      const validToken = await verifyToken(token);
      if (validToken) {
        return jwt.decode(token);
      } else {
        return undefined;
      }
    }
  }

  export {
    saveToken,
    deleteToken,
    getTokenForBrowser,
    getTokenForServer,
    verifyToken,
    getjwtToken
  };
  