import _ from "lodash";
import React, { Component, Suspense } from "react";
import Link from "next/link";
import cn from "classnames";
// import { isFreeUser } from "./user";
import UserInfo from '../components/globalMenu/userInfo'



const links = [
    {path: "/"                  , className:"home"              },
    {path: "/news/1"            , className:"news"              },
    // {path: "/movie-night/home"  , className:"movie-night-image" },
    {path: "/contact"           , className:"contact"           },
]

const ignore = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  return false;
};

export default class GlobalMenu extends Component {
  constructor(props) {
    super(props);

    // let hasSigned = localStorage.getItem(
    //   "nya-user-has-signed-up-for-newsletter"
    // );

    this.state = { ready: false,showingPulldown: false };

    this.onClose = this.onClose.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.onBGClick = this.onBGClick.bind(this);
    this.onNewsletterClick = this.onNewsletterClick.bind(this);
  }
  go(path) {
    let { router } = this.context;
    /* router.replace(router.createLocation(path)) */
    router.push(router.createLocation(path));
  }
  onNewsletterClick() {
    this.go("/newsletter");
  }
  onClose() {
    // let { router } = this.context;
    // router.goBack();
  }
  escFunction(event) {
    if (event.keyCode === 27) {
    //   let { router } = this.context;
    //   router.goBack();
    }
  }
  onBGClick(e) {
    if (
      !e.target.closest(".user-info") &&
      !e.target.closest(".sharing") &&
      !e.target.closest(".drawer-front-bottom-items") &&
      !e.target.closest(".link") &&
      !e.target.closest(".menu-link")
    ) {
    //   this.props.router.goBack();
    }
  }
  getLinks() {
    return links.map((link, ind) => {
      if (link.type === "delimiter") {
        return <div key={`delimiter-${ind}`} className="delimiter" />;
      }
      let path = _.isFunction(link.path) ? link.path() : link.path;

      let cx = cn("link", { [link.className]: true });
      let click = () => {
        this.go(path);
      };

      return (
        <div onClick={click} onTouchStart={click} key={path} className={cx} />
      );
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ ready: true });
    }, 50);
    // document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    // document.removeEventListener("keydown", this.escFunction, false);
  }
  renderMobileContent() {
    return (
      <div
        className="global-menu"
        onTouchStart={() => this.onBGClick}
        key="global-menu"
      >
        <div className="text-items">
          <span className="menu-items">
            <div className="menu-link" onTouchStart={() => this.go("/")}>
              home
            </div>
            <div
              className="menu-link"
              onTouchStart={() => window.downloadApp()}
            >
              File Cabinet
            </div>
            <div
              className="menu-link"
              onTouchStart={() => window.downloadApp()}
            >
              Timeline
            </div>
            <div
              className="menu-link"
              onTouchStart={() => window.downloadApp()}
            >
              Playlist
            </div>
          </span>
          <span>
            <div className="menu-link" onTouchStart={() => this.go("/news/1")}>
              NYA Times-contrarian
            </div>
            <div
              className="menu-link"
              onTouchStart={()=>this.context.router.createLocation('/movie-night')}
            >
              Hearse Theater
            </div>
          </span>
          <br />
          <div className="menu-link" onTouchStart={() => this.go("/contact")}>
            contact
          </div>
          <UserInfo />
        </div>
      </div>
    );
  }
  renderContent() {

    let c = String.fromCharCode(169); //copyright symbol
    let releaseVersion = process.env.RELEASE_VERSION;

    return (
      <div
        className="global-menu"
        onClick={() => this.onBGClick}
        key="global-menu"
      >
        {/* <div className="close" onClick={this.onClose}></div>
            <BackNextSwitch /> */}
        {/* <UserInfo showSubscribe={isFreeUser()} /> */}
        <div className="text-items">
          {this.getLinks()}
          <div className="sharing">
            <a href="http://neilyoung.warnerbrosrecords.com" target="_blank">
              <div className="warner-bros" />
            </a>
            <Link href="/contact">
              <div className="email" />
            </Link>
            <a
              href="https://www.facebook.com/NeilYoungArchives/"
              target="_blank"
            >
              <div className="facebook"></div>
            </a>
            <a href="https://twitter.com/NeilYoungNYA" target="_blank">
              <div className="twitter"></div>
            </a>
          </div>
        </div>
        <div className="drawer-front-bottom-items">
          <div className="items-right">
            <span className="c">{c}</span>2017 Shakey Pictures/
            <span className="c">{c}</span>2017 Warner Records
            <span className="pipe">|</span>
            <a
              target="_blank"
              onContextMenu={ignore}
              href="https://nya.orastream.com/"
            >
              powered by ORASTREAM
            </a>
            <span className="pipe">|</span>
            <a target="_blank" onContextMenu={ignore} href="/terms.html">
              TERMS AND CONDITIONS
            </a>
            <span className="pipe">|</span>
            <a target="_blank" onContextMenu={ignore} href="/privacy.html">
              PRIVACY POLICY
            </a>
            <span className="pipe">|</span>
            <a
              target="_blank"
              onContextMenu={ignore}
              href="/privacy.html#adchoices"
            >
              AD CHOICES
            </a>
            <span className="pipe">|</span>
            <Link href="/credits">CREDITS</Link>
            <span className="pipe">|</span>
            <Link href="/faq">FAQ</Link>
            <span className="pipe">|</span>
            <p>V. {releaseVersion}</p>
          </div>
        </div>
      </div>
    );
  }
  render() {
    let { ready } = this.state;
      return(
        <div id="global-menu-wrapper" onTouchStart={this.onBGClick}>
          {ready ? this.renderMobileContent() : <div key="dummy"></div>}
        </div>
      ) 
  }
}

//TODO : call user info and save it on redux 