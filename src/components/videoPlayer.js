import React, { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import Control from "./control"
import { GatsbyImage } from "gatsby-plugin-image"
import { formatTime } from "../utils/formatTime"
import full from "../images/fullScreen.svg"
import small from "../images/smallScreen.svg"
import screenfull from "screenfull"
import useWindowSize from "../utils/useWindowSize"
import * as styles from "./videoPlayer.module.css"
import { AnimatePresence, motion } from "framer-motion"
import play from "../images/playBig.svg"
import useOnScreen from "../utils/useOnScreen"

let count = 25

const VideoPlayer = ({
  video,
  videoId,
  activeVideo,
  setActiveVideo,
  isHome,
}) => {
  const videoPlayerRef = useRef(null)
  const controlRef = useRef(null)
  const fullScreenRef = useRef(null)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: isHome ? true : false,
    volume: isHome ? 0 : 1,
    playbackRate: 1.0,
    played: 0,
    playsinline: true,
    seeking: false,
  })

  const [fullScreenState, setFullScreenState] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  const { width, height } = useWindowSize()
  const isMobile = height > width ? width < 769 : width < 900

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking } = videoState

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00"
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00"

  const formatCurrentTime = formatTime(currentTime)
  const formatDuration = formatTime(duration)

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing })
    setActiveVideo(videoId)
  }

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    if (videoPlayerRef.current.getCurrentTime() > 5) {
      videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5)
    } else {
      videoPlayerRef.current.seekTo(0)
    }
  }

  const handleFastFoward = () => {
    //FastFowards the video player by adding 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 5)
  }

  const progressHandler = state => {
    if (count > 5) {
      controlRef.current.style.visibility = "hidden"
      fullScreenRef.current.style.visibility = "hidden" // toggling player control container
    } else {
      count += 1
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state })
    }
  }

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) })
    videoPlayerRef.current.seekTo(parseFloat(value / 100))
  }

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false })
    videoPlayerRef.current.seekTo(value / 100)
  }

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    })
  }

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    })
  }

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted })
  }

  const onSeekMouseDownHandler = e => {
    setVideoState({ ...videoState, seeking: true })
  }

  const mouseMoveHandler = () => {
    if (hasPlayed) {
      controlRef.current.style.visibility = "visible"
      fullScreenRef.current.style.visibility = "visible"
      count = 0
    }
  }

  const handleClickFullscreen = () => {
    if (!fullScreenState && !isMobile && screenfull.isEnabled) {
      screenfull.request(document.getElementById(videoId))
      setFullScreenState(true)
    } else if (isMobile && !fullScreenState && screenfull.isEnabled) {
      const videoDiv = document.getElementById(videoId)
      screenfull.request(videoDiv.getElementsByTagName("iframe")[0])
      setFullScreenState(true)
    } else {
      document.exitFullscreen()
      setFullScreenState(false)
    }
  }

  useEffect(() => {
    if (activeVideo !== videoId && videoPlayerRef.current) {
      setVideoState(prevVideoState => ({ ...prevVideoState, playing: false }))
    }
  }, [activeVideo, videoId])

  useEffect(() => {
    if (isOnScreen && hasPlayed) {
      setVideoState(prevVideoState => ({ ...prevVideoState, playing: true }))
      if (!isMobile) {
        controlRef.current.style.visibility = "hidden"
        fullScreenRef.current.style.visibility = "hidden"
      }
    } else if (isOnScreen && isHome) {
      setVideoState(prevVideoState => ({ ...prevVideoState, playing: true }))
      if (!isMobile) {
        controlRef.current.style.visibility = "hidden"
        fullScreenRef.current.style.visibility = "hidden"
      }
    } else {
      setVideoState(prevVideoState => ({ ...prevVideoState, playing: false }))
    }
  }, [isOnScreen, isMobile])

  return (
    <div className={styles.videoPlayerContainer}>
      <div
        className={styles.videoPlayer}
        style={{
          aspectRatio: video.aspectRatio ? video.aspectRatio : "16 / 9",
          height: "100%",
          width: "100%",
        }}
        id={videoId}
        key={isMobile}
        ref={elementRef}
      >
        <AnimatePresence>
          {!hasPlayed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="video-poster"
              className={styles.coverImageContainer}
              onClick={playPauseHandler}
            >
              <GatsbyImage
                image={video.posterImage?.gatsbyImageData}
                alt={video.posterImage?.description}
                className={styles.coverImage}
              ></GatsbyImage>
              {!isHome && (
                <div className={styles.playOverlayDesktop}>
                  <svg
                    className={styles.overlayPlayBtn}
                    viewBox="0 0 134 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M108.527 66.137C108.678 66.2252 108.803 66.3512 108.889 66.5026C108.976 66.654 109.022 66.8255 109.022 67C109.022 67.1745 108.976 67.346 108.889 67.4974C108.803 67.6488 108.678 67.7748 108.527 67.863L41.505 107.118C41.3531 107.207 41.1804 107.254 41.0044 107.255C40.8283 107.256 40.6552 107.21 40.5025 107.122C40.3499 107.035 40.223 106.909 40.1347 106.756C40.0465 106.604 40 106.431 40 106.255V27.745C40 27.569 40.0465 27.3961 40.1347 27.2438C40.223 27.0915 40.3499 26.9652 40.5025 26.8776C40.6552 26.7901 40.8283 26.7444 41.0044 26.7451C41.1804 26.7459 41.3531 26.7931 41.505 26.882L108.527 66.137Z"
                      fill="currentColor"
                    />
                    <path
                      d="M67 6C54.9353 6 43.1416 9.57759 33.1102 16.2804C23.0788 22.9831 15.2603 32.51 10.6433 43.6563C6.0264 54.8026 4.8184 67.0677 7.1721 78.9005C9.5258 90.7334 15.3355 101.603 23.8665 110.134C32.3975 118.665 43.2667 124.474 55.0995 126.828C66.9323 129.182 79.1974 127.974 90.3437 123.357C101.49 118.74 111.017 110.921 117.72 100.89C124.422 90.8584 128 79.0647 128 67C127.982 50.8274 121.549 35.3224 110.113 23.8867C98.6776 12.4509 83.1726 6.01826 67 6ZM67 0C80.2514 0 93.2051 3.92948 104.223 11.2915C115.241 18.6536 123.829 29.1176 128.9 41.3602C133.971 53.6029 135.298 67.0743 132.713 80.0711C130.127 93.0678 123.746 105.006 114.376 114.376C105.006 123.746 93.0678 130.127 80.0711 132.713C67.0743 135.298 53.6029 133.971 41.3602 128.9C29.1176 123.829 18.6536 115.241 11.2915 104.223C3.92948 93.2051 0 80.2514 0 67C0 49.2305 7.05891 32.1888 19.6238 19.6238C32.1888 7.05891 49.2305 0 67 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          )}
          {isMobile && !hasPlayed && !isHome && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.playOverlay}
              onClick={playPauseHandler}
            >
              <svg
                className={styles.overlayPlayBtn}
                viewBox="0 0 134 134"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M108.527 66.137C108.678 66.2252 108.803 66.3512 108.889 66.5026C108.976 66.654 109.022 66.8255 109.022 67C109.022 67.1745 108.976 67.346 108.889 67.4974C108.803 67.6488 108.678 67.7748 108.527 67.863L41.505 107.118C41.3531 107.207 41.1804 107.254 41.0044 107.255C40.8283 107.256 40.6552 107.21 40.5025 107.122C40.3499 107.035 40.223 106.909 40.1347 106.756C40.0465 106.604 40 106.431 40 106.255V27.745C40 27.569 40.0465 27.3961 40.1347 27.2438C40.223 27.0915 40.3499 26.9652 40.5025 26.8776C40.6552 26.7901 40.8283 26.7444 41.0044 26.7451C41.1804 26.7459 41.3531 26.7931 41.505 26.882L108.527 66.137Z"
                  fill="currentColor"
                />
                <path
                  d="M67 6C54.9353 6 43.1416 9.57759 33.1102 16.2804C23.0788 22.9831 15.2603 32.51 10.6433 43.6563C6.0264 54.8026 4.8184 67.0677 7.1721 78.9005C9.5258 90.7334 15.3355 101.603 23.8665 110.134C32.3975 118.665 43.2667 124.474 55.0995 126.828C66.9323 129.182 79.1974 127.974 90.3437 123.357C101.49 118.74 111.017 110.921 117.72 100.89C124.422 90.8584 128 79.0647 128 67C127.982 50.8274 121.549 35.3224 110.113 23.8867C98.6776 12.4509 83.1726 6.01826 67 6ZM67 0C80.2514 0 93.2051 3.92948 104.223 11.2915C115.241 18.6536 123.829 29.1176 128.9 41.3602C133.971 53.6029 135.298 67.0743 132.713 80.0711C130.127 93.0678 123.746 105.006 114.376 114.376C105.006 123.746 93.0678 130.127 80.0711 132.713C67.0743 135.298 53.6029 133.971 41.3602 128.9C29.1176 123.829 18.6536 115.241 11.2915 104.223C3.92948 93.2051 0 80.2514 0 67C0 49.2305 7.05891 32.1888 19.6238 19.6238C32.1888 7.05891 49.2305 0 67 0Z"
                  fill="currentColor"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        {!isMobile && (
          <button
            className={styles.overlay}
            onMouseMove={isMobile ? null : mouseMoveHandler}
            onClick={playPauseHandler}
            aria-label="play or pause"
          ></button>
        )}
        <ReactPlayer
          url={video.videoLink}
          ref={videoPlayerRef}
          width={"100%"}
          height={"100%"}
          className={styles.videoPlayerVideo}
          progressInterval={100}
          controls={isMobile && !isHome}
          playing={playing}
          playsinline
          onPlay={() => {
            setVideoState({ ...videoState, playing: true })
            setHasPlayed(true)
          }}
          onPause={() => setVideoState({ ...videoState, playing: false })}
          volume={volume}
          muted={muted}
          onProgress={isMobile ? () => void 0 : progressHandler}
          onEnded={() => {
            videoPlayerRef.current.seekTo(0)
            setVideoState({ ...videoState, playing: false })
            setHasPlayed(false)
          }}
          config={{
            youtube: {
              playerVars: { showinfo: 0 },
            },
          }}
        ></ReactPlayer>
        {!isMobile && (
          <Control
            ref={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
          ></Control>
        )}
        {isMobile && isHome && (
          <button
            onClick={() =>
              setVideoState({
                ...videoState,
                muted: !videoState.muted,
                volume: 1,
              })
            }
            className={muted ? styles.homeVideoMute : styles.homeVideoSound}
          >
            {muted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10.906 14.541"
              >
                <g id="Group_61" data-name="Group 61" transform="translate(0)">
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M-3496-19960.061h3.378l4.777-4.1h1.053v14.541h-1.229l-2.73-2.23-1.872-1.52H-3496Z"
                    transform="translate(3496 19964.156)"
                    fill="currentColor"
                  />
                  <ellipse
                    id="Ellipse_5"
                    data-name="Ellipse 5"
                    cx="2.337"
                    cy="2.337"
                    rx="2.337"
                    ry="2.337"
                    transform="translate(6.232 4.674)"
                    fill="currentColor"
                  />
                  <ellipse
                    id="Ellipse_6"
                    data-name="Ellipse 6"
                    cx="2.337"
                    cy="2.337"
                    rx="2.337"
                    ry="2.337"
                    transform="translate(6.232 4.674)"
                    fill="currentColor"
                  />
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 35 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_19_13)">
                  <path
                    d="M7 10.323H13.1946L21.9551 2.99268H23.8861V28.9927H21.6323L16.6259 25.0045L13.1928 22.2875H7V10.323Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22.7134 19.7148C25.0804 19.7148 26.9992 17.8439 26.9992 15.5361C26.9992 13.2283 25.0804 11.3574 22.7134 11.3574C20.3465 11.3574 18.4277 13.2283 18.4277 15.5361C18.4277 17.8439 20.3465 19.7148 22.7134 19.7148Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22.7134 19.7148C25.0804 19.7148 26.9992 17.8439 26.9992 15.5361C26.9992 13.2283 25.0804 11.3574 22.7134 11.3574C20.3465 11.3574 18.4277 13.2283 18.4277 15.5361C18.4277 17.8439 20.3465 19.7148 22.7134 19.7148Z"
                    fill="currentColor"
                  />
                </g>
                <rect
                  width="44.2055"
                  height="1.76822"
                  transform="matrix(-0.766044 -0.642788 -0.642788 0.766044 35 29)"
                  fill="currentColor"
                />
                <defs>
                  <clipPath id="clip0_19_13">
                    <rect
                      width="20"
                      height="26"
                      fill="currentColor"
                      transform="translate(7 3)"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        )}
        {!isMobile && (
          <button
            className={styles.fullScreenBtn}
            ref={fullScreenRef}
            onClick={handleClickFullscreen}
          >
            <img src={fullScreenState ? small : full} alt="full screen"></img>
          </button>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
