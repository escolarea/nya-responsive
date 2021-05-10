import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import Notification from '../../components/notifications'
import {getjwtToken} from '../../static/auth';

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

export async function getServerSideProps(props) {
  const {req} = props

  let token =  req && req.headers && req.headers.cookie ?  await getjwtToken(req) : null;
  if(token === undefined) token = null;
  
  return { props: { token } }
}


export default  Overview

