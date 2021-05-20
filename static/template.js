import React from 'react';
import { getTokenForBrowser, getTokenForServer,getjwtToken } from '../static/auth';

export default Page => class Template extends React.Component {

  static async getInitialProps({ req }) {
    const token = await getjwtToken()
    const loggedInUser = await getTokenForBrowser() || await getTokenForServer(req);
    const pageProperties = await Page.getInitialProps && await Page.getInitialProps(req);
    return {
      ...pageProperties,
      token,
      loggedInUser,
      isLoggedIn: !!loggedInUser
    }
  }

  render() {
    return (
      <div>
        <Page { ...this.props } />
      </div>
    )
  }
}