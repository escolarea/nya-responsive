// here i render the page 

import React , {useEffect, useState}  from 'react'
import NewsWrapper from '../../components/news/news'
import Article     from '../../components/news/article'
import NewsNavbar  from '../../components/news/news-navbar'
import {parseOnlyNumbers} from '../../helpers/numbers'
import fetchData from '../../api/fetch'
import Meta from '../../components/metatags';
import { useRouter } from 'next/router';

const News = ({routeType, articles, params, pageData, commonValues}) => {
  const [numberOfArticles, setnumberOfArticles] = useState(5);
  const [loaded, setloaded] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    let newsInterval = false
    if(routeType === 'page'){
      setloaded(true)               
    }
    if (
      params.includes("top-10-albums") ||
      params.includes("top-40-tracks") ||
      params.includes("movietone")
    ) {
      router.push('/news/1');
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
    const {headline:title = "", excerpt: desc = "", id} = article
    console.log("title", title)
    const currentUrl  = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${params}/${id}` || "" ;   

    return(
      <>
      <Meta 
          title={title}
          canonical={currentUrl}
          desc={desc}
          />
      <Article
      data={article}
      loaded={loaded}
      />
      </>
    )
  } 

    // const {volume = "",today = getDate(), leftHeaderText = "", leftHeaderLink, rightHeaderText = "", 
  //               linkRight} = this.props.data || {};
        const {contrarianPagesTitles} = commonValues.commonValues

        const routes = routesParse(contrarianPagesTitles, pageData)
        //page style and backgrounds
        let themeAperance        = routes && routes.themeAperance

        //force light mode on these routes because page number is always one
        
        const pageInfo = pageData && pageData[params-1] || {};
        const title = pageInfo && pageInfo.columnsTitles && pageInfo.columnsTitles[0].title || "";
        const desc = pageInfo && pageInfo.title || "";
        const currentUrl  = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${params}` || "" ;    
        return (
          <>
          <Meta 
          title={title}
          canonical={currentUrl}
          desc={desc}
          />
          <React.Fragment>
          <NewsNavbar 
            pagesData={pageData}
            params={params}
            page={params}
            themeAperance={themeAperance}
          />
          <NewsWrapper
            articles={articles} 
            page = {params}
            pageData = {pageData}
            numberOfArticles={numberOfArticles}
            loaded={loaded}
            params={params}
          />
          </React.Fragment>
          </>
        );
} 

//renders as static page.
export async function getServerSideProps(context) {

    const { page }   =  context.query;
    let    params    =  page && page[0];
    const  routeType =  page.length == 2 ? 'post' : 'page'

    const promises   =  [
      fetchData({method:'GET',query:'api/v2/contrarianPage'}),
      fetchData({method:'GET',query:'api/v2/initialData'})
    ];

    if(routeType == 'page'){
      promises.push(fetchData({method:'GET',query: `api/v2/news/page-${params}`}))
      
    }else{
      params = page[1];
      promises.push(fetchData({method:'GET',query:`api/v2/article/${params}`}))
    }

    //request all promises 
    const [contrarianPageRes, initialDataRes, request] = await Promise.all(promises);
    //resolve promises 
    const [contrarianPage, initialData, articles] = await Promise.all([

      contrarianPageRes.json(), 
      initialDataRes.json(),
      request.json()

    ]);

    console.log("initialData", initialData);

    const {data : navKeys} = contrarianPage
    const {data:commonValues} = initialData 
    const pageData =  Object.keys(navKeys).map(page=>navKeys[page])

return { props: {routeType, articles: articles.data, params, pageData, commonValues } }
}

export default News
