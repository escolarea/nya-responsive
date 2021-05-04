import React, { useEffect,useState } from 'react'
import Link from "next/link";
import fetchData from '../api/fetch'
import {determineUserStatusFromSubscriptionResponse} from '../helpers/parseUser'
import {setUser} from '../store/userData/action'
import template from '../static/template';
import PropTypes from 'prop-types';


const Account = ({token, isLoggedIn}) => {
    const retrieveUserData = async (token) => {
      if(token){
        const header = {'Authorization': 'Bearer ' + token}
        const res =  await fetchData('GET','api/subscriptions', header )
        const data = await res.json() 
        //This brings the subscription info and the jwt for OS
        const userData= determineUserStatusFromSubscriptionResponse(data.subscription);
        userData.loggedInUser = isLoggedIn;
        setUser(userData)
      }
   }  
   useEffect(()=>{
     if(!isLoggedIn){
      window.history.replaceState({}, "", '/login');
      window.location.reload();
     }
     retrieveUserData(token)
   })

  return (
    <div id="account-menu-container" className="global-menu">
      <div className="ui center aligned grid global-menu-grid">
          <div className="one column row links">
           <div className="left aligned column"><Link href="/account/overview" >Overview</Link> </div>
            <div className="left aligned column"><Link href="/account/subscription" className="left aligned column"> Subscription </Link></div>
            <div className="left aligned column"><Link href="/account/plans" className="left aligned column"> Plans </Link></div>
            <div className="left aligned column"><Link href="/account/presale" className="left aligned column"> Presale Tickets </Link></div>
            <div className="left aligned column"><Link href="/account/notifications" className="left aligned column"> Notification Settings </Link></div>
          </div>
          
        </div>
    </div>
  );
  
} 
Account.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default  template(Account)