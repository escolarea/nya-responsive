import React, { useEffect, useState } from "react";
import LoadingIndicator from "../components/loading";
import fetchData from '../api/fetch'
import marked from "marked";

const Credits = ({page}) => {
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
      if(page){
        setPageStatus("ready");
      }
   
  }, []);

  if (pageStatus === "loading") {
    return (
      <div className="loading">
        <center>
          <LoadingIndicator />
        </center>
      </div>
    );
  }
  const renderPages = () => {
      let body = <div/>
       Object.keys(page).forEach(_id=>{
           const pageInfo = page[_id]
           if(pageInfo.id == 'credits'){
            const content =  marked(pageInfo.content)
            body =  <div className='credits' dangerouslySetInnerHTML={{__html:content}}/>
           }
   
       })
       return body
  }
  return (
    <div id="account-menu-container" className="terms">
        {renderPages()}
    </div>
  );
};
export async function getServerSideProps(props) {
    const request = {
      method: "GET",
      query: 'api/v2/initialData',
    };

    
    const res = await fetchData(request);
    const data = await res.json();
  
    const {page } = data.data;
  
    return { props: { page } };
  }


export default Credits;