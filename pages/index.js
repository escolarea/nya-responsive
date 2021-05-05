import React from 'react'
import FrontDrawer from '../components/frontDrawer'
import fetchData from '../api/fetch'
import {Container} from 'semantic-ui-react';
import NavBar from "../components/navbar";

const Home = ({leftSideIcons,postIt }) => {
  return (
      <React.Fragment>
        <NavBar/>
        <Container>
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
