import {React, useState} from 'react';

const PopUpBox = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="pop__up" style={{visibility: visible ? 'visible' : 'hidden'}}>
      <span className="close" onClick={() => setVisible(false)}>
        <img src="/static/images/video-modal/close.png" alt="clse" height="20px" width="20px"/>
      </span>
      <div className="content">
      <h1 className="center aligned header">
        Please download the NYA App
      </h1>
      <div className="ui stackable grid">
        <div className="column icon">
          <img src="/static/images/email/itunes-badge.png" alt="itunes"/>
        </div>
        <div className="column icon">
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

export default PopUpBox;