import "../semantic/dist/semantic.min.css";
import "../styles/index.scss";
import { wrapper } from "../store/store";

const WrappedApp = ({ Component, pageProps }) => {
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
    </div>
  );
  // return <Component {...pageProps} />
};

export default wrapper.withRedux(WrappedApp);
