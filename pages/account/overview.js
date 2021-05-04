import React, { useEffect,useState } from 'react'
import template from '../../static/template';



const Overview = ({loggedInUser}) => {
  const editAccount = () =>{
    window.history.replaceState({}, "", '/account/edit');
    window.location.reload();
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

