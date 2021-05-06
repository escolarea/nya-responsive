import React, {Component}            from 'react';
import {hasAuth}        from '../../services/localstorage';
// import Login                         from '../login';

export default class UserInfo extends Component {
    constructor(props, context){
        super(props, context)

        this.state = {showingPulldown: false}

        this.onSubscribeClick = this.onSubscribeClick.bind(this)
        this.onArrowClick     = this.onArrowClick.bind(this)
    }
    onArrowClick(){
        this.setState({showingPulldown: !this.state.showingPulldown})
    }
    onSubscribeClick(){
        /* window.displayWarningMessage('subscription')*/
        const {router} = this.context
        // router.push(router.createLocation('/account?screen=plans'))
    }
    render(){
        let {onMouseEnter, showSubscribe} = this.props

            return (null
                // <div className="user-info">
                //     {!hasAuth()&& <div className="subscribe login" onMouseEnter={onMouseEnter} onTouchStart={Login} />}
                //     <div className="subscribe" onMouseEnter={onMouseEnter} onTouchStart={this.onSubscribeClick} />
                // </div>
            )
       
    }
}
