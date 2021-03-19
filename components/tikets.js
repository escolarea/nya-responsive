import React, { Component } from 'react';
import moment from 'moment'
import cns                  from 'classnames'

class Ticket extends Component {
    constructor (props) {
        super(props)

        this.state = {
            code: null,
            loading: false
        }
    }

    componentDidMount() {
        const { entryID, accountPage } = this.props
        if (entryID === this.props.ticket.id) {
            accountPage.scrollTop = this.wrapper.offsetTop
        }
    }

    render () {
        const { ticket, onCopy, assignedCodes, isUserSubscribed, currentUserPlan ="", userInfo } = this.props
        const { loading } = this.state

        const date = moment.utc(ticket.date)
        const code = "";
        // this.state.code || getTicketCode(`${userInfo.user_id}-${ticket.id}`)
        const showCode = false
        // isUserSubscribed && currentUserPlan === 'NYA-UNLIMITED-YEARLY' && code

        if (isUserSubscribed && currentUserPlan === 'NYA-UNLIMITED-YEARLY' && !code) {
            assignedCodes && assignedCodes.map(code => {
                if (code.ticket === ticket.id) {
                    setTicketCode(`${userInfo.user_id}-${ticket.id}`, code.code)
                    this.setState({code: code.code})
                }
            })
        }

        const onCodeButtonClick = () => {
            if (!isUserSubscribed || currentUserPlan !== 'NYA-UNLIMITED-YEARLY') {
                window.subsTicketMonthly()
                return
            }
            if (code) {
                onCopy(code)
            } else {
                // window.ticketsUnavailable() // REMOVE THIS LATER ONCE CONTETNFUL IS WORKING
                // return
                const {staticCode, flexibleCodeSource} = ticket
                if (staticCode) {
                    this.setState({code: staticCode, loading: false})
                } else {
                    this.setState({loading: true})
                    fetchTicketCode(ticket.id)
                        .then((result) => {
                            this.setState({code: result.body.code, loading: false})
                        })
                        .catch(err => {
                            console.error(err)
                            this.setState({loading: false})
                        })
                }
            }
        }

        if (ticket.style === '1') {
            return (
                    <div ref={el => this.wrapper = el} className={cns('ticket ticket--nya', {'ticket--soldOut': ticket.soldOut})}>
                        <div className='month'>{date.format('MMM')}</div>
                        <div className='number'>{date.format('DD')}</div>
                        <div className='year'>{date.format('YYYY')}</div>
                        <div className='ticket-title'>{ticket.title}</div>
                        <div className='ticket-descrOne'>{ticket.description}</div>
                        <div className='ticket-descrTwo'>
                            <label>{ticket.venue}</label>
                            <label>{ticket.location}</label>
                        </div>
                        { showCode &&
                            <div className='ticket-codeSection'>
                                <label>CODE: <label className='code'>{code}</label></label>
                                <label>{ticket.codeLabel}</label>
                            </div>
                        }
                        {ticket.buyLinkEnabled && ticket.buyLinkUrl && <div
                            className={cns('button ticket-button', {'disabled': ticket.soldOut})}
                            onClick={() => { if (!ticket.soldOut) window.open(ticket.buyLinkUrl) }}
                        >BUY TICKETS</div>}
                        { (ticket.flexibleCodeSource || ticket.staticCode) &&
                            <div
                                className={cns('button code-button', {'white': showCode}, {'disabled': ticket.soldOut || loading})}
                                onClick={!loading && !ticket.soldOut && onCodeButtonClick}
                            >{showCode ? 'COPY CODE' : loading ? '' : 'GET CODE'}</div>
                        }
                        {loading && <div className="loading-indicator-wrapper"><div className="loading-indicator" /></div> }
                    </div>
                )
        } else {
            return (
                    <div ref={el => this.wrapper = el} className={cns('ticket ticket--public', {'ticket--soldOut': ticket.soldOut})}>
                        <div className='month'>{date.format('MMM')}</div>
                        <div className='number'>{date.format('DD')}</div>
                        <div className='year'>{date.format('YYYY')}</div>
                        <div className='ticket-title'>{ticket.title}</div>
                        <div className='ticket-descrOne'>{ticket.description}</div>
                        <div className='ticket-descrTwo'>
                            <label>{ticket.venue}</label>
                            <label>{ticket.location}</label>
                        </div>
                        { ticket.buyLinkEnabled && ticket.buyLinkUrl &&
                            <div className={cns('button ticket-button', {'disabled': ticket.soldOut})} onClick={() => { if (!ticket.soldOut) window.open(ticket.buyLinkUrl) }}>BUY TICKETS</div>
                        }
                    </div>
                )
        }
    }

}

export default Ticket;