import React from 'react'
import FrontDrawer from '../components/frontDrawer'
import fetchData from '../api/fetch'
import {Container} from 'semantic-ui-react';


const Home = ({leftSideIcons,postIt }) => {
  return (
      <React.Fragment>
        <Container>
          <FrontDrawer leftSideIcons={leftSideIcons} postIt={postIt} />
        </Container>
      </React.Fragment>
  );
  
} 

export async function getServerSideProps() {
  const res = await fetchData('GET','api/v2/home')
  const data = await res.json() 
  const {leftSideIcons ={},postIt ={} } = data.data  || {}

  return { props: { leftSideIcons,postIt } }
}

export default Home
