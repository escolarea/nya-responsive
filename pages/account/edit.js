import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import template from "../../static/template";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import fetchData from "../../api/fetch";

const Edit = ({ loggedInUser }) => {
  //TODO add request for editing this on the respective endpoint
  //TODO Handle value change with hooks
  const router = useRouter();
  const userToken = useSelector((state) => state.userToken.userToken);
  console.log(loggedInUser);
  useEffect(() => {
    if (!loggedInUser) {
      router.push("/account");
    }
  }, []);
  
  const prevName = loggedInUser ? loggedInUser.user_metadata.customFirstname : "";
  const prevEmail = loggedInUser ? loggedInUser.email : "";

  const [state, setState] = useState({
    username: prevName,
    email: prevEmail,
    updating: false,
    resultMessage: null,
  });

  const updateAccount = () => {
    const token = userToken.token;
    console.log("token",token);
    setState({ ...state, updating: true });
    const usernameChange =
      state.username !== prevName ? "username_change" : null;
    const emailChange = state.email !== prevEmail ? "email_change" : null;
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    const request = {
      method: "PUT",
      query: "api/account/settings",
      headers,
    };
    if (usernameChange) {
      fetchData({
        ...request,
        body: JSON.stringify({
          type: usernameChange,
          values: { username: state.username },
        }),
      }).then(data => {
        if(data.ok){
          setState({ ...state, resultMessage: "Success"})
        } else setState({...state, resultMessage: "Something went wrong."})
      }).catch(err =>{
        setState({...state, resultMessage: "Something went wrong."})
      })
    }
    if (emailChange) {
      fetchData({
        ...request,
        body: JSON.stringify({
          type: emailChange,
          values: { email: state.email },
        }),
      }).then(data => {
        if(data.ok){
          setState({ ...state, resultMessage: "Success"})
        } else setState({...state, resultMessage: "Something went wrong."})
      }).catch(err =>{
        setState({...state, resultMessage: "Something went wrong."})
      })
    }
  };

  return (
    <div id="account-menu-container">
      {!state.resultMessage && (
        <div className="one column row links overview">
          <Form>
            <div className="left aligned column overview">
              <Form.Field>
                <label className="header-title">First Name</label>
                <input
                  placeholder={state.username}
                  value={state.username}
                  onChange={(e) => setState({ ...state, username: e.target.value })}
                  disabled={state.updating}
                />
              </Form.Field>
            </div>
            <div className="left aligned column overview">
              <Form.Field>
                <label className="header-title">Email</label>
                <input
                  placeholder={state.email}
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  disabled={state.updating}
                />
              </Form.Field>
            </div>
          </Form>
        </div>
      )}
      {state.updating && (
        <div className="one column row links overview-btn">
          <div className="center aligned column">Updating...</div>
        </div>
      )}
      {state.resultMessage && (
        <div className="one column row links overview-btn">
          <div className="center aligned column">{state.resultMessage}</div>
        </div>
      )}
      {!state.updating && !state.resultMessage && (
        <div className="one column row links overview-btn">
          <div className="center aligned column">
            <button
              className="ui fluid primary button overview"
              onClick={updateAccount}
              disabled={
                (state.username === prevName && 
                state.email === prevEmail) ||
                state.email === "" ||
                state.username === ""
              }
            >
              update
            </button>
          </div>
        </div>
      )}
      {state.resultMessage && (
        <div className="one column row links overview-btn">
          <div className="center aligned column">
            <button
              className="ui fluid primary button overview"
              onClick={router.back}
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default template(Edit);
