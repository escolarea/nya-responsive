import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import template from "../../static/template";
import { useRouter } from "next/router";
import fetchData from "../../api/fetch";

const Edit = ({ loggedInUser, token }) => {
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const prevName = loggedInUser
    ? loggedInUser.user_metadata.customFirstname || loggedInUser.nickname
    : "";
  const prevEmail = loggedInUser ? loggedInUser.email : "";

  const [state, setState] = useState({
    username: prevName,
    email: prevEmail,
    updating: false,
    resultMessage: null,
  });

  const updateAccount = () => {
    setState({ ...state, updating: true });
    const change = `${state.username !== prevName ? "username_change" : ""}${
      state.email !== prevEmail ? "email_change" : ""
    }`;
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
    console.log(change);
    const request = {
      method: "PUT",
      query: "api/account/settings",
      headers,
      body: JSON.stringify({
        type: change,
        values: { username: state.username, email: state.email }
      })
    };
    if (change) {
      fetchData(request)
        .then((data) => {
          if (data.ok) {
            setState({ ...state, resultMessage: "Success. Reloading app in 3 secs..." });
            setTimeout(()=>router.push("/login"), 3000);
          } else setState({ ...state, resultMessage: "Something went wrong." });
        })
        .catch((err) => {
          setState({ ...state, resultMessage: "Something went wrong." });
        });
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
                  onChange={(e) =>
                    setState({ ...state, username: e.target.value })
                  }
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
                (state.username === prevName && state.email === prevEmail) ||
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
