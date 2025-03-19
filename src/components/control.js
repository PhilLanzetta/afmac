import React, { forwardRef } from "react"
import Slider from "@mui/material/Slider"
import back from "../images/rewind.svg"
import pause from "../images/pause.svg"
import forward from "../images/forward.svg"
import sound from "../images/sound.svg"
import * as styles from "./control.module.css"
import play from "../images/play.svg"

const Control = forwardRef((props, controlRef) => {
  const {
    onPlayPause,
    playing,
    onRewind,
    onForward,
    played,
    onSeek,
    onSeekMouseUp,
    onVolumeChangeHandler,
    onVolumeSeekUp,
    volume,
    duration,
    currentTime,
    onMouseSeekDown,
  } = props

  return (
    <div className={styles.videoControls} ref={controlRef}>
      <div>
        <Slider
          min={0}
          max={100}
          value={played * 100}
          onChange={onSeek}
          onChangeCommitted={onSeekMouseUp}
          onMouseDown={onMouseSeekDown}
          sx={{
            "& .MuiSlider-thumb": {
              color: "#fff",
              height: "10px",
              width: "10px",
              "&:focus, &:hover, &.Mui-active": {
                boxShadow: "none",
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                  boxShadow: "none",
                },
              },
            },
            "& .MuiSlider-track": {
              color: "#fff",
              height: "2px",
            },
            "& .MuiSlider-rail": {
              color: "#fff",
              height: "2px",
            },
          }}
        />
      </div>
      <div className={styles.controlsContainer}>
        <div>
          {currentTime} / {duration}
        </div>
        <div className={styles.seekAndPlayControls}>
          <button onClick={onRewind} aria-label="seek back">
            <img src={back} alt="seek back"></img>
          </button>
          <div className={styles.playPause}>
            <button aria-label="play" onClick={playing ? null : onPlayPause}>
              <img src={play} alt="play"></img>
            </button>
            <button aria-label="pause" onClick={playing ? onPlayPause : null}>
              <img src={pause} alt="pause"></img>
            </button>
          </div>
          <button onClick={onForward} aria-label="seek forward">
            <img src={forward} alt="seek forward"></img>
          </button>
        </div>
        <div className={styles.soundContainer}>
          <img src={sound} alt="sound icon"></img>
          <Slider
            onChange={onVolumeChangeHandler}
            value={volume * 100}
            onChangeCommitted={onVolumeSeekUp}
            sx={{
              width: "50%",
              "& .MuiSlider-thumb": {
                color: "#fff",
                height: "10px",
                width: "10px",
                "&:focus, &:hover, &.Mui-active": {
                  boxShadow: "none",
                  // Reset on touch devices, it doesn't add specificity
                  "@media (hover: none)": {
                    boxShadow: "none",
                  },
                },
              },
              "& .MuiSlider-track": {
                color: "#fff",
                height: "2px",
              },
              "& .MuiSlider-rail": {
                color: "#fff",
                height: "2px",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default Control
