import React from 'react';

const VideoPlayer = () => {
  return (
    <div>
      <video width="100%" height="100%" controls>
        <source src="../../bb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;