import React, {Component, Fragment} from 'react';
import cn from 'classnames';
import { parseOnlyNumbers } from "../../helpers/numbers";

const Link = (props) => {

    let selected = false;
    let maxPage  = props.maxPage+1
    selected = props.page === props.current

    // This little hack is to keep top 40 and top 10 out of the newspaper's navigation system
    //TO DO : pass down path from query document.location.href
    const location =  props.params
    if (props.page === 1) selected = location.includes('1') && selected
    if (props.page === maxPage) selected = location.includes('top-40-tracks') 
    if (props.page === maxPage) selected = location.includes('top-10-albums') 
    //------------------------

    const cx = cn('link', { selected: selected })
    return (<div className={cx} onClick={e => props.OnClickHandler(props.page)}>
        {props.children}
    </div>)
}

class NewsNavbar extends Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick(page) {
        const { navBarRoutes} = this.props;
        const route = navBarRoutes[page]
        //TODO: use next/router for prerender routes
        // router.push(router.createLocation(route))
       
    }
    renderNavBar(){
        const { page,pagesData, themeAperance, maxPage, fixed, params }   = this.props;
        const linksWithoutDivider           = [pagesData.length - 1, 0, 1]
        let   items                         = [];

        items = pagesData.map((p,idx) =>{ 
            if(p.title){

                let titlePage = p.title.includes('page') ? parseOnlyNumbers(p.title) : p.title;
                if(p.linkString === 'PPV')
                {
                    titlePage = 'ppv'
                }
                
                return(<Fragment key={p.title}>

                <Link page={titlePage} current={page} maxPage={maxPage} OnClickHandler={this.onClick} params={params}  >
                    {p.columnsTitles && p.columnsTitles.map(c => <p className={c.highlighted ? 'highlighted' : ''} key={c.title}>{c.title}</p>)}
                </Link>
                { !linksWithoutDivider.includes(idx) && <div className="divider"><span>|</span></div> }
                </Fragment>)
            }
        })
        
        return <div className={`news-navbar ${themeAperance} ${fixed ? "fixed": ""}`}> {items} </div>
    }

    render() {
        return (
            <div>
                {this.renderNavBar()}
            </div>
        )
    }
}

export default NewsNavbar;