import React from "react";

const Song = ({ currentSong, changeMode, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        className={`${isPlaying ? "moving" : ""} `}
        alt={currentSong.artist}
        src={currentSong.cover}
      ></img>
      <h2 style={{ color: changeMode ? "white" : "black" }}>
        {currentSong.name}
      </h2>
      <h3 style={{ color: changeMode ? "white" : "black" }}>
        {currentSong.artist}
      </h3>
    </div>
  );
};

export default Song;
