const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
  audio = new Audio(), // Create a single audio instance
  pressedKeys = []; // Array to keep track of pressed keys

// Preload all audio files
const audioFiles = {};
pianoKeys.forEach((key) => {
  const keyName = key.dataset.key;
  audioFiles[keyName] = new Audio(`tunes/${keyName}.wav`);
});

const playTune = (key) => {
  audioFiles[key].currentTime = 0; // Rewind audio to start
  audioFiles[key].play(); // Play the audio file for the given key
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

const handleKeyDown = (e) => {
  const key = e.key.toLowerCase();
  if (allKeys.includes(key) && !pressedKeys.includes(key)) {
    playTune(key);
    pressedKeys.push(key);
  }
};

const handleKeyUp = (e) => {
  const key = e.key.toLowerCase();
  const index = pressedKeys.indexOf(key);
  if (index !== -1) {
    pressedKeys.splice(index, 1);
  }
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key);
  key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
