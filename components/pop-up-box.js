import {React, useState} from 'react';
import {connect} from 'react-redux';
import { hidePopUp } from '../store/notSupportedRoutes/action'

const PopUpBox = ({visible, hidePopUp}) => {

  return (
    <div className="pop__up" style={{visibility: visible ? 'visible' : 'hidden'}}>
      <span className="close" onClick={() => hidePopUp()}>
        <img src="/static/images/video-modal/close.png" alt="clse" height="20px" width="20px"/>
      </span>
      <div className="content">
      <h1 className="center aligned header">
        Please download the NYA App
      </h1>
      <div className="ui stackable grid">
        <div className="eight wide column icon">
          <img src="/static/images/email/itunes-badge.png" alt="itunes"/>
        </div>
        <div className="eight wide column icon">
          <img src="/static/images/email/google-play-badge.png" alt="google-play"/>
        </div>
        <div className="centered column">
          <h2 className="header">
            or visit us from your desktop computer
          </h2>
        </div>
      </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    visible: state.notSupportedRoutes.visible
  }
}

export default connect(mapStateToProps, {
  hidePopUp
})(PopUpBox);