import { useState, useRef } from "react";
import LibrarySongs from "./components/LibrarySongs";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.css";
import data from "./util";
import Nav from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [check, setCheck] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [changeMode, setChangeMode] = useState(false);
  const audioRef = useRef(null);
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
    });
  };
  const onSongEnd = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      style={{
        transition: "0.4s",
      }}
      className={`App ${check ? "library-active" : ""} `}
    >
      <Nav
        changeMode={changeMode}
        setChangeMode={setChangeMode}
        check={check}
        setCheck={setCheck}
      />
      <Song
        isPlaying={isPlaying}
        changeMode={changeMode}
        currentSong={currentSong}
      />
      <Player
        changeMode={changeMode}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        songs={songs}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        setSongs={setSongs}
      />
      <LibrarySongs
        changeMode={changeMode}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        check={check}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.song}
        onEnded={onSongEnd}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
}

export default App;
