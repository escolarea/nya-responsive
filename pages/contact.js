import React from "react";
import { Container, Grid, Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

const Contact = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Container className="contact-container">
        <div className="contact-navbar-wrapper">
          <div className="menu">
            <div className="ui middle aligned grid">
              <div className="three columns row">
                <div className="three wide center aligned column" onClick={()=>router.back()}>
                  <img
                    src="./static/icons/arrow.svg"
                    alt="back"
                    height="20px"
                  />
                </div>
                <div className="ten wide center aligned column">Contact Us</div>
                <div className="three wide column"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-wrapper">
          <Container className="contact-main-content">
            <form className="ui form contact">
              <div className="field">
                <label>First Name</label>
                <div className="ui icon input">
                  <input
                    type="text"
                    name="first-name"
                    placeholder="First Name"
                  />
                  <i className="circle close link icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Last Name</label>
                <div className="error-message">Hola</div>
                <div className="ui icon input">
                  <input type="text" name="last-name" placeholder="Last Name" />
                  <i className="circle close link icon"></i>
                </div>
              </div>
              <div className="field">
                <label>Subject</label>
                <div className="ui grid">
                  <div className="three columns row">
                    <div className="thirteen wide column">Subject</div>
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
              <button className="ui button" type="button">
                Submit
              </button>
            </form>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
