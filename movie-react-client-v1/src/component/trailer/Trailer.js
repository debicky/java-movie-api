import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Trailer.css";

import React from "react";

const Trailer = () => {
  const { ytTrailerId } = useParams();

  if (!ytTrailerId) {
    return null;
  }

  return (
    <div className="react-player-container">
      {
        <ReactPlayer
          controls="true"
          playing={true}
          url={`https://www.youtube.com/watch?v=${ytTrailerId}`}
          width="100%"
          height="100%"
        />
      }
    </div>
  );
};

export default Trailer;
