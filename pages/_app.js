import "../semantic/dist/semantic.min.css";
import "../styles/index.scss";
import { wrapper } from "../store/store";
import TopBar from "../components/globalMenu/global-top-bar";
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
      <PopUp />
      <TopBar/>
    </div>
  );
  // return <Component {...pageProps} />
};

export default wrapper.withRedux(WrappedApp);
