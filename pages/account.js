import React, { useEffect,useState } from 'react'
import Link from "next/link";
import fetchData from '../api/fetch'
import {hasAuth, getAuth} from '../services/localstorage'
// import Login from '../components/login'
import {determineUserStatusFromSubscriptionResponse} from '../helpers/parseUser'
import {setUser} from '../store/userData/action'



const Account = ({}) => {
    const retrieveUserData = async () => {
      const header = {'Authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSTBORU5GT0VWQ016UXhRa05ETmprNE0wWXdSVFpFTURKRE5UVkdNVE5DTmpRM1JVTXpSQSJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLW55YS53ZWFkZS5jby8iLCJzdWIiOiJhdXRoMHw2MDUzYzg2ZjZlYjE2MzAwNzBjMTA2ZWIiLCJhdWQiOiJCaGpVc0VGV0xyblFEMUFrT09VRjl6WTFVQXEwWEt2OCIsImlhdCI6MTYxNjE4OTQzNSwiZXhwIjoxNjIzOTY1NDM1LCJhdF9oYXNoIjoiWWtHWmExaGFWbVJGYzdvb29JUjBtUSIsIm5vbmNlIjoiQW9hUUlSRzluVjNQdzhYZEw5NFg5dVFyNVF5Ty10NG4ifQ.VeE4TOtOC9GP4ussDDg3qLoLyQzMfQRB1Lm9au_hqdZAdQEI4_gpEwBwnJyxaEbFCeCbKzNPw_8t0M0zDs73sZCiNuP-xoF5h9xCt9AZ0jZQLXA_cszL58Af6MWeh4OMhCu8bcTG-mi3hizvpjNynoZSfo-ORT9Qn4l2McDkBdLfyDPBb4Gi9KK9GUofVio0_vYY_XH8H8p5oiTADPp3gX6pm1j-kKy1SC0V-4MY34BFKxq5aRafy7WUiSXKzoWw_gJfQEac2fE2h68ZDtg4YBN6vns_58nsyyX20qQfz6ZhgEywc80_9uAlYnItkMpfyAcG8zENLlyPheEL9cGzyQ"}
      const res =  await fetchData('GET','api/subscriptions', header )
      const data = await res.json() 
      //This brings the subscription info and the jwt for OS
      console.log('data.subscription', data.subscription)
      const userData= determineUserStatusFromSubscriptionResponse(data.subscription);
      setUser(userData)
      // setUserData(userData)
   }

    useEffect(()=>{
        // redirect for not logged in
        // if(!hasAuth()){
        //     Login()
        // }else{
        //   retrieveUserData();
        // }
    })
  
  return (
    <div id="account-menu-container" className="global-menu">
      <div className="ui center aligned grid global-menu-grid">
          <div className="one column row links">
            {/* TODO : make this single clickable div */}
           <div className="left aligned column"><Link href="/account/overview" >Overview</Link> </div>
            <div className="left aligned column"><Link href="/account/subscription" className="left aligned column"> Subscription </Link></div>
            <div className="left aligned column"><Link href="/account/plans" className="left aligned column"> Plans </Link></div>
            <div className="left aligned column"><Link href="/account/tickets" className="left aligned column"> Presale Tickets </Link></div>
            <div className="left aligned column"><Link href="/account/notifications" className="left aligned column"> Notification Settings </Link></div>
          </div>
          
        </div>
    </div>
  );
  
} 

export default Account

export async function getServerSideProps(context) {
    console.log('context.query', context.query)
    const {  account }   =  context.query;
    console.log('page',account)
    return { props: {} }
}