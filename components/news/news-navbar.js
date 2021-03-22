import React, { Component, Fragment } from "react";
import cn from "classnames";
import { parseOnlyNumbers } from "../../helpers/numbers";
import { Menu, Segment, Grid } from "semantic-ui-react";
import moment from "moment";
import { connect } from "react-redux";
import { hideSideBar, showSideBar } from "../../store/sidebar/action";
import { showPopUp } from "../../store/notSupportedRoutes/action";
import Link from "next/link";

const NewsLink = (props) => {
  let selected = false;
  let maxPage = props.maxPage + 1;
  selected = props.page === props.current;

  // This little hack is to keep top 40 and top 10 out of the newspaper's navigation system
  //TO DO : pass down path from query document.location.href
  const location = props.params;
  if (props.page === 1) selected = location.includes("1") && selected;
  if (props.page === maxPage) selected = location.includes("top-40-tracks");
  if (props.page === maxPage) selected = location.includes("top-10-albums");
  //------------------------

  const cx = cn("link", { selected: selected });
  return (
    <Link href={`/news/${props.page}/`}>
      <div className={cx}>{props.children}</div>
    </Link>
  );
};

class NewsNavbar extends Component {
  constructor(props) {
    super(props);
    // this.onClick = this.onClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  //   onClick(page) {
  //     const { navBarRoutes } = this.props;
  //     const route = navBarRoutes[page];
  //     //TODO: use next/router for prerender routes
  //     // router.push(router.createLocation(route))
  //   }

  toggleMenu() {
    if (!this.props.visibleSideBar) this.props.showSideBar();
    else this.props.hideSideBar();
  }

  renderNavBar() {
    const {
      page,
      pagesData,
      themeAperance,
      maxPage,
      fixed,
      params,
    } = this.props;
    const showLinks = this.props.showLinks || true;
    // const linksWithoutDivider = [pagesData.length - 1, 0, 1];
    let items = [];

    const MovietoneLink = (
      <Fragment key="movietone">
        <Menu.Item>
          <div className="link" onClick={(e) => this.props.showPopUp()}>
            <p className="highlighted">Movietone</p>
          </div>
        </Menu.Item>
      </Fragment>
    );

    if (pagesData) {
      items = pagesData.map((p, idx) => {
        if (p.title) {
          let titlePage = p.title.includes("page")
            ? parseOnlyNumbers(p.title)
            : p.title;
          if (p.linkString === "PPV") {
            titlePage = "ppv";
          }

          return (
            <Fragment key={p.title}>
              <Menu.Item>
                <NewsLink
                  page={titlePage}
                  current={page}
                  maxPage={maxPage}
                  params={params}
                >
                  {p.columnsTitles &&
                    p.columnsTitles.map((c) => (
                      <p
                        className={c.highlighted ? "highlighted" : ""}
                        key={c.title}
                      >
                        {c.title}
                      </p>
                    ))}
                </NewsLink>
              </Menu.Item>
            </Fragment>
          );
        }
      });
      items.splice(2, 0, MovietoneLink);
    }

    // return <div className={`news-navbar ${themeAperance} ${fixed ? "fixed": ""}`}> {items} </div>;
    return (
      <div className="news-navbar-wrapper">
        <Menu
          className={`news-navbar header ${themeAperance} ${
            fixed ? "fixed" : ""
          }`}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column
                width="3"
                textAlign="center"
                verticalAlign='middle'
                onClick={this.toggleMenu}
              >
                {
                  <img
                    className="ui image center aligned menu-icon"
                    src="/static/images/global-menu/global-menu-icon-hl.png"
                  />
                }
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center" width="11">
                <img
                  className="ui image center aligned"
                  src="/static/images/news/newspaper-header.png"
                  alt=""
                />
              </Grid.Column>
              <Grid.Column width="3"></Grid.Column>
            </Grid.Row>
          </Grid>
        </Menu>
        <Menu
          className={`news-navbar date ${themeAperance} ${
            fixed ? "fixed" : ""
          }`}
        >
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column verticalAlign="middle" width="4" textAlign="center">
                No. 025
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center" width="7">
                {moment().format("dddd, MMMM DD, YYYY")}
              </Grid.Column>
              <Grid.Column verticalAlign="middle" width="5" textAlign="center">
                First Edition
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Menu>
        <Menu
          className={`news-navbar navigation ${themeAperance} ${
            fixed ? "fixed" : ""
          }`}
        >
          {items}
        </Menu>
      </div>
    );
  }

  render() {
    return this.renderNavBar();
  }
}

const mapStateToProps = (state) => {
  return {
    visibleSideBar: state.sidebar.visible,
  };
};

export default connect(mapStateToProps, {
  hideSideBar,
  showSideBar,
  showPopUp,
})(NewsNavbar);
