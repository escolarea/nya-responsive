import React, { useEffect } from 'react'
import template from '../../static/template';
import { useRouter } from "next/router";

const Overview = ({loggedInUser}) => {
  const router = useRouter();
  useEffect (()=>{
    if(!loggedInUser){
      router.push('/account')
    }
   
  },[])
  const editAccount = () =>{
    router.push('/account/edit')
  }
  return (
    <div id="account-menu-container">
     <div className="one column row links overview">
        <div className="left aligned column overview" onClick={editAccount}>
            <span className="header-title">First name</span>
            <p>{loggedInUser.nickname}</p>
        </div>
        <div className="left aligned column overview" onClick={editAccount}>
         <span className="header-title">Email</span>
         <p>{loggedInUser.name}</p>
        </div>
     </div>
     <div className="one column row links overview-btn">
        <div className="center aligned column">
            <button className="ui fluid primary button overview" 
            onClick={editAccount}>Edit account</button>
        </div>
        <div className="center aligned column">
            <button className="ui fluid primary button overview">Delete account</button>
        </div>
     </div>
    </div>
  );
  
} 

export default  template(Overview)

