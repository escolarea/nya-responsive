import React, {useEffect, useState}from 'react'
import fetchData from '../../api/fetch'
import {NYA_FREE,NYA_YEARLY, NYA_MONTHLY,NYA_UNLIMITED } from '../../utils/url_constants'
import PlansPanel from '../../components/user/plans'
import {getPlanInfo} from '../../helpers/plans'
import { withAuth0 } from '@auth0/auth0-react';
import {getTokenForServer,getjwtToken} from '../../static/auth'
import { connect } from "react-redux"
import {setUser} from '../../store/userData/action'
import {updateUserInfo} from '../../helpers/getUserData'
import template from "../../static/template"
import {useRouter} from "next/router";

const Presale = ({planPrices, planInformation, user,token, setUser, userData}) => {
    const [plansList, setplansList] = useState({})
    const [userPlan, setpurchasedPlan ] = useState({})
    const [loading, setLoading ] = useState(false)
    const router = useRouter();
        
    useEffect(()=>{
      //DO THIS IN THE WRAPPER THAT SHOW LOADING BEFORE PASSING DOWN THE INFO
      if(token && (userData.userData && Object.keys(userData.userData).length === 0)){
          setLoading(true)
        updateUserInfo(token, setUser).then(data=>{
          setLoading(false)
        })
      }
      parsePlans();
    },[])
   
 
    const parsePlans = () => {
        let plansAvailable = {};
        let plans = planPrices
        let purchasedPlan ={
            price:'0.00',
            name: NYA_FREE
        }
        //get this info from the store
      const {userPlanId = NYA_FREE,relevantSubscriptionDate ={}} = userData
        // let sortedPlans = sortPlansAccordingPrice(plans);

        for (let i = 0; i < plans.length; i++) {
          let plan = plans[i];

          let planType = plan.product_id ? plan.product_id.split(/\W|_/g) : null;
          if (planType || userPlanId == NYA_FREE ) {
            if (!plan.interval) plan.interval = "month";
            planType = `NYA-${planType[planType.length - 1]}`;
            // basic Plans don't have special terminology like VIDEO ,PATREON
            if (planType == NYA_YEARLY || planType == NYA_MONTHLY) {
                planType = NYA_UNLIMITED;
            }
            if (!plansAvailable[planType]) {
              plansAvailable[planType] = plansAvailable[planType] || [];
              plansAvailable[planType]['plan'] = [] 
              plansAvailable[planType]['prices'] = [] 
              plansAvailable[planType]['yearPrice'] = 0
            }
            plansAvailable[planType]['planName'] = planType

            if(plan.interval == "year"){
                plansAvailable[planType]["plan"].push(plan);
            }else{
                plansAvailable[planType]["plan"].unshift(plan);
            }
            
              //Just showing year prices
            if(plan.interval == "year"){
                plansAvailable[planType]['yearPrice'] = parseFloat(plan.price)
                plansAvailable[planType]["prices"].push(
                    <span className="plan-price" key={plan.product_id}>
                    ${plan.price}/{plan.interval}
                    </span>
                );
            }
          }
        //check the type of subscription the user has
          if(userPlanId == plan.product_id){
          
            purchasedPlan = plan
            purchasedPlan.planType = planType
            purchasedPlan.planTitle = 'NYA FREE'
            purchasedPlan.renewalDate = relevantSubscriptionDate
            let planTitle = getPlan(planType) 
            if(planTitle && planTitle.displayName) purchasedPlan.planTitle = `NYA ${planTitle.displayName.toLowerCase()}`
          }
          let planInfo =(planInformation.data && getPlanInfo(planInformation.data, planType)) || {};   
          
          plansAvailable[planType]['planBenefits'] = planInfo.planBenefits
          plansAvailable[planType]['headerURL'] = planInfo.headerURL
          plansAvailable[planType]['buyButtonText'] = planInfo.buyButtonText
          plansAvailable[planType]['displayName'] = planInfo.displayName
          plansAvailable[planType]['name'] =  planInfo.name
          plansAvailable[planType]['planDescription'] = planInfo.planDescription
          
        }
        setplansList(plansAvailable)
        setpurchasedPlan(purchasedPlan) 
    }
  if(loading){
    return<div>Loading</div>
  }
  return (
    <PlansPanel
        plansAvailable={plansList}
        planInformation={planInformation}
        purchasedPlan={userPlan}
        user={user}
        token={token}
        setUser={setUser}
        userData={userData.userData}
  />
  );
  
} 

export async function getServerSideProps(props) {
    const {req} = props
    const request = {
      method:'GET',
      query:'api/subscriptions/plan-prices',
    }
    const res  = await fetchData(request);
    const data = await res.json();
    //get user information from server 
    let user  =  req && req.headers && req.headers.cookie ?  await getTokenForServer(req) : null;
    let token =  req && req.headers && req.headers.cookie ?  await getjwtToken(req) : null;
    if(token === undefined) token = null;
    if(!user) user = null

    const {planPrices, planInformation} = data;
    
    return { props: {planPrices, planInformation,user ,token } }
  }

  const mapStateToProps = function (state) {

      return {
        userData: state.userData,
      };
    }

  const Plans = connect( mapStateToProps, {
    setUser,
  })(Presale);


  // export default  withAuth0(template(Plans));
  export default  withAuth0(Plans);