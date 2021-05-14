import React from "react";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import {setSubject} from '../../store/contactUs/action';
import { getTokenForServer, getjwtToken } from "../../static/auth";

const ContactSubject = ({user, token}) => {
  const router = useRouter();
  const subject = useSelector(state=>state.contactUs.subject);
  const dispatch = useDispatch();
  const options = [
    { value: "neil", label: "Letters for Neil" },
    { value: "archivist", label: "Question for the Archivist" },
    { value: "help", label: "Customer Support" },
    { value: "billing", label: "Billing Issue" },
    { value: "data", label: "Question about Data Usage" },
  ];

  const updateSubject = (option) => {
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
                      {(subject.value === option. value) && <i className="check icon" />}
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

export default ContactSubject;

export async function getServerSideProps(props) {
  const { req } = props;
  let user =
    req.headers && req.headers.cookie ? await getTokenForServer(req) : null;
  let token = req.headers && req.headers.cookie ? await getjwtToken(req) : null;
  if(token === undefined) token = null
  if (!user) {
    user = null;
  }
  return {props: {user,token}};
}