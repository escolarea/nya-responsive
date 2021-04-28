import React, { useEffect,useState } from 'react'
import {Form } from 'semantic-ui-react'
import template from '../../static/template';




const Edit = ({loggedInUser}) => {
  //TODO add request for editing this on the respective endpoint
  //TODO Handle value change with hooks
  return (
    <div id="account-menu-container">
     <div className="one column row links overview">
        <Form>
            <div className="left aligned column overview">
            <Form.Field>
                <label className="header-title">First Name</label>
                <input placeholder={loggedInUser.nickname} value={loggedInUser.nickname} />
            </Form.Field>
            </div>
            <div className="left aligned column overview">
            <Form.Field>
                <label className="header-title">Email</label>
                <input placeholder={loggedInUser.name} value={loggedInUser.name} />
            </Form.Field>
            </div>
        </Form>
     </div>
     <div className="one column row links overview-btn">
        <div className="center aligned column">
            <button className="ui fluid primary button overview">update</button>
        </div>
     </div>

    </div>
  );
  
} 

export default  template(Edit)

