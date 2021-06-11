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
    if (
      params.includes("top-10-albums") ||
      params.includes("top-40-tracks") ||
      params.includes("movietone")     
      
    ) {
      router.push('/news/1');
    }

    if(routeType === 'page'){
      setloaded(true)               
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

  if(routeType === 'not-found' ){

    return(
      <>

      <div style={{display:'flex',justifyContent:'center'}}> Article Not Found</div>

      </>
    )
  }

  if(routeType === 'post'){

    const {article} = articles;

    const {headline:title = "", excerpt: desc = "", id, pageNumber} = article
    const pageInfo        = pageData && pageData.find(_page=> _page.title === pageNumber) || {};
    const pageNumberId    = pageNumber && pageNumber.replace(/\D/g, "");
    const currentUrl      = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${pageNumberId}/${id}` || "" ; 
    const backUrl         = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${pageNumberId}` || ""


    const {darkMode       = false , backgroundImage= false , pageHeader = false} = pageInfo; 
    let themeAperance     = 'light-mode';
    let background        = '';
    let headerImg         = '';

    if(darkMode){
      themeAperance       = 'dark-mode';
      background          = backgroundImage.fields && backgroundImage.fields.file.url;
      headerImg           = pageHeader.fields && pageHeader.fields.file.url;

    }
    return(
      <>
      <Meta 
          siteName="Neil Young Archives"
          title={title}
          canonical={currentUrl} 
          desc={desc}
          />
      <Article
      themeAperance={themeAperance}
      headerImage={headerImg}
      data={article}
      loaded={loaded}
      backUrl={backUrl}
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
        let backgroundStyle      = routes && routes.backgroundImage
        let headerImage          = routes && routes.pages['header'] 

        //force light mode on these routes because page number is always one
        
        const pageInfo = pageData && pageData[params-1] || {};
        const title = pageInfo && pageInfo.columnsTitles && pageInfo.columnsTitles[0].title || "Neil Young Archives";
        const desc = `NYA contains the complete archives of Neil Young. Times contrarian ${pageInfo && pageInfo.title}`;
        const currentUrl  = `${process.env.NEXT_PUBLIC_SITE_URL}/news/${params}` || `${process.env.NEXT_PUBLIC_SITE_URL}` ;    
        return (
          <>
          <Meta 
          siteName="Neil Young Archives"
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
            backgroundStyle={backgroundStyle}
            headerImage={headerImage}
          />
          <NewsWrapper
            articles={articles} 
            page = {params}
            pageData = {pageData}
            numberOfArticles={numberOfArticles}
            loaded={loaded}
            params={params}
            themeAperance={themeAperance}
            backgroundStyle={backgroundStyle}
          />
          </React.Fragment>
          </>
        );
} 

//renders as static page.
export async function getServerSideProps(context) {


    const { page , id}   =  context.query;
    let    params    =  page && page[0];
    let    routeType =  page.length == 2 ? 'post' : 'page'

    const promises   =  [
      fetchData({method:'GET',query:'api/v2/contrarianPage'}),
      fetchData({method:'GET',query:'api/v2/initialData'})
    ];

    if(routeType == 'page'){
      promises.push(fetchData({method:'GET',query: `api/v2/news/page-${params}`}))
      
    }else{
      promises.push(fetchData({method:'GET',query:`api/v2/article/${id}`}))
    }

    //request all promises 
    const [contrarianPageRes, initialDataRes, request] = await Promise.all(promises);
    //resolve promises 
    const [contrarianPage, initialData, articles] = await Promise.all([

      contrarianPageRes.json(), 
      initialDataRes.json(),
      request.json()

    ]);




    const {data : article = {}} = articles
    const {data : navKeys} = contrarianPage
    const {data:commonValues} = initialData 
    const pageData =  Object.keys(navKeys).map(page=>navKeys[page])

    if(article && article.article &&  Object.keys(article.article).length === 0){
      routeType = 'not-found'
    }


return { props: {routeType, articles: article, params, pageData, commonValues } }
}

export default News
