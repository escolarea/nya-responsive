import React, {Component} from 'react';
// import frame1 from '../static/images/loading-indicator/frame_01.png';
// import frame2 from '../static/images/loading-indicator/frame_02.png';
// import frame3 from '../static/images/loading-indicator/frame_03.png';
// import frame4 from '../static/images/loading-indicator/frame_04.png';
// import frame5 from '../static/images/loading-indicator/frame_05.png';
// import frame6 from '../static/images/loading-indicator/frame_06.png';
// import frame7 from '../static/images/loading-indicator/frame_07.png';
// import frame8 from '../static/images/loading-indicator/frame_08.png';
// import frame9 from '../static/images/loading-indicator/frame_09.png';
// import frame10 from '../static/images/loading-indicator/frame_10.png';

function cycle(array){
    let i = -1
    return ()=>{
        i++; if (i >= array.length) i = 0
        return array[i]
    }
}

// const images = [
//     frame1,
//     frame2,
//     frame3,
//     frame4,
//     frame5,
//     frame6,
//     frame7,
//     frame8,
//     frame9,
//     frame10,
// ];

// let imagesLoaded  = false

// const frames = images.map(path=>`url('${path}')`)

// const next_frame = cycle(frames)

export default class LoadingIndicator extends Component {
    constructor(props){
        super(props)
        // this.state = {frame:next_frame(), visible: false, imagesLoaded}
    }
    componentDidMount(){
        // let wait = 500
        // this.timeout = setTimeout(()=>{
        //     this.startAnimating()
        // }, wait)
    }
    // startAnimating(){
    //     let frameLength = 1000 / 15
    //     this.interval = setInterval(()=>{
    //         this.setState({frame:next_frame(), visible: true})
    //     }, frameLength)
    // }
    // componentWillUnmount(){
    //     this.unmounted = true
    //     clearTimeout(this.timeout)
    //     clearInterval(this.interval)
    // }
    render(){
        // let {frame, visible, imagesLoaded} = this.state
        const style = { width: '166px', height: '168px' };
        // if (visible && imagesLoaded) {
            // style.backgroundImage = '../static/images/loading-indicator/frame_01.png';
        // }

        return (<div className="loading-indicator" style={style}>
                <img src="../static/images/loading-indicator/frame_01.png"/>
             </div>)
    }
}