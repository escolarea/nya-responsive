import { React} from "react";
import { connect } from "react-redux";
import { hidePopUp } from "../../store/notSupportedRoutes/action";
import { Grid } from "semantic-ui-react";
import Link from "next/link";


const ticketPopUp = ({ visible, hidePopUp }) => {
  return (
    <div
      className="pop__up"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <span className="close" onClick={() => hidePopUp()}>
        <img
          src="../static/images/video-modal/close.png"
          alt="clse"
          height="20px"
          width="20px"
        />
      </span>
      <div className="content">
        <h1 className="center aligned header">Pre-Sale tickets are exclusive to NYA yearly subscribers.</h1>
        <Grid columns="equal" stackable onClick={() => hidePopUp()}>
          <Grid.Row>
            <Grid.Column width="8" className="icon ticket">
              <Link
                href="/account/plans"
                className="sub-btn"
              >
                SUBSCRIBE
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
            <sup>*</sup>
            Monthly subscribers contact <sup></sup>
            <Link href="/contact">customer support</Link>
            <sup></sup>
            for help.
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    visible: state.notSupportedRoutes.visible,
  };
};

export default connect(mapStateToProps, {
  hidePopUp,
})(ticketPopUp);
