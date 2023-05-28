// import bb from '../../videos/bb.mp4';
import ReactPlayer from 'react-player';
import Navs from '../navbar/Navs';

const VideoPlayground = () => {
    
    return (
        <div>
            <Navs />
            <ReactPlayer
                className='react-player fixed-bottom'
                // url= {bb}
                width='100%'
                height='100%'
                controls = {true}
            />
        </div>
    );
}

export default VideoPlayground;