import { React, useState } from "react";
import { connect } from "react-redux";
import { hidePopUp } from "../../store/notSupportedRoutes/action";
import { Grid } from "semantic-ui-react";

const PopUpBox = ({ visible, hidePopUp }) => {
  return (
    <div
      className="pop__up"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <span className="close" onClick={() => hidePopUp()}>
        <img
          src="../static/images/video-modal/close.png"
          alt="clse"
          height="20px"
          width="20px"
        />
      </span>
      <div className="content">
        <h1 className="center aligned header">Please download the NYA App</h1>
        <Grid columns="equal" stackable>
          <Grid.Row>
            <Grid.Column width="8" className="icon">
              <a
                href="https://apps.apple.com/us/app/neil-young-archives/id1444818920"
                target="blank"
              >
                <img src="../static/images/email/itunes-badge.png" alt="itunes" />
              </a>
            </Grid.Column>
            <Grid.Column width="8" className="icon">
              <a
                href="https://play.google.com/store/apps/details?id=com.shakey.nyarchives"
                target="blank"
              >
                <img
                  src="../static/images/email/google-play-badge.png"
                  alt="google-play"
                />
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h2 className="header">or visit us from your desktop computer</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.notSupportedRoutes.visible,
  };
};

export default connect(mapStateToProps, {
  hidePopUp,
})(PopUpBox);
