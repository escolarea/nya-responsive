import {Menu} from 'semantic-ui-react';
import Link from 'next/link';

const NavBar = ({sidebarVisible}) => {
  const toggleSideBar = () => {
    sidebarVisible = !sidebarVisible;
    alert(sidebarVisible);
  }

  return (
    <Menu fixed="top">
      <Menu.Item>
        <Link href="/menu">
          <img src="/static/images/global-menu/global-menu-icon-hl.png"/>
        </Link>
      </Menu.Item>
      <Menu.Item>
        Neil Young Archives
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;