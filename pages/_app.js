import "semantic-ui-css/semantic.min.css";
import "../styles/index.scss";
import { wrapper } from "../store/store";
import NavBar from "../components/navbar";
import PopUp from "../components/pop-up-box";
import { Sidebar} from "semantic-ui-react";
import { React, Fragment } from "react";
import SideBarMenu from '../components/sidebar'

const WrappedApp = ({ Component, pageProps }) => {
  //TODO : add a temporary loaded on route change
  return (
    <Fragment>
      <Sidebar.Pushable>
        <SideBarMenu/>
        <Sidebar.Pusher>
          <div id="main-wrapper">
            <NavBar/>
            <div id="content">
              <div
                className="content-wrapper"
                style={{ width: "100%", height: "100%" }}
              >
                <Component {...pageProps} />
              </div>
            </div>
            {/* <TopBar/> */}
            <PopUp />
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Fragment>
  );
  // return <Component {...pageProps} />
};

export default wrapper.withRedux(WrappedApp);
