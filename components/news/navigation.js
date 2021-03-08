import React, {Component}            from 'react'
import {parseOnlyNumbers} from '../../helpers/numbers'
import cn                            from 'classnames'
class Navigation extends Component {
    click(dir, maxIndex){
        const {page, routes} = this.props
        const pageIndex = Object.keys(routes).filter(route=>routes[route].includes(page))
        const nextpage  = this.nextPage(parseInt(pageIndex[0]), dir, maxIndex)
        const route = this.props.routes[nextpage]
        
        // router.push(router.createLocation(route))
    }

    nextPage (currPage, dir, maxIndex){
      return Math.max(1, Math.min(maxIndex, currPage + dir))
    }
    
    render(){
        let maxIndex = 1
        const {page, maxPage, routes} = this.props,
              routesIndex = routes[maxPage];

        if(routesIndex) maxIndex = parseOnlyNumbers(routesIndex);

        const hasPrev = page > 1,
              hasNext = page < maxIndex;
     

    return (
        <div className="navigation">
          <div className={cn("button prev", {hidden:!hasPrev})} onClick={()=>this.click(-1, maxIndex)}>PREVIOUS</div>
          <p className="text">{page} of {maxPage}</p>
          <div className={cn("button next", {hidden:!hasNext})} onClick={()=>this.click(+1, maxIndex)}>NEXT</div>
        </div>
    )
  }
}

export default Navigation;