import React, { useEffect, useState } from 'react'
import Link from "next/link";
import fetchData from '../../api/fetch'
import Ticket from '../../components/tikets'
import moment from 'moment'
import _ from "lodash";
import { connect } from "react-redux"
import { showPopUp } from "../../store/notSupportedRoutes/action";
import { useRouter } from 'next/router';
import template from '../../static/template';

const Presale = ({token, userData, showPopUp}) => {
  const [ticketsData, SetTicketsData] = useState([])
  const [assignedCodes, setAssignedCodes] = useState([])
  const [ticketsRequestedForCodes, setTicketsRequestedForCodes]  = useState([])
  const [loaded, SetLoaded] = useState(false)

  const router = useRouter();
  useEffect( async () =>{
    const {userData:user} = userData;
    if (Object.keys(user).length === 0 ) {
      router.push('/account')
    }

    if (token) {
      const headers = { Authorization: "Bearer " + token };
      const request = {
        method: "GET",
        query: "api/tickets",
        headers,
      };
      const res = await fetchData(request);
      const data = await res.json();
      const {
        tickets,
        assignedCodes,
        ticketsRequestedForCodes,
      } = data;

      parseTickets(tickets)
      setAssignedCodes(assignedCodes)
      setTicketsRequestedForCodes(ticketsRequestedForCodes)
      SetLoaded(true)

    }

  },[])


    const parseTickets  = (tickets = {}) =>{

      const sortDate = (item) => item.sort((a, b) => new Date(b.date) - new Date(a.date));

      let ticketsBefore = tickets.filter(item => item && (moment.utc(item.date) < moment.utc().startOf('day')))
      if(!_.isEmpty(ticketsBefore))ticketsBefore = sortDate(ticketsBefore);
      
      let ticketsAfter = tickets.filter(item => item && (moment.utc(item.date) >= moment.utc().startOf('day')))
      if(!_.isEmpty(ticketsAfter))ticketsAfter = sortDate(ticketsBefore);

      const parsedTickets = ticketsAfter.concat(ticketsBefore);

      SetTicketsData(parsedTickets)

    }

     const onCopy = (code) => {
            const targetId = "_hiddenCopyText_"
            let target = document.createElement("textarea")
            target.style.position = "absolute"
            target.style.left = "-9999px"
            target.style.top = "0"
            target.id = targetId
            document.body.appendChild(target)
            target.textContent = code

            const currentFocus = document.activeElement
            target.focus()
            target.setSelectionRange(0, target.value.length)

            // copy the selection
            let succeed
            try {
                  succeed = document.execCommand("copy")
            } catch (e) {
                succeed = false
            }
            // restore original focus
            if (currentFocus && typeof currentFocus.focus === "function") {
                currentFocus.focus()
            }

            target.textContent = ""

            return succeed
        }
  return (
    <div id="account-menu-container">
     <div className="one column row links subscription-overview">
        <div className="left aligned column presale">
            <p>NYA Subscribers get the the best seats first. Click “Get Code” to reveal your unique pre-sale code. Enjoy the show(s)</p>
            <p>If you are not a subscriber, <Link href="/account/plans">CLICK HERE</Link> to become one. For code issues <a href="/contact">contact</a> NYA. For purchase issues please contact the ticket vendor.</p>
        </div>
     </div>
     <div className="tickets-panel">
     { ticketsData &&
                    (ticketsData || []).map((ticket, ind) => (
                        <Ticket
                            ticket={ticket}
                            key={`ticket-${ind}`}
                            onCopy={onCopy}
                            userInfo={userData}
                            token={token}
                            showPopUp={showPopUp}
                            assignedCodes={assignedCodes}


                        />
                    ))}
       </div>
    </div>
  );
  
} 

  const mapStateToProps = function (state) {
    return {
      userData: state.userData,
    };
  }

  const Tickets = connect( mapStateToProps, {showPopUp})(Presale);
  export default   template( Tickets);