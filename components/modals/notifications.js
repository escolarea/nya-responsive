import { React, useEffect, useState} from "react";
import { connect } from "react-redux";
import { hidePopUp } from "../../store/notSupportedRoutes/action";
import { Grid } from "semantic-ui-react";
import RadioButton from '../../components/radioButton'
import fetchData from '../../api/fetch';
import { useRouter } from 'next/router';

const notification = ({ visible,showContent, hidePopUp,accountView, token,modalType }) => {
    const [selectionType, setSelectionType] = useState('unsubscribed');
    const [notificationStatus, setNotificationStatus] = useState('loading');
    const router = useRouter();

  useEffect(async ()=>{

    if(token && notificationStatus ==='loading' ){
        const headers = {"Authorization": 'Bearer ' + token,'Content-Type': 'application/json'}
        const request = {
          method:'GET',
          query:'api/account/settings',
          headers
        }

        fetchData(request).then(data=>data.json()).then(data =>{
            setNotificationStatus('ready')
            const {cdc:{subscribed = false} = {} } = data
            if(subscribed){
                setSelectionType('subscribed');
            }
        }).catch(err=>{
            setNotificationStatus('try-again')
        })
       
    }    
  },[token])
  const selectionOnChange = (type)=> {
    setSelectionType(type)
  } 
  const SetNotificationSettings = async () =>{
    setNotificationStatus('loading');
      const settings = {
        type: 'cdc_newsletter',
        values: { subscribed: selectionType ==='subscribed'? true : false },
      }
      const headers = {"Authorization": 'Bearer ' + token, 'Content-Type': 'application/json'}
      const request = {
        method:'PUT',
        query:'api/account/settings',
        headers,
        body: JSON.stringify(settings)
        
      }

      fetchData(request).then(data=>{
            setNotificationStatus('updated')
        //   confirmation view
      }).catch(err=>{
            setNotificationStatus('try-again')
        //   set error message on top and try again bttn 
      })

  }
  const renderNotifications = () => {
    switch(notificationStatus) {
        case 'loading':
            return(<Grid columns="equal" stackable>
            <Grid.Row>
            <Grid.Column textAlign="center">
                loading ...
            </Grid.Column>
            </Grid.Row>
            </Grid>)
        case 'updated':
            return( <Grid columns="equal" stackable>
            <Grid.Row>
            <Grid.Column textAlign="center">
                Successfully Updated
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column textAlign="center">
              <div onTouchStart={()=>{
                  if(!visible)router.back();
                  if(modalType=== 'first-login'){
                    hidePopUp('first-login');
                  }
                  }} className="update-btn">Go Back</div>
            </Grid.Column>
          </Grid.Row></Grid>)
        case 'try-again':
            return( <Grid columns="equal" stackable>
                <Grid.Row>
                <Grid.Column textAlign="center">
                    Try again
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column textAlign="center">
                  <div onTouchStart={()=>setNotificationStatus('ready')} className="update-btn">Go Back</div>
                </Grid.Column>
              </Grid.Row></Grid>)
        default:
            return(<Grid columns="equal" stackable>
            <Grid.Row>
                <Grid.Column textAlign="center">
                <p className="header">Would you like to receive newsletters from NYA? </p>
                </Grid.Column>
            </Grid.Row >
          <Grid.Row className="modal-input">
            <Grid.Column width="8" className="icon">
                <div>
                <RadioButton
                    id="unsubscribed"
                    checked={(selectionType==='unsubscribed')} 
                    onChange={()=>selectionOnChange('unsubscribed')}
                    product='unsubscribed'
                    value='unsubscribed'
                />
                    NO
                </div>
                <div>
                <RadioButton
                    id="subscribed"
                    checked={(selectionType==='subscribed')} 
                    onChange={()=>selectionOnChange('subscribed')}
                    product='subscribed'
                    value='subscribed'
                />
                YES
                </div>
            </Grid.Column>
            
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <div onTouchStart={()=>SetNotificationSettings() }className="update-btn">SUBMIT</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>)
      } 
  }

  const styleName = accountView ? 'pop__up account' : 'pop__up modal'

  return (
    <div
      className={styleName}
      style={{ visibility: visible || showContent ? "visible" : "hidden" }}
    >
      {!accountView && <span className="close" onClick={() =>{ 
          if(modalType === 'first-login'){
            hidePopUp('first-login');
          }
          }}>
        <img
          src="../static/images/video-modal/close.png"
          alt="clse"
          height="20px"
          width="20px"
        />
      </span>}
      <div className="content" >
        <h1 className="center aligned header">Notification Settings</h1>
        {renderNotifications()}
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    visible: state.notSupportedRoutes.visible,
    modalType : state.notSupportedRoutes.type
  };
};


export default connect(mapStateToProps, {
  hidePopUp,
})(notification);
