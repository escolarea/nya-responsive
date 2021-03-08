import React, { Component } from 'react'
import marked from 'marked'
import cn from 'classnames'
// import AdColumn from './ad-column'
import Excerpt from './excerpt'
import interpose from '../../helpers/interpose'
import {parseOnlyNumbers} from '../../helpers/numbers'


const layoutColumns = {
    'column-3': ['left', 'center', 'right'],
    'column-4': ['left', 'center', 'right', 'fourth', 'fifth'],
    'column-4-full': ['fifth'],
    'column-4-full-inner': ['left', 'center', 'right', 'fourth'],
    'column-3-full': ['left', 'center', 'right'],
    'column-3-full-inner': ['fourth', 'fifth', 'sixth'],
    'column-3-equal': ['left', 'center', 'right'],
}

class NewsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageData: {
                layout: null
            },
            articles: {},
            loaded: false,
            numberOfArticles: 5
        }
        this.newsInterval = null;
    }

    _renderExcerpts(side, page, layout) {      
        const {articles: item, numberOfArticles, pageData , params} = this.props; 
        const articlesByColumn = JSON.parse(item);
        let data = articlesByColumn ? articlesByColumn[side] : null
        const titleData =   pageData.find(p => parseOnlyNumbers(p.title) === parseInt(page));
        const pageStyle    = titleData && titleData.styleName ? titleData.styleName : 'front-page'
        const dataToRender =  data && data.slice(0, 5);

        const articles = dataToRender ? dataToRender.map((data, idx)=> <Excerpt key={`excerpt-${page}-${side}-${idx}`} data={data} idx={idx} page={page} layout={layout} pageStyle={pageStyle} params={params} />) : []
        return interpose(articles, idx=><div className="divider" key={`divider-${idx}`} />)
    }

    ColumnsToNum(column) {
        const columns = {
            left: 0,
            center: 1,
            right: 2,
            fourth: 3,
        }
        return columns[column];
    }

    _renderColumnTitle(side, page) {
        const pageData = this.props.pageData.find(p => parseOnlyNumbers(p.title) === parseInt(page)) || {};
        const pageStyle    = pageData.styleName ? pageData.styleName : 'front-page'
        const headline = pageData[`${side}Headline`]
        if (!headline) return null
        const DividersWidths = pageData.dividersWidths ? pageData.dividersWidths.split(',').map(w => parseInt(w)) : null
        let DividerWidth = DividersWidths ? DividersWidths[this.ColumnsToNum(side)] : 150
        DividerWidth = DividerWidth === 0 ? 150 : DividerWidth

        const columnTitleClasses = cn('column-title', side, pageStyle )                                                 //TODO: Dynamic pages: refactor
        return (
            <div>
                <div className={columnTitleClasses} ref="content" dangerouslySetInnerHTML={{__html:marked(headline)}} />
                {page!==5 || page!== 6 && <div style={{width: `${DividerWidth}px`}} className="divider" />}
            </div>
        )
    }

    _renderColumn(side, page, layout) {
        const columnCn = cn('column', side, layout)
        const innerColumns3 = ( layout === 'column-3-full' && side === 'center' ) ? layoutColumns['column-3-full-inner'] : null
        const innerColumns4 = ( layout === 'column-4-full' && side === 'fifth' ) ? layoutColumns['column-4-full-inner'] : null

        return (
            <div key={`column-${side}-${layout}`} className={columnCn}>
                { this._renderColumnTitle(side, page) }
                { this._renderExcerpts(side, page, layout)}
                { (layout === 'column-3-full-inner' && side !== 'sixth') && this._renderColDivs('inner-column') }
                { (layout === 'column-4-full-inner' && side !== 'fourth') && this._renderColDivs('inner-column') }
                { innerColumns3 && innerColumns3.map(side => this._renderColumn(side, page, 'column-3-full-inner')) }
                { innerColumns4 && innerColumns4.map(side => this._renderColumn(side, page, 'column-4-full-inner')) }
            </div>
        )
    }

    _renderColDivs(layout) {
        switch(layout) {
            case 'column-3':
                return (
                    <div>
                        <div className="center-line" />
                        <div style={{ left: 3 * 347 + 20}} className="center-line" />
                        <div style={{ left: 4 * 347 + 30}} className="center-line" />
                    </div>
                )
            case 'column-4':
                return (
                    <div>
                        <div style={{ left: 1 * 336 + 10}} className="center-line" />
                        <div style={{ left: 2 * 336 + 30}} className="center-line" />
                        <div style={{ left: 3 * 336 + 50}} className="center-line" />
                        <div style={{ left: 4 * 336 + 60}} className="center-line" />
                    </div>
                )
            case 'column-3-full':
                return (
                    <div>
                        <div className="center-line" />
                        <div style={{ left: 1413}} className="center-line" />
                    </div>
                )
            case 'column-4-full':
                return null
            case 'inner-column':
                return (
                    <div className="center-line inner-column" />
                )
            case 'column-3-equal':
            return (
                <div>
                    <div style={{ left: 1 * 456 + 10}} className="center-line" />
                    <div style={{ left: 2 * 456 + 30}} className="center-line" />
                    <div style={{ left: 3 * 456 + 50}} className="center-line" />
                </div>
            )
            default:
                return (
                    <div>
                        <div className="center-line" />
                        <div style={{ left: 3 * 347 + 20}} className="center-line" />
                        <div style={{ left: 4 * 347 + 30}} className="center-line" />
                    </div>
                )
        }
    }
    render() {
        if (!this.props.loaded) return <div/>
        // <SplashScreen style={{height: '100vh', width: '100%'}} loadState={100} />;
        const { page } = this.props
        const pageData = this.props.pageData.find(p => parseOnlyNumbers(p.title)=== parseInt(page)) || {};
        const { layout = 'column-3'} = pageData;
        const columns = layoutColumns[layout] || []
        const parsedColumns = columns.map(side => this._renderColumn(side, page, layout))
        return (
            <div className= "main-content">
                <div className="excerpt-wrapper">
                    { parsedColumns }
                    { this._renderColDivs(layout) }
                </div>
                {/* { (layout !== 'column-3-full' && layout !== 'column-4-full' && layout !== 'column-4') && <AdColumn numberOfArticles={this.state.numberOfArticles} page={page} />} */}
            </div>
        )
    }
}



export default NewsWrapper;