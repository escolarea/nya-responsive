import React from 'react'
import Link from "next/link";
import fetchData from '../../api/fetch'
import template from '../../static/template';
// import {hasAuth, getAuth} from '../services/localstorage'
import Ticket from '../../components/tikets'
import moment from 'moment'
const Presale = ({ticketsData, assignedCodes, ticketsRequestedForCodes}) => {

    const ticketsBefore = ticketsData.filter(item => moment.utc(item.date) < moment.utc().startOf('day')).sort((a, b) => new Date(b.date) - new Date(a.date))
    const ticketsAfter = ticketsData.filter(item => moment.utc(item.date) >= moment.utc().startOf('day')).sort((a, b) => new Date(b.date) - new Date(a.date))
    const tickets = ticketsAfter.concat(ticketsBefore)

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
     { tickets &&
                    tickets.map((ticket, ind) => (
                        <Ticket
                            assignedCodes={assignedCodes}
                            ticket={ticket}
                            key={`ticket-${ind}`}
                            onCopy={onCopy}
                            isUserSubscribed={false}
                            currentUserPlan={{}}
                            userInfo={{}}
                            entryID={""}
                            accountPage={""}
                        />
                    ))}
       </div>
    </div>
  );
  
} 

export async function getServerSideProps() {

    const header = {'Authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik4wSTBORU5GT0VWQ016UXhRa05ETmprNE0wWXdSVFpFTURKRE5UVkdNVE5DTmpRM1JVTXpSQSJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLW55YS53ZWFkZS5jby8iLCJzdWIiOiJhdXRoMHw2MDUzYzg2ZjZlYjE2MzAwNzBjMTA2ZWIiLCJhdWQiOiJCaGpVc0VGV0xyblFEMUFrT09VRjl6WTFVQXEwWEt2OCIsImlhdCI6MTYxNjE4OTQzNSwiZXhwIjoxNjIzOTY1NDM1LCJhdF9oYXNoIjoiWWtHWmExaGFWbVJGYzdvb29JUjBtUSIsIm5vbmNlIjoiQW9hUUlSRzluVjNQdzhYZEw5NFg5dVFyNVF5Ty10NG4ifQ.VeE4TOtOC9GP4ussDDg3qLoLyQzMfQRB1Lm9au_hqdZAdQEI4_gpEwBwnJyxaEbFCeCbKzNPw_8t0M0zDs73sZCiNuP-xoF5h9xCt9AZ0jZQLXA_cszL58Af6MWeh4OMhCu8bcTG-mi3hizvpjNynoZSfo-ORT9Qn4l2McDkBdLfyDPBb4Gi9KK9GUofVio0_vYY_XH8H8p5oiTADPp3gX6pm1j-kKy1SC0V-4MY34BFKxq5aRafy7WUiSXKzoWw_gJfQEac2fE2h68ZDtg4YBN6vns_58nsyyX20qQfz6ZhgEywc80_9uAlYnItkMpfyAcG8zENLlyPheEL9cGzyQ"}
    const res = await fetchData('GET','api/tickets', header)
    const data = await res.json() 
    const {tickets: ticketsData, assignedCodes,ticketsRequestedForCodes } = data
    console.log("ticketsData", ticketsData)
    return { props: { ticketsData, assignedCodes, ticketsRequestedForCodes} }
  }

  export default  template(Presale)

// add the props thing for the request