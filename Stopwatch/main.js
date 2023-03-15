'use strict';

/*global startTime*/
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getUTCHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).slice(0,1);
    timer.textContent = `${h}:${m}:${s}:${ms}`;
    
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  
  function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }
  
  setButtonStateInitial();
  
  start.addEventListener('click',() => {
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  
  stop.addEventListener('click',() => {
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
  
  reset.addEventListener('click',() => {
    setButtonStateInitial();
    timer.textContent = '0:0:0:0';
    elapsedTime = 0;
  });
  
}