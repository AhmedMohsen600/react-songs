import React from "react";
const LibrarySongs = ({
  songs,
  setCurrentSong,
  check,
  isPlaying,
  audioRef,
  setSongs,
  changeMode,
}) => {
  const handelLibraryClick = async (song) => {
    await setCurrentSong(song);
    if (isPlaying) audioRef.current.play();
    const selectedSongs = songs.map((sing) => {
      if (sing.id === song.id) {
        return {
          ...sing,
          active: true,
        };
      } else {
        return {
          ...sing,
          active: false,
        };
      }
    });
    setSongs(selectedSongs);
  };
  return (
    <div
      style={{
        background: changeMode ? "#181818" : "white",
        transition: " 0.3s",
        transform: check ? "translateX(0%)" : "translateX(-100%)",
      }}
      className="library-container"
    >
      {songs.map((song) => {
        return (
          <div
            className={`song-info ${song.active ? "selected" : ""}`}
            onClick={(e) => {
              handelLibraryClick(song);
            }}
            key={song.id}
          >
            <img alt={song.artist} src={song.cover}></img>
            <div className="desc">
              <h4 style={{ color: changeMode ? "white" : "black" }}>
                {song.artist}
              </h4>
              <h5 style={{ color: changeMode ? "white" : "black" }}>
                {song.name}
              </h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default LibrarySongs;
