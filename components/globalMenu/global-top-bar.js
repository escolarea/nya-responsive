import React, {Component} from 'react'
import GlobalMenuIcon from './globalMenuIcon'
import _ from 'lodash'

class TopBar extends Component {
    constructor(props, context){
        super(props, context)

        this.find     = this.find.bind(this)
        this.home     = this.home.bind(this)
        this.showInstruction = this.showInstruction.bind(this)
        this.contrarian = this.contrarian.bind(this)
        this.store = this.store.bind(this)
    }
    componentDidMount(){
        //this is for the style - check if necesary
        // getContrarianPageData().then(contrarianPaperData => {
        //     updateEntries(contrarianPaperData);
        //   })
    }
    componentWillReceiveProps(nextProps){
        // this.setState({location:nextProps.path, playingTrack:nextProps.playingTrack})
    }

    go(url){
        let {router} = this.context
        // router.push(router.createLocation(url))
    }
    home(){
        this.go('/')
    }
    find(){
        this.go('/search')
    }
    contrarian(){
        this.go('/news/1')
    }
    store(){
        const {storeLink} = this.props
        if(storeLink){
            window.open(storeLink, '_blank');
        }
    }
      showInstruction(){
          window.siteInstruction()
      }
    render(){
        return (
            <div className={`global-top-bar-wrapper light-mode`}>
              <div className="global-top-bar">
              </div>
              <GlobalMenuIcon />
            </div>
        )
    }
}
export default TopBar;