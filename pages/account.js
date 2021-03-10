
import React, { useEffect,useState } from 'react'
import fetchData from '../api/fetch'
import {hasAuth, getAuth} from '../services/localstorage'
import Login from '../components/login'
import {determineUserStatusFromSubscriptionResponse} from '../helpers/parseUser'



const Account = ({}) => {
    const [type, setType] = useState('menu')
    useEffect(()=>{
        // redirect for not logged in
        if(!hasAuth()){
            Login()
        }
        // /api/subscriptions'
        // .set('Authorization', 'Bearer ' + getAuth())
        //HERE CALL THE INFO FOR USER INFO
        //i nedd to do this on each of the components especificly (invoice )
        const header = {'Authorization': 'Bearer ' + getAuth()}
        const test = async () => {
            const res =  await fetchData('GET','api/subscriptions', header )
            const data = await res.json() 
            //This brings the subscription info and the jwt for OS
            const userData= determineUserStatusFromSubscriptionResponse(data.subscription);
            console.log('userData', userData)
            //parse data and se it on redux 
         }
      
        test()
        // fetch subcription info and update on redux
    })
  return (
    <div id="drawer-front-container">
     
    </div>
  );
  
} 

export default Account
