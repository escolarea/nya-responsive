import React, { Component } from 'react';
import moment from 'moment'
import cns                  from 'classnames'
import {NYA_FREE, NYA_MONTHLY} from '../utils/url_constants'
import fetchData from '../api/fetch';


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
        console.log("this.props", this.props)
        const { ticket, onCopy, assignedCodes, userInfo = {}} = this.props
        const { loading } = this.state
        const {userData :{userPlanId,userIsFree } = {} } = userInfo
        console.log('userIsFree', userIsFree)
        
        const isUserSubscribed = !userIsFree;
        const currentUserPlan = (userPlanId !== ( NYA_FREE || NYA_MONTHLY))


        const date = moment.utc(ticket.date)
        const code = this.state.code  || false;
        const showCode = isUserSubscribed && currentUserPlan && code
        
        if (isUserSubscribed && currentUserPlan && !code) {
            assignedCodes && assignedCodes.map(code => {
                if (code.ticket === ticket.id) {
                    this.setState({code: code.code})
                }
            })
        }

        const onCodeButtonClick = () => {

            console.log('isUserSubscribed', isUserSubscribed)
            console.log("currentUserPlan", currentUserPlan)

            if (!isUserSubscribed || !currentUserPlan) {
                this.props.showPopUp('ticket-modal');
                return;
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
                    const {token} = this.props;
                    console.log('token', token)

                    if(token){
                        const headers = {"Authorization": 'Bearer ' + token,'Content-Type': 'text/plain'}
                        const request = {
                        method:'GET',
                        query:`api/tickets/${ticket.id}/code`,
                        headers
                        }

                        fetchData(request).then(data=>data.text()).then((result) => {
                            this.setState({code: result.code, loading: false})
                        })
                        .catch(err => {
                            console.error(err)
                            this.setState({loading: false})
                        })

                    }else{
                        this.setState({loading: false})
                    }

                    
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