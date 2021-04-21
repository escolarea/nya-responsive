import React, {useEffect, useState}from 'react'
import Link from "next/link";
import fetchData from '../../api/fetch'
import moment from 'moment'
import {NYA_FREE,NYA_YEARLY, NYA_MONTHLY,NYA_UNLIMITED } from '../../utils/url_constants'
import PlansPanel from '../../components/user/plans'
import {getPlanInfo} from '../../helpers/plans'


const Presale = ({planPrices, planInformation}) => {

    const [plansList, setplansList] = useState({})
    const [userPlan, setpurchasedPlan ] = useState({})
    
    useEffect(()=>{
        //parse plans on componentDidMout 
        parsePlans()
    },[])
   
 
    const parsePlans = () => {
        let plansAvailable = {};
        let plans = planPrices
        let purchasedPlan ={
            price:'0.00',
            name: NYA_FREE
        }
        //get this info from the store
                // const {userPlanId,relevantSubscriptionDate} = this.props.userData


        const userPlanId = "NYA-FREE"
        const relevantSubscriptionDate = {}

        // let sortedPlans = sortPlansAccordingPrice(plans);

        for (let i = 0; i < plans.length; i++) {
          let plan = plans[i];
          console.log('### plan', plan)

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

  return (
    <PlansPanel
        plansAvailable={plansList}
        planInformation={planInformation}
        purchasedPlan={userPlan}
  />
  );
  
} 

export async function getServerSideProps() {
    const res = await fetchData('GET','api/subscriptions/plan-prices')
    const data = await res.json() 
    const {planPrices, planInformation } = data
    return { props: {planPrices, planInformation } }
  }

export default Presale

// add the props thing for the request