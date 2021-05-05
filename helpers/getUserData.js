import fetchData from '../api/fetch';
import {determineUserStatusFromSubscriptionResponse} from './parseUser'

export  async function  updateUserInfo(token,setUser){
        const headers = {'Authorization': 'Bearer ' + token}
        const res =  await fetchData({method:'GET',query:'api/subscriptions', headers })
        const data = await res.json() 
        //This brings the subscription info and the jwt for OS
        const userData= determineUserStatusFromSubscriptionResponse(data.subscription);
        setUser(userData);
}