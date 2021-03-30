import React, { useEffect,useState } from 'react'
import template from '../../static/template';
import PropTypes from 'prop-types';


const Overview = ({loggedInUser}) => {
  useEffect(()=>{
         console.log("loggedInUser", loggedInUser);
  },[])
  const {name, nickname} = loggedInUser
  console.log("name", name)
  //TODO : add loading 
  return (
    <div id="account-menu-container">
     <div className="one column row links overview">
        <div className="left aligned column overview">
            <span className="header-title">First name</span>
            <p>{nickname}</p>
        </div>
        <div className="left aligned column overview">
         <span className="header-title">Email</span>
         <p>{name}</p>
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

export default template(Overview)

