import React, { Component } from "react";
import marked from "marked";
import parseMarkdown from '../../static/markdown';
import _ from "lodash";
// import NewsNavBar from "../news/news-navbar";
import { Menu, Grid } from "semantic-ui-react";
import { useRouter } from 'next/router';

// import VimeoPlayer        from '../components/vimeo-player'
function getArticleImages(data) {
  if (data.vimeoId) {
    return (
      <div className="video-container">
        {/* <VimeoPlayer videoId={parseInt(data.vimeoId, 10)} /> */}
      </div>
    );
  } else if (data.type === "two-image") {
    const url0 = `url(${data.images[0]})`;
    const url1 = `url(${data.images[1]})`;
    return (
      <div className="images two-image">
        <div className="image left" style={{ backgroundImage: url0 }} />
        <div className="image right" style={{ backgroundImage: url1 }} />
        <div className="credits">{data.credits}</div>
        <div className="clearfix" />
      </div>
    );
  } else if (data.type === "one-image") {
    const url = `${data.images[0]}?w=970`;
    return (
      <div className="images one-image">
        <img src={url} />
        <div className="clearfix" />
        <div className="credits">{data.credits}</div>
      </div>
    );
  } else {
    return null;
  }
}

const NewsArticle = props => {
  const router = useRouter();
  const render = () => {
    const { data, loaded } = props;
    if (_.isEmpty(data)) {
      // TODO: 404
      return null;
    }
    const {
      headline,
      author,
      dateText,
      bodyText,
      column,
      bodyHeadline,
      page,
    } = data;

    return (
      <React.Fragment>
        <div className="news-navbar-wrapper">
          <Menu className={`news-navbar header`}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column
                  width="3"
                  textAlign="center"
                  verticalAlign="middle"
                  onClick={()=>router.back()}
                >
                  {
                    <img
                      className="ui image center aligned menu-icon"
                      src="/static/icons/arrow.svg"
                    />
                  }
                </Grid.Column>
                <Grid.Column
                  verticalAlign="middle"
                  textAlign="center"
                  width="11"
                >
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
        </div>
        <div className="news-content" style={{paddingTop: "40px"}}>
          <div className="main-content article">
            <div className="article">
              {bodyHeadline ? (
                <div
                  className={"title " + column + ` news-${page.slice(-1)}`}
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(bodyHeadline || ""),
                  }}
                />
              ) : (
                <div className={"title " + column + ` news-${page.slice(-1)}`}>
                  <h1>{headline}</h1>
                </div>
              )}
              <div className="byline">
                <span className="author">{author}</span>
                <span className="date">{dateText}</span>
              </div>
              {getArticleImages(data)}
              <div
                className="article-text"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(bodyText || "") }}
              />
            </div>
            {/* <AdColumn /> */}
          </div>
        </div>
      </React.Fragment>
    );
  }

  return render();
}

export default NewsArticle;