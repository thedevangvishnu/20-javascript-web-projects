// select all necessary elements
const video = document.getElementById("video");
const videoDragbarContainer = document.getElementById(
  "video-dragbar-container"
);
const videoDragbar = document.getElementById("video-dragbar");
const playPauseBtn = document.getElementById("play-pause");
const volumeBtn = document.getElementById("volume-icon");
const volumeBarContainer = document.getElementById("volume-bar-container");
const volumeBar = document.getElementById("volume-bar");
const videoSpeed = document.getElementById("video-speed");

const currentVideoTime = document.getElementById("current-time");
const totalVideoTime = document.getElementById("total-time");

// show play icon
const showPlayIcon = () => {
  playPauseBtn.classList.replace("ri-pause-fill", "ri-play-fill");
  playPauseBtn.setAttribute("title", "Play");
};

// pause and play functionality
const togglePlayPause = () => {
  if (video.paused) {
    video.play();
    playPauseBtn.classList.replace("ri-play-fill", "ri-pause-fill");
    playPauseBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
};

playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);
video.addEventListener("ended", showPlayIcon);

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

// skip video to a specific point using the dragbar and update related time
const progressVideo = (event) => {
  const newTime = event.offsetX / videoDragbarContainer.offsetWidth;
  videoDragbar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

videoDragbarContainer.addEventListener("click", progressVideo);

// toggle volume icons

// functionality to adjust volume
const adjustVolume = (event) => {
  let newVolume = event.offsetX / volumeBarContainer.offsetWidth;

  //   round off volume 0.1 and 0.9 for better ui experience and convinience in styling
  if (newVolume < 0.1) {
    newVolume = 0;
  }

  if (newVolume > 0.9) {
    newVolume = 1;
  }
  console.log(newVolume);

  volumeBar.style.width = `${newVolume * 100}%`;
  video.volume = newVolume;

  if (newVolume === 0) {
    volumeBtn.classList.replace("ri-volume-up-fill", "ri-volume-mute-fill");
  } else {
    volumeBtn.classList.replace("ri-volume-mute-fill", "ri-volume-up-fill");
  }
};

volumeBarContainer.addEventListener("click", adjustVolume);
