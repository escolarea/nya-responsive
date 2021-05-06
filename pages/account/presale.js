import React from 'react'
import Link from "next/link";
import fetchData from '../../api/fetch'
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

export async function getInitialProps() {
  const { req } = props;
  let token = req.headers && req.headers.cookie ? await getjwtToken(req) : null;
  if(token === undefined) token = null
    const headers = {'Authorization': 'Bearer ' + token}
    const request = {
        method:'GET',
        query:'api/tickets',
        headers

      }
    const res = await fetchData(request)
    const data = await res.json() 
    const {tickets: ticketsData = [], assignedCodes,ticketsRequestedForCodes } = data
    
    return { props: { ticketsData, assignedCodes, ticketsRequestedForCodes} }
  }

  export default  Presale;