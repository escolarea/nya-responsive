import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {Container} from 'semantic-ui-react';
import { hideSideBar, showSideBar } from "../../store/sidebar/action";
import Link from "next/link";
import template from '../../static/template';
import jwtDecode from 'jwt-decode';

const Contact = ({token, isLoggedIn}) => {
  // Redux state 
  const visibleSideBar = useSelector(state => state.sidebar.visible);
  const subject = useSelector(state=>state.contactUs.subject);
  const dispatch = useDispatch();
  // -----
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  
  const toggleSideBar = () => {
    if (!visibleSideBar) dispatch(showSideBar());
    else dispatch(hideSideBar());
  };

  const validate = () => {
    let error = {};
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0) error["email"] = "Required";
    else if (!regexp.test(email)) error["email"] = "Invalid email";
    if (name.length === 0) error["name"] = "Required";
    setErrors(error);
    return !!error
  };

  const sendEmail = () => {
    const isValidForm = validate();
    if (isValidForm) {
      console.log("USER Valida");
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

  return (
    <Container className="contact-container">
      {renderTopBar()}
      <div className="contact-wrapper">
        <Container className="container contact-main-content">
          <form className="ui form contact">
            <div className="field">
              <div className="ui grid">
                <div className="two columns row">
                  <div className="column">
                    <label>First name</label>
                  </div>
                  {errors.name && (
                    <div className="error-message right aligned column">
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
              <div className="ui icon input">
                <input
                  type="text"
                  className="contact-input"
                  name="first-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <i
                  onClick={() => setName("")}
                  className={`circle close link icon ${
                    name.length > 0 ? "" : "invisible"
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
                  {errors.email && (
                    <div className="error-message right aligned column">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="ui icon input">
                <input
                  type="text"
                  className="contact-input"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i
                  onClick={() => setEmail("")}
                  className={`circle close link icon ${
                    email.length > 0 ? "" : "invisible"
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div style={{ padding: "16px" }}>
              <button
                className={`ui fluid primary ${
                  message.length === 0 ? "disabled" : ""
                } button`}
                type="button"
                onClick={() => sendEmail()}
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </Container>
      </div>
    </Container>
  );
};

// export default template(Contact);
export default Contact;
