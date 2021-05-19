import {Menu} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {hideSideBar, showSideBar } from '../store/sidebar/action';
import { useRouter } from 'next/router';
// import Arrow from '../static/icons/arrow.svg'
// import regularIcon from '../static/images/global-menu/global-menu-icon-hl.png'

const NavBar = ({visibleSideBar, hideSideBar, showSideBar, path =''}) => {

  const router = useRouter();

  const toggleSideBar = () => {
    if (!visibleSideBar) showSideBar();
    else hideSideBar();
  }

  const styleType ={
    'contact':{'style':'light-back','backUrl':false, 'title':'Contact'},
    'edit':{'style':'light-back','backUrl':'/account/overview', 'title':'Edit'},
    'delete':{'style':'light-back','backUrl':'/account/overview', 'title':'Delete Account'},
    'account':{'style':'light-back','backUrl':false, 'title':'Account'},
    'overview':{'style':'light-back','backUrl':'/account', 'title':'Account Overview'},
    'plans':{'style':'light-back','backUrl':'/account', 'title':'Plans'},
    'presale':{'style':'light-back','backUrl':'/account', 'title':'Pre-Sale Tickets'},
    'notifications':{'style':'light-back','backUrl':'/account', 'title':'Notification Settings'},
    'subscription':{'style':'light-back','backUrl':'/account', 'title':'Subscription'},
    'subject':{'style':'light-back','backUrl':'/contact', 'title':'Subject'}
  }


  const styleInfo = styleType[path] || {}

  const {style = "regular", title=false, backUrl=false} = styleInfo;
  const icon = style === 'light-back' ? '../static/images/ppv/arrow-left.png' : '../static/images/global-menu/global-menu-icon-hl.png'
  
  return (
    <Menu fixed="top" className={style}>
      <Menu.Item className="sidebar-link" onClick={()=>{backUrl ? router.push(backUrl) : toggleSideBar()}} >
        <img src={icon} className="sidebar-link"/>
      </Menu.Item>
      <Menu.Item className="title">
        {title ? title : <div className="nya-log"/>}
      </Menu.Item>
    </Menu>
  );
}

const mapStateToProps = (state) => {
  return {
    visibleSideBar: state.sidebar.visible,
  }
}

export default connect(mapStateToProps, {
  hideSideBar,
  showSideBar
})(NavBar);