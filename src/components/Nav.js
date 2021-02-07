import React from "react";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  modeHandelStyleWhite,
  modeHandelStyle,
  navStyle,
  librarryButtonStyle,
  librarryButtonStyleWhite,
} from "../style";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ check, setCheck, setChangeMode, changeMode }) => {
  const libraryHandler = () => {
    if (check) {
      setCheck(!check);
    } else setCheck(true);
  };
  const koko = document.querySelector("body");
  const changeModeHandler = () => {
    if (changeMode) {
      setChangeMode(!changeMode);
      koko.style.background = "white";
    } else {
      setChangeMode(!changeMode);
      koko.style.background = "#181818";
    }
  };

  return (
    <nav style={navStyle}>
      <h1>{""}</h1>
      <button
        style={changeMode ? modeHandelStyle : modeHandelStyleWhite}
        className="mode"
        onClick={changeModeHandler}
      >
        <FontAwesomeIcon size="2x" icon={faAdjust} />
      </button>
      <button
        onClick={libraryHandler}
        style={changeMode ? librarryButtonStyle : librarryButtonStyleWhite}
      >
        librarry{" "}
        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
