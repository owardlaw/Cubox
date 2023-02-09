import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      setStartTime(Date.now());
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  let minutes = Math.floor(elapsedTime / (1000 * 60));
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor(elapsedTime % 1000);

  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }

  if (milliseconds < 10) {
    milliseconds = '00' + String(milliseconds);
  } else

  if (milliseconds < 100) {
    milliseconds = '0' + String(milliseconds);
  }

  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }

  let spacebarCount = 0;

  document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32    
    ) {
      spacebarCount++;
      console.log("Spacebar pressed")
      if (isRunning) {
        setIsRunning(false);
      } else {
        setIsRunning(true);
      }

      if (spacebarCount == 2) {
        reset();
        spacebarCount = 0;
      }
    }
  };


  return (
    <div className="timer">
      <h1>Timer</h1>
      <p>
        {minutes}:{seconds}.{milliseconds}
      </p>
      {isRunning ? (
        <button onClick={() => setIsRunning(false)}>Stop</button>
      ) : (
        <button onClick={() => setIsRunning(true)}>Start</button>
      )}

      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Timer;
