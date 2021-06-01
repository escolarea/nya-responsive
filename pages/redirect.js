import React from 'react';
import Router from 'next/router';
import { parseHash } from '../static/auth0';
import { saveToken, verifyToken } from '../static/auth';
import {getPath} from '../helpers/modalState'
import {setToken} from '../store/token/actions'
import { connect } from "react-redux";

class Redirect extends React.Component {
  componentDidMount () {
    parseHash().then((result, err)=>{
      if (err) {
            console.error('Error signing in', err);
            return;
      }
          verifyToken(result.idToken).then(valid => {
            if (valid) {
              saveToken(result.idToken, result.accessToken);
              //save in redux 
              const userData = {
                token:result.idToken,
                user:result.idTokenPayload
              }
              this.props.setToken(userData);

            }
             const path = getPath();
             Router.push(path);
          });
    })
  }
  render() {
    return null;
  }
}

export default  connect(null, {
  setToken,
})(Redirect)