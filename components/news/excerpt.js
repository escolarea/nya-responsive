import React, {Component}            from 'react'
// import {Link}                        from "next/a"
import cn                            from 'classnames'
import marked                        from 'marked'
// import VimeoPlayer                   from '../components/vimeo-player'
// import VimeoHelper                   from '../util/vimeo-helper'

const imgSizes = {
    left: '475',
    center: '475',
    right: '475'
}

function externalizeHrefs(el) {
    let links = el.querySelectorAll('a')
    for (let i = 0; i < links.length; i++) {
        let a = links[i]
        if (location.hostname === a.hostname || !a.hostname.length) continue;
        a.setAttribute('target', '_blank')
    }
}

function getExcerptImages(data, page) {
    console.log('@@@@ page', page)
    const {id, column, vimeoId} = data
    const link = `/news/${page}/${encodeURIComponent(id)}`
    if (vimeoId) {
        return <div className="video-container">
                {/* <VimeoPlayer videoId={parseInt(vimeoId, 10)} /> */}
            </div>
    } else if (data.type === 'two-image') {
        const url0 = `url(${data.images[0]})`
        const url1 = `url(${data.images[1]})`
        return (
            <div className="images two-image">
              <a href={link}><div className="image left"  style={{backgroundImage:url0}} /></a>
              <a href={link}><div className="image right" style={{backgroundImage:url1}} /></a>
              <div className="clearfix" />
            </div>
        )
    } else if (data.image1) {
        const imageWidth = imgSizes[column];
        const url = `${data.image1}`
        return (
            <div className="images one-image">
              <a href={link}><img src={url} /></a>
              <div className="clearfix" />
              <div className="credits">{data.credits}</div>
            </div>
        )
    } else {
        return null
    }
}

class Excerpt extends Component {
    constructor(props) {
        super(props);
        this.vimeoVideos = null;
    }
    componentDidMount(){
        externalizeHrefs(this.refs.content)
        // this.bindVideoEvents();
    }
    bindVideoEvents() {
        const container = this.refs.content;
        const iframes = container.querySelectorAll("iframe");
        this.vimeoVideos = new VimeoHelper(iframes);
    }
    componentWillUnmount() {
        this.vimeoVideos && this.vimeoVideos.destroy();
    }
    render(){
        const { headline, type, id, dateText, column, headlineText, bodyText, subtitle, callout, showBodyText, titlesFullWidth, titleDivider, topTitleDivider, subtitleDivider, calloutDivider, byline ,articleLayout} = this.props.data
        const { idx, page, layout, pageStyle} = this.props;

        const linkToArticle = `/news/${page}/${encodeURIComponent(id)}`

        // Default page rules
        let featuredPost = (column === 'center') && idx === 0;
        const firstPost = idx === 0;
        const centerColumn = column === 'center';
        let showContent = firstPost || showBodyText;
        let showTopDivider = false;
        let imageAtTop = false;
        let includeDate = true;
        let includeByline = false;

        // Page 2 rules
        if ( pageStyle === 'viewpoint') {
            showTopDivider = column === 'left' && !firstPost
            showContent = showContent || column === 'left'
            featuredPost = column === 'center' && !titlesFullWidth  // This is because page2/center is featured layout when titles full width is not selected.
        }

        // Page 4 rules
        if ( pageStyle === 'subscribers-news') {
            showContent = showContent || column === 'left'
        }

        // Page 6 rules
        if (pageStyle === 'earth-news') {
            imageAtTop = featuredPost;
            showTopDivider = centerColumn;
            showContent = showBodyText || column === 'left' || column === 'right';
            includeByline = true;
        }

        // Page 7 rules
        if (pageStyle === 'inside-nya') {
            includeDate = false;
            featuredPost = false;
        }
        if(pageStyle == 'listen'){
            showTopDivider = column === 'left' || column === 'right' 
        }
        //change this when page migration is done 
        if(pageStyle == 'politics'){
            showTopDivider = column === 'center' || column === 'left' || column === 'right' ;
        }

        /* Two column layout if
            It is the center column
            It is the first post or the option showBodyText is true, this prevents posts that don't show body text to being two column
            If titles full width is intended the two columns layout are applied just to excerpt content
            If layout is 3-column
        */
       let twoColumnTitle = centerColumn && showContent && !titlesFullWidth && (layout === 'column-3')
       let twoColumnContent = titlesFullWidth && (layout === 'column-3')
       let singleColumn = centerColumn && articleLayout !== undefined && (articleLayout == 'single-column')
       let threeColumnTitle = centerColumn && showContent && !titlesFullWidth && (layout === 'column-3-full')
       let threeColumnContent = titlesFullWidth && (layout === 'column-3-full')
        let ct = cn('title-column', {'double-column': twoColumnTitle}, {'three-column': threeColumnTitle},{'single-format':singleColumn})
        let cx = cn('excerpt-content', type, {'double-column': twoColumnContent}, {'three-column': threeColumnContent},{'single-format':singleColumn})

        return (
            <div className="excerpt">
                { (featuredPost && imageAtTop) && getExcerptImages(this.props.data, page)}
                { headlineText &&
                    <a href={linkToArticle}>
                        { showTopDivider && <div style={{width: `${topTitleDivider || 150}px`}} className="excerpt-divider" /> }
                        <div className={'title headline ' + column + ` ${pageStyle}`} ref="content" dangerouslySetInnerHTML={{__html:marked(headlineText || '')}} />
                        { titleDivider !== 0 && <div style={{width: `${titleDivider || 150}px`}} className="excerpt-divider" /> }
                    </a>
                }
                { (headline && !headlineText) &&
                    <a href={linkToArticle}>
                        { showTopDivider && <div className="excerpt-divider" /> }
                        <div className={'title headline ' + column + ` ${pageStyle}`}><h1>{headline}</h1></div>
                        { titleDivider !== 0 && <div style={{width: `${titleDivider || 150}px`}} className="excerpt-divider" /> }
                    </a>
                }
                { (featuredPost && !imageAtTop) && getExcerptImages(this.props.data, page)}
                <div className={ct} >
                    {/* centerColumn && <div style={{width: `${titleDivider || 150}px`}} className="excerpt-divider notop" /> */}
                    { subtitle &&
                        <a href={linkToArticle}>
                            <div className={'title subtitle ' + column + ` ${pageStyle}`} ref="content" dangerouslySetInnerHTML={{__html:marked(subtitle || '')}} />
                            { subtitleDivider !== 0 && <div style={{width: `${subtitleDivider || 150}px`}} className="excerpt-divider" /> }
                        </a>
                    }
                    { callout &&
                        <a href={linkToArticle}>
                            <div className={'title callout ' + column + ` ${pageStyle}`} ref="content" dangerouslySetInnerHTML={{__html:marked(callout || '')}} />
                            { calloutDivider !== 0 && <div style={{width: `${calloutDivider || 150}px`}} className="excerpt-divider" /> }
                        </a>
                    }
                    { (includeByline && byline) &&
                        <a href={linkToArticle}>
                            <div className="byline">{byline}</div>
                        </a>
                    }
                    { (!featuredPost && showContent) && getExcerptImages(this.props.data, page)}
                    { includeDate && <div className="dateline">{dateText}</div> }
                    <div className={cx} ref="content" dangerouslySetInnerHTML={{__html:marked(showContent && bodyText ? bodyText : '')}} />
                </div>
            </div>
        )
    }
}

export default Excerpt