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
};

export default wrapper.withRedux(WrappedApp);
