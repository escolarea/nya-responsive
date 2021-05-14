import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { Form } from "semantic-ui-react";
import template from "../../static/template";
import { useRouter } from "next/router";
import { logout } from "../../static/auth0";
import { deleteToken } from "../../static/auth";
import fetchData from "../../api/fetch";

const DeleteAccount = ({ loggedInUser, token }) => {
  const router = useRouter();
  useEffect (()=>{
    if(!token){
      router.push('/login')
    } 
  },[]);

  const [state, setState] = useState({
    deleting: false,
    errorMessage: null,
  });

  const deleteAccount = () => {
    setState({...state, deleting: true});
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    const request = {
      method: "DELETE",
      query: "api/account",
      headers,
    };
    fetchData(request)
      .then((data) => {
        if (!data.ok) {
          setState({...state, errorMessage: "Something went wrong."});
        } else {
          deleteToken();
          logout();
        }
      })
      .catch((error) => {
        setState({...state, errorMessage: "Something went wrong."});
      });
    
  };
  return (
    <div id="account-menu-container">
      <div className="one column row links overview">
        <Form>
          <div className="left aligned column overview">
            <Form.Field>
              First Name: <b>{loggedInUser.nickname}</b>
            </Form.Field>
          </div>
          <div className="left aligned column overview">
            <Form.Field>
              Email: <b>{loggedInUser.name}</b>
            </Form.Field>
          </div>
        </Form>
      </div>

      <div className="one column row links overview-btn text-center">
        {state.errorMessage ? (
          <b>{state.errorMessage}</b>
        ) : !state.deleting ? (
          <b>Are you sure you want to delete your account?</b>
        ) : (
          <b>Deleting Account...</b>
        )}
      </div>
      <div className="one column row links overview-btn">
        <div className="center aligned column">
          <button
            className="ui fluid red button overview"
            style={{ background: "rgba(30,93,186,1)", color: "white" }}
            onClick={deleteAccount}
          >
            delete
          </button>
        </div>
        <div className="center aligned column">
          <button
            className="ui fluid primary button overview"
            onClick={router.back}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default template(DeleteAccount);
