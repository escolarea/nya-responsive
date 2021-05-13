import React, { useEffect,useState } from 'react'
import Link from "next/link";
import fetchData from '../api/fetch'
import {determineUserStatusFromSubscriptionResponse} from '../helpers/parseUser'
import {setUser} from '../store/userData/action'
import template from '../static/template';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { logout } from '../static/auth0';
import {removeToken} from '../store/token/actions'
import { useRouter } from 'next/router';
import LoadingIndicator from '../components/loading'


const Account = ({ isLoggedIn, setUser, removeToken, userInfo, userData}) => {
    const router = useRouter();
    const { token } = userInfo;

    const [ pageStatus, setPageStatus ] = useState('loading');
    
    const retrieveUserData = async (token) => {
      if(token){
        const headers = {'Authorization': 'Bearer ' + token};
        const res =  await fetchData({method:'GET',query:'api/subscriptions', headers });
        const data = await res.json();
        //This brings the subscription info and the jwt for OS
        const userData= determineUserStatusFromSubscriptionResponse(data.subscription);
        userData.loggedInUser = isLoggedIn;
        setUser(userData);
    
      }
   }  
   useEffect(()=>{

     if(!isLoggedIn){
      router.push('/login')
      return;
     }
     if(userData.userData&& Object.keys(userData.userData).length == 0){
      retrieveUserData(token);
     }
     setPageStatus('ready');
   },[])

  if(pageStatus === 'loading'){
    return(
    <div className="loading">
      <center>
        <LoadingIndicator/>
      </center>
    </div>)
  }
  return (
    <div id="account-menu-container" className="global-menu">
      <div className="ui center aligned grid global-menu-grid">
          <div className="one column row links">
           <div className="left aligned column"><Link href="/account/overview" >Overview</Link> </div>
            <div className="left aligned column"><Link href="/account/subscription" className="left aligned column"> Subscription </Link></div>
            <div className="left aligned column"><Link href="/account/plans" className="left aligned column"> Plans </Link></div>
            <div className="left aligned column"><Link href="/account/presale" className="left aligned column"> Presale Tickets </Link></div>
            <div className="left aligned column"><Link href="/account/notifications" className="left aligned column"> Notification Settings </Link></div>
            <div id="logout-btn"className="left aligned" onTouchStart={()=>{
              removeToken();
              localStorage.removeItem('newsletter-pref-seen');
              logout();
            }}>LOG OUT </div>
          </div>
          
        </div>
    </div>
  );
  
} 
Account.propTypes = {
  isLoggedIn: PropTypes.bool
}


const mapStateToProps = (state) => {

  return {
    userInfo : state.userToken.userToken,
    userData : state.userData
  };
};
const AccountComponent = connect( mapStateToProps, {
  setUser,
  removeToken
})(Account);

export default template(AccountComponent)