import {Menu} from 'semantic-ui-react';
import Link from 'next/link';
import { connect } from 'react-redux';
import {hideSideBar, showSideBar } from '../store/sidebar/action'

const NavBar = ({visibleSideBar, hideSideBar, showSideBar}) => {
  const toggleSideBar = () => {
    if (!visibleSideBar) showSideBar();
    else hideSideBar();
  }

  return (
    <Menu fixed="top">
      <Menu.Item onClick={toggleSideBar}>
        <img src="/static/images/global-menu/global-menu-icon-hl.png"/>
      </Menu.Item>
      <Menu.Item>
        Neil Young Archives
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