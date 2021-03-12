const NavBar = ({sidebarVisible}) => {
  const toggleSideBar = () => {
    sidebarVisible = !sidebarVisible;
    alert(sidebarVisible);
  }

  return (
    <div className="ui top fixed menu">
      <div className="item" onClick={e=>toggleSideBar()}>
        <img src="/static/images/global-menu/global-menu-icon-hl.png"/>
      </div>
      {/* <a className="item">Features</a>
      <a className="item">Testimonials</a>
      <a className="item">Sign-in</a> */}
      <a href="#" className="item">
        Neil Young Archives
      </a>
    </div>
  );
}

export default NavBar;