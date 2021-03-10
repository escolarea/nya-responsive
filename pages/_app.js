import "../styles/index.scss";
import { wrapper } from "../store/store";
import TopBar from "../components/globalMenu/global-top-bar";

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
      <TopBar/>
    </div>
  );
};

export default wrapper.withRedux(WrappedApp);
