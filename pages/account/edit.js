import React, { useEffect,useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'




const Edit = ({}) => {
  return (
    <div id="account-menu-container">
     <div className="one column row links overview">
        <Form>
            <div className="left aligned column overview">
            <Form.Field>
                <label className="header-title">First Name</label>
                <input placeholder='name from the store' />
            </Form.Field>
            </div>
            <div className="left aligned column overview">
            <Form.Field>
                <label className="header-title">Email</label>
                <input placeholder='email from the store' />
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

export default Edit

