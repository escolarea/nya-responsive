import 'semantic-ui-css/semantic.min.css'
import "../styles/index.scss";
import { wrapper } from "../store/store";
import NavBar from "../components/navbar";
import PopUp from '../components/pop-up-box';

const WrappedApp = ({ Component, pageProps }) => {
  //TODO : add a temporary loaded on route change 
  return (
    <div id="main-wrapper">
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
  );
  // return <Component {...pageProps} />
};

export default wrapper.withRedux(WrappedApp);
