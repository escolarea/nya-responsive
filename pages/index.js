import React from 'react'
import Nav from '../components/nav'
import FrontDrawer from '../components/frontDrawer'
import fetchData from '../api/fetch'



const Home = ({leftSideIcons,postIt }) => {
  return (
    <div id="drawer-front-container">
      <div id="drawer-front">
          <FrontDrawer leftSideIcons={leftSideIcons} postIt={postIt} />
      </div>
    </div>
  );
  
} 

export async function getServerSideProps() {
  const res = await fetchData('GET','api/v2/home')
  const data = await res.json() 
  const {leftSideIcons ={},postIt ={} } = data.data  || {}

  return { props: { leftSideIcons,postIt } }
}

export default Home
