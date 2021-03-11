// here i render the page 

import React , {useEffect, useState}  from 'react'
import NewsWrapper from '../../components/news/news'
import Article     from '../../components/news/article'
import Navigation  from '../../components/news/navigation'
import NewsNavbar  from '../../components/news/news-navbar'
import {add} from '../../store/commonValues/action'
import {parseOnlyNumbers} from '../../helpers/numbers'
import Link from "next/link";
import fetchData from '../../api/fetch'
import NavBar from '../../components/navbar';

const News = ({routeType, articles, params, pageData, commonValues}) => {
  const [numberOfArticles, setnumberOfArticles] = useState(5);
  const [loaded, setloaded] = useState(false);


  useEffect(()=>{
    let newsInterval = false
    if(routeType === 'page'){
      setloaded(true)
      // if(newsInterval)clearInterval(newsInterval);
//to do run this undefinetely 
                // newsInterval = setInterval(() => {
                //   setnumberOfArticles(numberOfArticles + 5)
                //   setloaded(true)
                // }, 2000)

               
    }

    return(()=>{
        if(newsInterval)clearInterval(newsInterval);
    })
  },[])

  const routesParse = (contrarianPagesTitles, pagesData) => {

    const orderedPages = pagesData.sort((a,b) =>{ 
      a = parseOnlyNumbers(a.title || "")
      b = parseOnlyNumbers(b.title || "")

     return  a - b
    }).slice(0)

    let existingPages   = []
    let routes          = {}
    let pages           = {'header':'', 'styles':'front-page'}
    let routesList      = ['/news/0']
    let themeAperance        = 'light-mode'
    let backgroundImage = ''


    for(let i = 0; i < orderedPages.length; i++){
      let pageItem = orderedPages[i]
      
      if(pageItem.title && contrarianPagesTitles && contrarianPagesTitles.includes(pageItem.title) ){
        
        let pageOrder = parseOnlyNumbers(pageItem.title)

        if(pageOrder == params){
          if(pageItem.darkMode) themeAperance = 'dark-mode'
          if(pageItem.backgroundImage && pageItem.backgroundImage.fields) backgroundImage = pageItem.backgroundImage.fields.file.url
          if(pageItem.pageHeader && pageItem.pageHeader.fields) pages['header'] = pageItem.pageHeader.fields.file.url
          if(pageItem.styleName) pages['styles'] = pageItem.styleName
        }

        existingPages.push(pageItem)

        if(pageItem.linkString === 'PPV')
        {
          routesList.push(`/news/movietone`)
          routes[pageOrder]  = `/news/movietone`
          routes['ppv'] = '/news/movietone'
        }
        else
        {
          routesList.push(`/news/${pageOrder}`)
          routes[pageOrder]  = `/news/${pageOrder}`
        }
      }
    }

    const maxPage           =     existingPages.length 
    const positionRoutes    =     Object.assign({}, routesList)
    routes['top-40']        =     '/news/top-40-tracks'
    routes['top-10']        =     '/news/top-10-albums'
    routes['ppv']           =     '/news/movietone'
    
    // Inject Top 40 and Top10 Links after Home Link
    existingPages.splice(1, 0, {
        title: 'top-40',
        order:existingPages.length + 1,
        columnsTitles: [{ title: 'Top 40', highlighted: false }]
    },
    {
        title: 'top-10',
        order:existingPages.length + 2,
        columnsTitles: [{ title: 'Top 10', highlighted: false }]
    })
    
    existingPages.splice(existingPages.length -1 , 0, {
      title: 'ppv',
      order:existingPages.length -1 ,
      columnsTitles: [{ title: 'Movietone', highlighted: true }]
    })

    return  {routes, pages, maxPage,  existingPages, positionRoutes, themeAperance, backgroundImage}
  }

  if(routeType === 'post'){

    const {article} = articles
    return(
      <Article
      data={article}
      loaded={loaded}
      />
    )
  } 

    // const {volume = "",today = getDate(), leftHeaderText = "", leftHeaderLink, rightHeaderText = "", 
  //               linkRight} = this.props.data || {};
        const {contrarianPagesTitles} = commonValues.commonValues

        const routes = routesParse(contrarianPagesTitles, pageData)
        //page style and backgrounds
        let headerImage          = routes && routes.pages['header'] 
        let pageStyle            = routes && routes.pages['styles'] 
        let backgroundImage      = routes && routes.backgroundImage 
        let themeAperance        = routes && routes.themeAperance

//REVISE THIS ONE 
        //force light mode on these routes because page number is always one
        if( params.includes("top-10-albums") ||
            params.includes("top-40-tracks") || 
            params.includes("movietone")){
            themeAperance       = 'light-mode';
            backgroundImage     = defaultBackground;
            // headerImage         =  params.includes("movietone") ? ppvHeader : defaultHeader;
        }
        
        return (
          <React.Fragment>
          <NavBar />
          <NewsWrapper
            articles={articles} 
            page = {params}
            pageData = {pageData}
            numberOfArticles={numberOfArticles}
            loaded={loaded}
            params={params}
          />
          </React.Fragment>
        );
      // return(
      //   <div className="newspaper-page"> 
      //   {/* <ScrollContainer scrollKey={this.props.location.pathname}> */}
      //   <div className="page-wrapper">
      //     {/* <VerticalCenter style={{width:'100%', height:'100%'}}> */}
      //       <div className="page">
      //         <div className={`ragged-edge ${themeAperance}` }/>
      //         <div className="page-contents" style={{backgroundImage:`url(${backgroundImage})`}} >
      //           <div className={`newspaper-header ${themeAperance} ` }style={{backgroundImage:`url(${backgroundImage})`}} >
      //             <div className={'title' + ` ${pageStyle}`}  style={{backgroundImage: `url(${headerImage})`}}/>
      //             <Link href="/news/1"><div className="title-click-area" /></Link>
      //             <div className={`midline ${themeAperance}`}>
      //               {/* <div className="volume">{volume}</div> */}
      //               {/* <div className="today">{today}</div> */}
      //               {routes && routes.positionRoutes && <Navigation page={params}  maxPage={routes.maxPage} routes={routes.positionRoutes} />}
      //             </div>
      //             {/* {leftEl}
      //             {rightEl} */}
      //           </div>
      //               {routes&& routes.existingPages &&<NewsNavbar page={params} pagesData={routes.existingPages}  navBarRoutes={routes.routes} maxPage={routes.maxPage} themeAperance={themeAperance}  params={params} />}
      //           <div className={`content ${themeAperance}`}>
      //             <div className={'news-content' + ` news-${params}`}>
      //                 <NewsWrapper
      //                             articles={articles} 
      //                             page = {params}
      //                             pageData = {pageData}
      //                             numberOfArticles={numberOfArticles}
      //                             loaded={loaded}
      //                             params={params}
      //                             />
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     {/* </VerticalCenter> */}
      //   </div>
      //   {/* </ScrollContainer> */}
      // </div>
      // )
} 

//renders as static page.
export async function getServerSideProps(context) {

    const { page }   =  context.query;
    let    params    =  page[0];
    const  routeType =  page.length == 2 ? 'post' : 'page'
    const promises   =  [
      fetchData('GET','api/v2/contrarianPage'),
      fetchData('GET','api/v2/initialData')
    ];

    if(routeType == 'page'){
      promises.push(fetchData('GET', `api/v2/news/page-${params}`))
      
    }else{
      params = page[1];
      promises.push(fetchData('GET',`api/v2/article/${params}`))
    }

    //request all promises 
    const [contrarianPageRes, initialDataRes, request] = await Promise.all(promises);
    //resolve promises 
    const [contrarianPage, initialData, articles] = await Promise.all([

      contrarianPageRes.json(), 
      initialDataRes.json(),
      request.json()

    ]);

    const {data : navKeys} = contrarianPage
    const {data:commonValues} = initialData 
    const pageData =  Object.keys(navKeys).map(page=>navKeys[page])

return { props: {routeType, articles: articles.data, params, pageData, commonValues } }
}

export default News
