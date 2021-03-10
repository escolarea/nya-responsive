import moment from 'moment'
import {ACTIVE, CANCELLED,PATRON , RUST, UNLIMITED } from '../utils/url_constants'


export function determineUserStatusFromSubscriptionResponse(json) {
    const {planId, active, status, type, current_period_end = false, stripe_status, isAppleSub = false} = json

    let user ={}
    user.hasPlanExpired = true; 
    user.userPlanId = planId 
    user.userPricingId = planId
    user.userSubType = type
    user.isAppleSub = isAppleSub 

    if(current_period_end){
        let now = moment()
        let expirationDate =  new Date(current_period_end * 1000)
        user.hasPlanExpired = now.isAfter(moment(+expirationDate))
    }

    if (user.hasPlanExpired && stripe_status !=='active' ) {

        user.userIsFree = true //free
        user.userHasSubscriptionInfo = false
        user.userSubscriptionStatus = null

        setuserData(user)
        return;
    }

    user.userHasSubscriptionInfo = true

    if (status === ACTIVE) {

        user.userSubscriptionStatus = 'active'
        user.isGift = json.gift || false
        user.customerCoupon = json.customerCoupon || ''
        user.userIsFree = false //paid
        user.relevantSubscriptionDate = json.dateSubscriptionWillRenew
    } else if (status === CANCELLED) {
        if (active) {
            user.userSubscriptionStatus = 'cancelled-active'
            user.userIsFree = false //paid
            user.relevantSubscriptionDate = json.dateSubscriptionWillEnd
        } else {
            user.userSubscriptionStatus = 'cancelled-inactive'
            user.userIsFree = true //free
            user.relevantSubscriptionDate = json.dateSubscriptionEnded
        }
    } else { //DECLINED
        if (active) {
            user.userSubscriptionStatus = 'declined-active'
            user.userIsFree = true //free
            user.relevantSubscriptionDate = json.current_period_end
        } else {
            user.userSubscriptionStatus = 'declined-inactive'
            user.userIsFree = true //free
            user.relevantSubscriptionDate = json.dateSubscriptionEnded
        }
    } 
    user.relevantSubscriptionDate =  moment(user.relevantSubscriptionDate * 1000).calendar()
    console.log('user', user)
    //TODO SET IT ON REDUX 
    // setuserData(user)
    return user
}