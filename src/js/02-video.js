import Vimeo from '@vimeo/player';
const throttle = require('lodash.throttle');

const LOCAL_STORAGE_KEY_CURRENT_TIME = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

let savedCurrentTime = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_TIME)) || [];

player.setCurrentTime(savedCurrentTime.seconds - 2 || 0)

const onThrottleSavingCurrentTime = throttle(currentTime => {
    console.log(currentTime)
    saveCurrentTimeToLocalStorage(currentTime)
}, 1000);

function saveCurrentTimeToLocalStorage(currentTime) {
    savedCurrentTime = currentTime;
    
    localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_TIME, JSON.stringify(savedCurrentTime))
}



player.on('timeupdate', onThrottleSavingCurrentTime);

