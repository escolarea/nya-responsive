import React, { useEffect,useState } from 'react'




const Overview = ({}) => {
  return (
    <div id="account-menu-container">
     <div className="one column row links overview">
        <div className="left aligned column overview">
            <span className="header-title">First name</span>
            <p>name from the store</p>
        </div>
        <div className="left aligned column overview">
         <span className="header-title">Email</span>
         <p>email from the store</p>
        </div>
     </div>
     <div className="one column row links overview-btn">
        <div className="center aligned column">
            <button className="ui fluid primary button overview">Edit account</button>
        </div>
        <div className="center aligned column">
            <button className="ui fluid primary button overview">Delete account</button>
        </div>
     </div>
    </div>
  );
  
} 

export default Overview

