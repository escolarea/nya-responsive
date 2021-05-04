import React from 'react';
import Router from 'next/router';
import { parseHash } from '../static/auth0';
import { saveToken, verifyToken } from '../static/auth';

export default class extends React.Component {
  componentDidMount () {
    parseHash().then((result, err)=>{
      if (err) {
            console.error('Error signing in', err);
            return;
      }
          verifyToken(result.idToken).then(valid => {
            if (valid) {
              saveToken(result.idToken, result.accessToken);
              //TODO: prev location
              Router.push(window.location.origin);
            } else {
              Router.push('/')
            }
          });
    })
  }
  render() {
    return null;
  }
}