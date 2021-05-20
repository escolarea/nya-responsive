import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import Notification from '../../components/modals/notifications'
import template from '../../static/template';

const Overview = ({ token}) => {
  const router = useRouter();
  useEffect (()=>{
    if(!token){
      router.push('/account')
    }
  },[])
  return (
    <div id="account-menu-container">
     <Notification
     token={token}
     showContent={true}
     accountView={true}
     />
    </div>
  );
  
} 


export default  template( Overview)

