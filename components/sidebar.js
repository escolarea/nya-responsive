import { Sidebar, Grid, Divider, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {useEffect} from 'react';
import Link from "next/link";
import { showPopUp } from '../store/notSupportedRoutes/action';
import { hideSideBar } from '../store/sidebar/action';
import {getTokenForServer} from '../static/auth'


const SideBarMenu = ({ 
  visibleSideBar,
  showPopUp,
  hideSideBar,
  user
}) => {
  const handleNotSupportedRoutes = () => showPopUp();

  useEffect(() => {
    const clickOnLink = (e) => {
      if (e.target.classList.contains("link"))
        hideSideBar();
    };
    const menu = document.querySelector(".global-menu-grid");
    menu.addEventListener("click", clickOnLink);
    return () => {
      menu.removeEventListener("click", clickOnLink);
    }
  }, []) ;

  return (
    <Sidebar
      className="global-menu"
      animation="push"
      direction="left"
      visible={visibleSideBar}
    >
      <Grid textAlign="center" className="global-menu-grid">
      <Grid.Row columns={1} className="links">
          <Grid.Column textAlign="left">
            <Link href="/">
              <a className="link">HOME</a>
            </Link>
          </Grid.Column>
          <Grid.Column className="link" onClick={handleNotSupportedRoutes} textAlign="left">
            FILE CABINET
          </Grid.Column>
          <Grid.Column className="link" onClick={handleNotSupportedRoutes} textAlign="left">
            TIMELINE
          </Grid.Column>
          <Grid.Column className="link" onClick={handleNotSupportedRoutes} textAlign="left">
            PLAYLIST
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns={1} className="links">
          <Grid.Column textAlign="left">
            <Link href="/news/1">
              <a className="link">NYA TIMES-CONTRARIAN</a>
            </Link>
          </Grid.Column>
          <Grid.Column className="link" onClick={handleNotSupportedRoutes} textAlign="left">
            MOVIE NIGHT
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns={1} className="links">
          <Grid.Column textAlign="left">
            <Link className="link" href="/about">
            <a className="link">ABOUT</a>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign="left">
          <Link className="link" href="/contact">
            <a className="link">CONTACT</a>
          </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} className="buttons">
          <Grid.Column>
            <Button primary fluid >
            <Link href="/account/plans">
              <a className="link">SUBSCRIBE</a>
            </Link>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button primary fluid >
            <Link href="/account">
              <a className="link">ACCOUNT</a>
            </Link>
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} className="buttons">
          <Grid.Column>
            <a className="orastream" target="_blank" rel="nofollow" href="https://www.orastream.com/">
              <img className="ui image" src="/static/images/orastream.png" alt="Powered by ORASTREAM"/>
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>
  );
};

export async function getServerSideProps(props) {
  const {req} = props
  let user  =  req.headers && req.headers.cookie ?  await getTokenForServer(req) : null
  if(!user){

      user = null
  }  
  return { props: {user} }
}

const mapStateToProps = (state) => {
  return {
    visibleSideBar: state.sidebar.visible,
  };
};



export default  connect(mapStateToProps, {
  showPopUp,
  hideSideBar
})(SideBarMenu);