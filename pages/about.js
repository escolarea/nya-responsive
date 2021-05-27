import React, { useEffect,useState } from 'react'
import Link from "next/link";
import LoadingIndicator from '../components/loading'


const About = ({}) => {
    const [ pageStatus, setPageStatus ] = useState('loading');
 
   useEffect(()=>{
     setPageStatus('ready');
   },[])

  if(pageStatus === 'loading'){
    return(
    <div className="loading">
      <center>
        <LoadingIndicator/>
      </center>
    </div>)
  }
  return (
    <div id="account-menu-container" className="global-menu">
      <div className="ui center aligned grid global-menu-grid">
          <div className="one column row links">
           <div className="left aligned column"><Link href="/terms" >Terms &amp; Conditions</Link> </div>
            <div className="left aligned column"><Link href="/privacy" className="left aligned column"> Privacy Policy </Link></div>
            <div className="left aligned column"><Link href="/credits" className="left aligned column"> Credits </Link></div>
          </div>
          
        </div>
    </div>
  );
  
} 

export default About;
