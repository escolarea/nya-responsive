import { Sidebar, Grid, Divider, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import Link from "next/link";

const SideBarMenu = ({ visibleSideBar }) => {
  return (
    <Sidebar
      className="global-menu"
      animation="push"
      direction="left"
      visible={visibleSideBar}
      width="normal"
    >
      <Grid textAlign="center" className="global-menu-grid">
      <Grid.Row columns={1} className="links">
          <Grid.Column textAlign="left">
            <Link href="/">HOME</Link>
          </Grid.Column>
          <Grid.Column textAlign="left">FILE CABINET</Grid.Column>
          <Grid.Column textAlign="left">TIMELINE</Grid.Column>
          <Grid.Column textAlign="left">PLAYLIST</Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns={1} className="links">
          <Grid.Column textAlign="left">
            <Link href="/">NYA TIMES-CONTRARIAN</Link>
          </Grid.Column>
          <Grid.Column textAlign="left">MOVIE NIGHT</Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row columns={1} className="links">
          <Grid.Column textAlign="left">
            <Link href="/">ABOUT</Link>
          </Grid.Column>
          <Grid.Column textAlign="left">CONTACT</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} className="buttons">
          <Grid.Column>
            <Button primary fluid>
              SUBSCRIBE
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button fluid className="account-button">
              ACCOUNT
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} className="buttons">
          <Grid.Column>
            <a class="orastream" target="_blank" rel="nofollow" href="https://www.orastream.com/">
              <img className="ui image" src="/static/images/orastream.png" alt="Powered by ORASTREAM"/>
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  return {
    visibleSideBar: state.sidebar.visible,
  };
};

export default connect(mapStateToProps, {})(SideBarMenu);
