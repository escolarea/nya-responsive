import React, { Fragment, useState, useEffect } from "react";
import cn from "classnames";
import { parseOnlyNumbers } from "../../helpers/numbers";
import { Menu, Grid } from "semantic-ui-react";
import moment from "moment";
import { connect, useSelector, useDispatch } from "react-redux";
import { hideSideBar, showSideBar } from "../../store/sidebar/action";
import { updateNavbarScrollPosition } from "../../store/newsNavbar/action";
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

const NewsNavbar = (props) => {
  const visibleSideBar = useSelector(state => state.sidebar.visible);
  const scrollPosition = useSelector(state => state.newsNavbar.scrollPosition);
  const dispatch = useDispatch();

  useEffect(() => {
    const navMenu = document.querySelector("#nav-menu");
    if (props.page === "1") {
      navMenu.scrollTo(0, 0);
      dispatch(updateNavbarScrollPosition(0));
    } else {
      navMenu.scrollTo(scrollPosition, 0);
    }
  }, []);

  const toggleSideBar = () => {
    if (!visibleSideBar) dispatch(showSideBar());
    else dispatch(hideSideBar());
  }

  const renderNavBar = () => {
    const {
      page,
      pagesData,
      themeAperance,
      maxPage,
      fixed,
      params,
      backgroundStyle,
      headerImage
    } = props;
    const showLinks = props.showLinks || true;
    // const linksWithoutDivider = [pagesData.length - 1, 0, 1];
    let items = [];

    const MovietoneLink = (
      <Fragment key="movietone">
        <Menu.Item>
          <div className="link" onClick={(e) => props.showPopUp('download')}>
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
              <Menu.Item
                className = {p.title === `page-${page}` ? 'active' : ''}
              >
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
      <Menu fixed="top">
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
                onClick={toggleSideBar}
                className="sidebar-link"
              >
                {
                  <img
                    className="ui image center aligned menu-icon sidebar-link"
                    src={"../static/images/global-menu/global-menu-icon-hl.png"}
                  />
                }
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center" width="11">
                <img
                  className="ui image center aligned"
                  src={headerImage ? headerImage : "../static/images/news/newspaper-header.png"}
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
          id="nav-menu"
          onScroll={e=>dispatch(updateNavbarScrollPosition(e.target.scrollLeft))}
          className={`news-navbar navigation ${themeAperance} ${
            fixed ? "fixed" : ""
          }`}
        >
          {items}
        </Menu>
      </div>
      </Menu>
    );
  }
  
  return renderNavBar();
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
