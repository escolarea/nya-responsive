import "semantic-ui-css/semantic.min.css";
import "../styles/index.scss";
import { wrapper } from "../store/store";
import PopUpBox from "../components/pop-up-box";
import { Sidebar} from "semantic-ui-react";
import { React, Fragment } from "react";
import SideBarMenu from '../components/sidebar'
import { Auth0Provider } from '@auth0/auth0-react';
import PropTypes from 'prop-types';


const WrappedApp = ({ Component, pageProps }) => {
  //TODO : add a temporary loaded on route change
  const onRedirectCallback = (appState) => {
    Router.replace(appState?.returnTo || '/');
  };
  return (
    <Auth0Provider
        domain={process.env.NEXT_PUBLIC_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        audience={process.env.NEXT_PUBLIC_AUDIENCE}
        scope="read:current_user"
        redirectUri={typeof window !== 'undefined' && window.location.origin}
        onRedirectCallback={typeof window !== 'undefined' && window.location.origin}
      >
    <Fragment>
      <Sidebar.Pushable>
        <SideBarMenu
        />
        <Sidebar.Pusher>
          <div id="main-wrapper">            
            <div id="content">
              <div
                className="content-wrapper"
                style={{ width: "100%", height: "100%" }}
              >
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <PopUpBox />
    </Fragment>
    </Auth0Provider>
  );
};
WrappedApp.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default wrapper.withRedux(WrappedApp);
