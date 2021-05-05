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

            }
             Router.push(window.location.origin);
          });
    })
  }
  render() {
    return null;
  }
}