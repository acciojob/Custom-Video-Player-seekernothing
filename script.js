// Get all the necessary DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play/pause button
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Function to skip forward or backward
function skip() {
  const skipValue = parseFloat(this.dataset.skip); // Get the skip value from the button
  video.currentTime += skipValue;
}

// Function to handle range updates (volume and playback speed)
function handleRangeUpdate() {
  video[this.name] = this.value; // Update video property based on input name (volume/playbackRate)
}

// Function to handle progress bar updates
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Function to scrub the video using the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay); // Play/pause on video click
video.addEventListener('play', updateButton); // Update button on play
video.addEventListener('pause', updateButton); // Update button on pause
video.addEventListener('timeupdate', handleProgress); // Update progress bar

toggle.addEventListener('click', togglePlay); // Play/pause on button click

skipButtons.forEach(button => button.addEventListener('click', skip)); // Skip forward/backward

ranges.forEach(range => range.addEventListener('input', handleRangeUpdate)); // Volume/playback speed adjustments

let mousedown = false; // To track whether mouse is pressed
progress.addEventListener('click', scrub); // Scrub on click
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // Scrub on mouse move if mouse is down
progress.addEventListener('mousedown', () => (mousedown = true)); // Set mousedown to true
progress.addEventListener('mouseup', () => (mousedown = false)); // Set mousedown to false
