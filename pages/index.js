import React from 'react'
import FrontDrawer from '../components/frontDrawer'
import fetchData from '../api/fetch'
import NavBar from  '../components/navbar'


const Home = ({leftSideIcons,postIt }) => {
  return (
    // <div id="drawer-front">
      <React.Fragment>
        <NavBar/>
        <div id="ui container">
         <FrontDrawer leftSideIcons={leftSideIcons} postIt={postIt} />
        </div>
      </React.Fragment>
    // </div>
  );
  
} 

export async function getServerSideProps() {
  const res = await fetchData('GET','api/v2/home')
  const data = await res.json() 
  const {leftSideIcons ={},postIt ={} } = data.data  || {}

  return { props: { leftSideIcons,postIt } }
}

export default Home
