// select all necessary elements
const player = document.getElementById("player");
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
const speedBtn = document.getElementById("speed-container");
const speedOptionsContainer = document.getElementById("speed-options");
const allSpeedOptions = document.querySelectorAll(".speed__option");
const currentSpeed = document.getElementById("current-speed");
const fullScreenIcon = document.getElementById("fullscreen-icon");

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

// skip video to a specific point using the dragbar and update related time
const progressVideo = (event) => {
  const newTime = event.offsetX / videoDragbarContainer.offsetWidth;
  videoDragbar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

// show volume mute icon
const showMuteIcon = () => {
  volumeBtn.classList.replace("ri-volume-up-fill", "ri-volume-mute-fill");
};

// show unmute icon
const showUnmuteIcon = () => {
  volumeBtn.classList.replace("ri-volume-mute-fill", "ri-volume-up-fill");
};

// functionality to adjust volume
let lastVolume;
const adjustVolume = (event) => {
  let newVolume = event.offsetX / volumeBarContainer.offsetWidth;

  //   round off volume 0.1 and 0.9 for better ui experience and convinience in styling
  if (newVolume < 0.1) {
    newVolume = 0;
  }

  if (newVolume > 0.9) {
    newVolume = 1;
  }

  volumeBar.style.width = `${newVolume * 100}%`;
  video.volume = newVolume;

  if (newVolume === 0) {
    showMuteIcon();
  } else {
    showUnmuteIcon();
  }

  lastVolume = newVolume;
};

// mute/unmute volume using volume icons
const toggleVolumeIcons = () => {
  if (video.volume) {
    lastVolume = video.volume;
    showMuteIcon();
    volumeBar.style.width = 0;
    video.volume = 0;
  } else {
    video.volume = lastVolume;
    showUnmuteIcon();
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
};

// show-hide speed options
const toggleSpeedOptions = () => {
  speedOptionsContainer.classList.toggle("toggle__speed__options");
};

// adjust playback speed based on the speed selected from speed-options

const adjustPlaybackSpeed = (event) => {
  allSpeedOptions.forEach((speedOption) => {
    speedOption.addEventListener("click", (event) => {
      const selectedSpeed = parseFloat(speedOption.textContent).toFixed(1);
      video.playbackRate = selectedSpeed;
      currentSpeed.textContent = `${selectedSpeed}x`;
    });
  });
};

// Function to enter fullscreen
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari, and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }
}

// Function to exit fullscreen
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // IE/Edge
    document.msExitFullscreen();
  }
}

let fullscreen = false;

const toggleFullScreen = () => {
  !fullscreen ? enterFullscreen(player) : exitFullscreen();
  fullscreen = !fullscreen;
};

// handle all events
playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateVideoTime);
video.addEventListener("canplay", updateVideoTime);
videoDragbarContainer.addEventListener("click", progressVideo);
volumeBarContainer.addEventListener("click", adjustVolume);
volumeBtn.addEventListener("click", toggleVolumeIcons);
speedBtn.addEventListener("click", toggleSpeedOptions);
speedBtn.addEventListener("click", adjustPlaybackSpeed);
fullScreenIcon.addEventListener("click", toggleFullScreen);
