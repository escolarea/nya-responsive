import React from "react";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import {setSubject} from '../../store/contactUs/action';
import template from '../../static/template';

const ContactSubject = ({token}) => {
  const router = useRouter();
  const subject = useSelector(state=>state.contactUs.subject);
  const dispatch = useDispatch();
  const options = [
    { value: "neil", label: "Letters for Neil", loginRequired: true},
    { value: "archivist", label: "Question for the Archivist",loginRequired: true },
    { value: "help", label: "Customer Support" },
    { value: "billing", label: "Billing Issue" },
    { value: "data", label: "Question about Data Usage" },
  ];

  const updateSubject = (option) => {
    if (!token && option.loginRequired) {
      localStorage.setItem('path','/contact')
      router.push("/login");
      return;
    }
    dispatch(setSubject(option));
    router.back();
  }

  const renderTopBar = () => {
    return (
      <div className="contact-navbar-wrapper">
        <div className="menu">
          <div className="ui middle aligned grid">
            <div className="three columns row">
              <div
                className="three wide center aligned column"
                onClick={() => router.back()}
              >
                <img src="../static/icons/arrow.svg" alt="back" height="20px" />
              </div>
              <div className="ten wide center aligned column">Subject</div>
              <div className="three wide column"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Container className="contact-container">
        <div className="contact-wrapper">
          <Container className="contact-main-content">
            <div className="ui grid" style={{ marginTop: "10px"}}>
              {options.map(option => {
                return (
                  <div className="row subject-option" key={option.value} onClick={() => updateSubject(option)}>
                    <div className="thirteen wide column">
                      {option.label}
                    </div>
                    <div className="three wide column">
                      {(subject.value === option.value) && <i className="check icon" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default template(ContactSubject);