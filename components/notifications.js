import { React, useState} from "react";
import { connect } from "react-redux";
import { hidePopUp } from "../store/notSupportedRoutes/action";
import { Grid } from "semantic-ui-react";
import RadioButton from '../components/radioButton'

const notification = ({ visible,showContent, hidePopUp,accountView }) => {
    const [selectionType, setSelectionType]=useState('unsubscribe')

  const selectionOnChange = (type)=> {
    setSelectionType(type)
  } 
  const SetNotificationSettings = () =>{
      console.log('selectionType', selectionType);
  }

  return (
    <div
      className="pop__up"
      style={{ visibility: visible || showContent ? "visible" : "hidden" }}
    >
      {!accountView && <span className="close" onClick={() => hidePopUp()}>
        <img
          src="../static/images/video-modal/close.png"
          alt="clse"
          height="20px"
          width="20px"
        />
      </span>}
      <div className="content" >
        <h1 className="center aligned header">Notification Settings</h1>
        <Grid columns="equal" stackable>
            <Grid.Row>
                <Grid.Column textAlign="center">
                <p className="header">Would you like to receive newsletters from NYA? </p>
                </Grid.Column>
            </Grid.Row>
          <Grid.Row>
            <Grid.Column width="8" className="icon">
                <div>
                <RadioButton
                    id="unsubscribe"
                    checked={selectionType=='unsubscribe'} 
                    onChange={()=>selectionOnChange('unsubscribe')}
                    product='unsubscribe'
                    value='unsubscribe'
                />
                    NO
                </div>
                <div>
                <RadioButton
                    id="subscribe"
                    checked={selectionType=='subscribe'} 
                    onChange={()=>selectionOnChange('subscribe')}
                    product='subscribe'
                    value='subscribe'
                />
                YES
                </div>
            </Grid.Column>
            
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <div onTouchStart={()=>SetNotificationSettings()}>update btn</div>
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
})(notification);
