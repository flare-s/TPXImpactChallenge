const time = document.querySelector('.time')
const mainButton = document.querySelector('#control-button')
const clearButton = document.querySelector('#reset-button')
const stopwatch = { 
    elapsedTime: 0,
    startTime: 0,
    intervalId: null
}


function convertMsToTime(milliseconds) {
    // Calculate time
    let ms = Math.floor((milliseconds%1000)/10);
    let seconds = Math.floor((milliseconds / 1000)%60);
    let minutes = Math.floor((seconds / 60)%60);
    let hours = Math.floor(minutes / 60);
  
    // 24 hours format
    // hours = hours % 24;
    return {ms, seconds, minutes, hours};
}

mainButton.addEventListener('click', () => {
  if (mainButton.innerHTML === 'Start') {
    startStopwatch();
    mainButton.innerHTML = 'Pause';
  } else {
    //Save the time, in case we start without resetting
    stopwatch.elapsedTime += Date.now() - stopwatch.startTime;
    // Stop increasing the stopwatch
    clearInterval(stopwatch.intervalId);
    mainButton.innerHTML = 'Start';
  }
})

clearButton.addEventListener('click', () => {
  //Reset the stopwatch
  stopwatch.elapsedTime = 0;
  stopwatch.startTime = 0;
  displayTime(0, 0, 0, 0);
  mainButton.innerHTML = 'Start'
  stopwatch.intervalId && clearInterval(stopwatch.intervalId);
})

function startStopwatch() {
  //reset start time
  stopwatch.startTime = Date.now();
  //run `setInterval()` and save id
  stopwatch.intervalId = setInterval(() => {
    //calculate elapsed time
   const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime;
    const {ms, seconds, minutes, hours} = convertMsToTime(elapsedTime)
    //display time
    displayTime(hours, minutes, seconds, ms);
  }, 50);
}

// Format the time
function displayTime(hour, minutes, seconds, milliseconds) {
  const leadZeroTime = [hour, minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time);
  time.innerHTML = leadZeroTime.join(':');
}