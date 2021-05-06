import React, { useEffect } from 'react'
import template from '../../static/template';
import { useRouter } from "next/router";
import Notification from '../../components/notifications'

const Overview = ({loggedInUser, token}) => {
    
  const router = useRouter();
  useEffect (()=>{
    if(!loggedInUser){
      router.push('/account')
    }
   
  },[])
  return (
    <div id="account-menu-container">
     <Notification
     token
     showContent={true}
     accountView={true}
     />
    </div>
  );
  
} 

export default  template(Overview)

