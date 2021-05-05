import React, { useEffect} from 'react'
import template from '../../static/template';
import { useRouter } from "next/router";
import { connect } from "react-redux"

const Subscription = ({userData}) => {
  const router = useRouter();
  useEffect (()=>{
    if(userData.userData&& Object.keys(userData.userData).length == 0){
      router.
      router.push('/account')
    }
   
  },[])
  const {userPlanId = "NYA-FREE"} = userData.userData

  let userPlanType =  userPlanId && userPlanId.split(/\W|_/g);
    userPlanType = `NYA-${userPlanType[userPlanType.length - 1]}`;

  return (
    <div id="account-menu-container">
     <div className="one column row links subscription-overview">
        <div className="left aligned column ">
            <h2>{userPlanType}</h2>
        </div>
     </div>
     <div className="one column row links overview-btn">
        <div className="center aligned column">
            <button className="ui fluid primary button overview" onClick={()=> {
              // let location = router.createLocation(`/account/plans`);
              router.push('/account/plans');
            }
              }>Change Plan</button>
        </div>
     </div>
    </div>
  );
  
} 
const mapStateToProps = function (state) {
  return {
    userData: state.userData,
  };
}
const SubscriptionComponent = connect( mapStateToProps)(Subscription);

export default  template(SubscriptionComponent)

