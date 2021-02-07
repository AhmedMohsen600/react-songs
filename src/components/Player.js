import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const Player = ({
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
  changeMode,
  songs,
  setCurrentSong,
  currentSong,
  setSongs,
}) => {
  const onTheRun = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    const selectedSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(selectedSongs);
  }, [currentSong]);
  // useEffect(async () => {
  //   if (
  //     getTime(songInfo.currentTime) === getTime(songInfo.duration) &&
  //     songInfo.duration !== 0
  //   ) {
  //     let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  //     await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  //     if (isPlaying) audioRef.current.play();
  //   }
  // }, [songInfo.currentTime]);

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const nextSongHandler = async (derection) => {
    if (derection === "skip-forward") {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
    }
    if (derection === "skip-left") {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
    }
  };
  return (
    <div className="player">
      <div className="time-control">
        <p style={{ color: changeMode ? "white" : "black" }}>
          {getTime(songInfo.currentTime)}
        </p>
        <input
          min="0"
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p style={{ color: changeMode ? "white" : "black" }}>
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            nextSongHandler("skip-left");
          }}
          color={changeMode ? "white" : "black"}
          className="skip-left"
          size="2x"
          icon={faAngleLeft}
        />
        <button className="play-btn" onClick={onTheRun}>
          <FontAwesomeIcon
            color={changeMode ? "white" : "black"}
            className="play"
            size="2x"
            icon={isPlaying ? faPause : faPlay}
          />
        </button>
        <FontAwesomeIcon
          onClick={() => {
            nextSongHandler("skip-forward");
          }}
          color={changeMode ? "white" : "black"}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
