import './Main.css';
import React, { useState, useRef } from "react";
import LineChart from "./components/LineChart";
import formatTime from "./components/FormatTime";
import Table from "./components/Table";

function Main() {

  const [scramble, setCcramble] = useState(null);
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const turns = ['', "'", '2'];
  const [times, setTimes] = useState([]);

  function generateScramble() {
    let scramble = [];
    for (let i = 0; i < 20; i++) {
      let move = moves[Math.floor(Math.random() * moves.length)];
      let turn = turns[Math.floor(Math.random() * turns.length)];
      scramble.push(move + turn);
    }
    // Setting state to new scamble
    setCcramble(scramble.join(' '))

  };

  // Init scramble on startup
  React.useEffect(() => {

    generateScramble()
  }, []);

  // Format time: UNIX to MM:SS:MS
  const formatTime = (unixTime) => {
    const date = new Date(unixTime);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };


  // Timer
  // Global spacebar count variable
  let spacebarCount = 0;

  const Timer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalRef = useRef();

    const handleStart = () => {
      if (!isRunning) {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      }
    };

    const handlePause = () => {
      if (isRunning) {
        setIsRunning(false);
        clearInterval(intervalRef.current);
      }
    };

    const handleReset = () => {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      setTime(0);
    };

    // Prevent spacebar from scrolling page
    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        event.preventDefault();
      }
    });


    // Spacebar event listener to control timer
    document.body.onkeyup = function (e) {
      e.preventDefault();
      if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
      ) {

        spacebarCount++;

        if (isRunning) {
          setIsRunning(false);
        } else {
          setIsRunning(true);
        }

        if (spacebarCount == 1) {
          handleStart();
        }

        if (spacebarCount == 2) {
          times.push(time);
          console.log(time);
          handlePause();
        }

        if (spacebarCount == 3) {
          handleReset();
          generateScramble();
          spacebarCount = 0;
        }
      }
    };

    return (
      <div>
        <div className="timer">
          <p id="clock">{formatTime(time)}</p>
        </div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  };

  return (
    <div className="top-container">

      <div className='header'>
        <p id="scramble">{scramble}</p>
      </div>

      <div className="grid-container">

        <div className="left-grid">
          <Table times={times} />
        </div>

        <div className="right-grid">
          <Timer />
          <button id="rescramble" onClick={generateScramble}>Re Scramble</button>
        </ div>
      </div>
    </div>
  );
}

export default Main;
