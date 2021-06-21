import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "semantic-ui-react";
import { hideSideBar, showSideBar } from "../../store/sidebar/action";
import Link from "next/link";
import { getTokenForServer, getjwtToken } from "../../static/auth";
import fetchData from "../../api/fetch";
import { connect } from "react-redux";
import _ from 'lodash'

const Contact = ({ user, token , userData}) => {
  // Redux state
  const visibleSideBar = useSelector((state) => state.sidebar.visible);
  const subject = useSelector((state) => state.contactUs.subject);
  const dispatch = useDispatch();
  // ----
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
    errors: "",
    messageSent: false,
    resultMessage: "",
  });
  //---
  useEffect(() => {
    if (user) {
      setState({ ...state, name: user.name, email: user.email });
    } else {
      user = null;
      token = null;
    }
  }, []);

  const toggleSideBar = () => {
    if (!visibleSideBar) dispatch(showSideBar());
    else dispatch(hideSideBar());
  };

  const validate = () => {
    let errors = {};
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.email.length === 0) errors["email"] = "Required";
    else if (!regexp.test(state.email)) errors["email"] = "Invalid email";
    if (state.name.length === 0) errors["name"] = "Required";
    setState({ ...state, errors });
    return _.isEmpty(errors);
  };

  const sendEmail = async () => {
    const isValidForm = validate();
    if (isValidForm) {
      let onlySubscribersOptions=['neil','archivist' ]
      const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      };
      const payload = {
        name: state.name,
        from: state.email,
        body: state.message,
        subject: subject.value,
        to: subject.value,
      };

      if(onlySubscribersOptions.includes(subject.value) && user&&user.user_metadata){
        const {subscription:{status = false} = {} } = user.user_metadata
        const {userSubscriptionStatus = false} = userData.userData
        const canSendEmail = (userSubscriptionStatus == 'active' || status == 'active');

        if(canSendEmail){
          payload.subject+='-subscribers'
        }else{
          setState({...state, getPlan:true})
          return;
        }
      }
      const res = await fetchData({
        method: "POST",
        query: "api/emails",
        body: JSON.stringify(payload),
        headers,
      });
      if (res.ok) {
        setState({
          ...state,
          messageSent: true,
          resultMessage: "Thank you. Your email has been sent.",
        });
      } else {
        setState({
          ...state,
          messageSent: true,
          resultMessage: "Something went wrong.",
        });
      }
    }
  };

  const renderTopBar = () => {
    return (
      <div className="contact-navbar-wrapper">
        <div className="menu">
          <div className="ui middle aligned grid">
            <div className="three columns row">
              <div
                className="three wide center aligned column"
                onClick={() => toggleSideBar()}
              >
                <img src="./static/icons/arrow.svg" alt="back" height="20px" />
              </div>
              <div className="ten wide center aligned column">Contact Us</div>
              <div className="three wide column"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderType = () => {
    if(state.getPlan){
      return(
        <div className="result-message">
              Subscribers Only
              <div style={{ padding: "16px" }}>
                <Link href="/account/plans">
                  <button className="ui fluid primary button">Get Plan</button>
                </Link>
              </div>
        </div>
      )

    }else{
      return(renderForm())
    }
  }

  const renderForm = () => {
    return (
      <form className="ui form contact">
        <div className="field">
          <div className="ui grid">
            <div className="two columns row">
              <div className="column">
                <label>First name</label>
              </div>
              {state.errors.name && (
                <div className="error-message right aligned column">
                  {state.errors.name}
                </div>
              )}
            </div>
          </div>
          <div className="ui icon input">
            <input
              type="text"
              className="contact-input"
              name="first-name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
            <i
              onClick={() => setState({ ...state, name: "" })}
              className={`circle close link icon ${
                state.name.length > 0 ? "" : "invisible"
              }`}
            ></i>
          </div>
        </div>
        <div className="field">
          <div className="ui grid">
            <div className="two columns row">
              <div className="column">
                <label>Email</label>
              </div>
              {state.errors.email && (
                <div className="error-message right aligned column">
                  {state.errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="ui icon input">
            <input
              type="text"
              className="contact-input"
              name="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <i
              onClick={() => setState({ ...state, email: "" })}
              className={`circle close link icon ${
                state.email.length > 0 ? "" : "invisible"
              }`}
            ></i>
          </div>
        </div>
        {subject && (
          <Link href="/contact/subject">
            <div className="field" style={{ height: "60px" }}>
              <label>Subject</label>
              <div className="ui grid">
                <div className="three columns row">
                  <div className="subject-label thirteen wide column">
                    {subject.label}
                  </div>
                  <div className="three wide column">
                    <img
                      src="./static/icons/arrow.svg"
                      style={{ transform: "rotateY(180deg)" }}
                      alt="back"
                      height="20px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
        <div className="field">
          <textarea
            type="text"
            className="message contact-input"
            name="email"
            placeholder="Write your text here"
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          ></textarea>
        </div>
        <div style={{ padding: "16px" }}>
          <button
            className={`ui fluid primary ${
              state.message.length === 0 ? "disabled" : ""
            } button`}
            type="button"
            onClick={async () => await sendEmail()}
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    );
  };

  return (
    <Container fluid className="contact-container">
      <div className="contact-wrapper">
        <Container fluid className="container contact-main-content">
          {state.messageSent ? (
            <div className="result-message">
              {state.resultMessage}
              <div style={{ padding: "16px" }}>
                <Link href="/">
                  <button className="ui fluid primary button">Back</button>
                </Link>
              </div>
            </div>
          ) : (
            renderType()
          )}
        </Container>
      </div>
    </Container>
  );
};

const mapStateToProps = function (state) {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps)(Contact);

export async function getServerSideProps(props) {
  const { req } = props;
  let user =
    req.headers && req.headers.cookie ? await getTokenForServer(req) : null;
  let token = req.headers && req.headers.cookie ? await getjwtToken(req) : null;
  if(token === undefined) token = null
  if (!user) {
    user = null;
    token = null;
  }
  return { props: { user, token } };
}
