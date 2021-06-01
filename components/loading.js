import React from 'react';


 const LoadingIndicator = () =>{

        const style = { width: '166px', height: '168px' };

        return (<div className="loading-indicator" style={style}>
                <img src="../static/images/loading-indicator/frame_01.png"/>
             </div>)
}

export default LoadingIndicator;