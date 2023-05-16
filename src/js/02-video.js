import Vimeo from '@vimeo/player';
const throttle = require('lodash.throttle');

const LOCAL_STORAGE_KEY_CURRENT_TIME = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

let savedCurrentTime = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_TIME));

player.setCurrentTime(savedCurrentTime || 0)

const onThrottleSavingCurrentTime = throttle(currentTime => {
    savedCurrentTime = currentTime.seconds;
    
    localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_TIME, JSON.stringify(savedCurrentTime))
}, 1000);

player.on('timeupdate', onThrottleSavingCurrentTime);