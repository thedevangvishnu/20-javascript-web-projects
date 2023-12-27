// select all necessary elements
const video = document.getElementById("video");
const videoDragbarContainer = document.getElementById(
  "video-dragbar-container"
);
const videoDragbar = document.getElementById("video-dragbar");
const playPauseBtn = document.getElementById("play-pause");
const volumeBarContainer = document.getElementById("volume-bar-container");
const volumeBar = document.getElementById("volume-bar");
const videoSpeed = document.getElementById("video-speed");

const currentVideoTime = document.getElementById("current-time");
const totalVideoTime = document.getElementById("total-time");

// pause and play functionality
const togglePlayPause = () => {
  if (video.paused) {
    video.play();
    playPauseBtn.classList.replace("ri-play-fill", "ri-pause-fill");
    playPauseBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    playPauseBtn.classList.replace("ri-pause-fill", "ri-play-fill");
    playPauseBtn.setAttribute("title", "Play");
  }
};

playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);

// show play icon again when the video has ended

// display time in desired output
const displayTimeCorrectly = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;

  return `${minutes}:${seconds}`;
};

// update the time of the video
const updateVideoTime = () => {
  // update the video dragbar as the video plays
  videoDragbar.style.width = `${(video.currentTime / video.duration) * 100}%`;

  currentVideoTime.textContent = displayTimeCorrectly(video.currentTime);
  totalVideoTime.textContent = displayTimeCorrectly(video.duration);
};

video.addEventListener("timeupdate", updateVideoTime);
video.addEventListener("canplay", updateVideoTime);
