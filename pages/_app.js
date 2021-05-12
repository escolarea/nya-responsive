import "semantic-ui-css/semantic.min.css";
import "../styles/index.scss";
import { wrapper } from "../store/store";
import {useEffect, useState} from 'react';
import { connect } from "react-redux";
import PopUpBox from "../components/pop-up-box";
import Notification from '../components/notifications'
import { Sidebar} from "semantic-ui-react";
import { React, Fragment } from "react";
import SideBarMenu from '../components/sidebar'
import { Auth0Provider } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import {showPopUp} from '../store/notSupportedRoutes/action'
import {hasSeenNewsletterPreference} from '../helpers/modalState'
import { useRouter } from 'next/router';
import NavBar from "../components/navbar";
import Router from 'next/router';
import LoadingIndicator from '../components/loading'


const WrappedApp = ({ Component, pageProps, visible, modalType, showPopUp, userToken}) => {
  const router = useRouter();
  const { token, user } = userToken;
  const [isLoading, setLoading] = useState(false)

  const currentPath = router.asPath || '';
  const path = currentPath && currentPath.split("/").pop();
  const noNavRoutes = ['news', 'login', 'redirect'];
  const renderNavBar = (noNavRoutes.includes(path) || !(typeof parseInt(path) === 'number') );


  useEffect(()=>{
    Router.events.on('routeChangeStart', () => {

      setLoading(true)

    });
    Router.events.on('routeChangeComplete', () => {
      setLoading(false)
    })

    if(user && user.user_metadata){
      const { firstLogin } = user.user_metadata;

      if(firstLogin && !hasSeenNewsletterPreference()){
        showPopUp('first-login');
        localStorage.setItem('newsletter-pref-seen', true)
      }
    }
  },[userToken])


  const renderModal = () =>{
    switch (modalType){
      case 'first-login':
        if(token){
          return(
            <Notification
              token={token}
            />)
        }else{
          break;
        }
      case 'download':
        return(<PopUpBox />)
      default:
        break;
    }

  }
  return (
    <Auth0Provider
        domain={process.env.NEXT_PUBLIC_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        audience={process.env.NEXT_PUBLIC_AUDIENCE}
        scope="read:current_user"
        redirectUri={typeof window !== 'undefined' && window.location.origin}
        onRedirectCallback={typeof window !== 'undefined' && window.location.origin}
      >
        {isLoading?(
          <div className="loading">
          <center>
           <LoadingIndicator/>
          </center>
          </div>
        ):(
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
                   
                    {!renderNavBar && <NavBar 
                    path={path}
                    />}
                    <Component {...pageProps} />
                  </div>
                </div>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
           {visible && renderModal()}
        </Fragment>
        )}
    </Auth0Provider>
  );
};
WrappedApp.propTypes = {
  isLoggedIn: PropTypes.bool,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    visible : state.notSupportedRoutes.visible,
    modalType : state.notSupportedRoutes.type,
    userToken : state.userToken.userToken
  };
};

const test = connect(mapStateToProps,{showPopUp})(WrappedApp)
export default wrapper.withRedux(test);
