import React from 'react'
import FrontDrawer from '../components/frontDrawer'
import fetchData from '../api/fetch'
import {Container} from 'semantic-ui-react';
import Meta from '../components/metatags'


const Home = ({leftSideIcons,postIt }) => {
  return (
      <React.Fragment>
        <Meta 
          siteName="Neil Young Archives"
          title={'Neil Young Archives'}
          canonical={'https://neilyoungarchives.com'}
          desc={'NYA contains the complete archives of Neil Young. The site is designed for a chronological exploration of artist output including music, books, films, & videos. Music is streamed in high-res with Xstream by NYA.  A living document, NYA is always being updated with new information, content and news.'}
          />
        <Container fluid className="home-wrapper">
          <FrontDrawer leftSideIcons={leftSideIcons} postIt={postIt} />
        </Container>
      </React.Fragment>
  );
  
} 

export async function getServerSideProps() {
  const request = {
    method:'GET',
    query:'api/v2/home',
  }

  const res = await fetchData(request)
  const data = await res.json() 
  const {leftSideIcons ={},postIt ={} } = data.data  || {}

  return { props: { leftSideIcons,postIt } }
}

export default Home
