import './Main.css';
import React, { useState, useEffect } from "react";

// This simulates the data I want to display in the table
let times = [];

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

  // Updating table 
  const Table = ({ times }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => (
            <tr key={index}>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };



  // Timer
  // Global spacebar count variable
  let spacebarCount = 0;

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

    // Prevent spacebar from scrolling page
    document.addEventListener("keydown", function(event) {
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

        let time = minutes + ":" + seconds + "." + milliseconds;


        spacebarCount++;
        if (isRunning) {
          setIsRunning(false);
        } else {
          setIsRunning(true);
        }

        if (spacebarCount == 2) {
          setTimes([...times, time]);
          generateScramble();
        }

        if (spacebarCount == 3) {
          reset();
          spacebarCount = 0;
          times.push(time);
    
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

  return (
    <div className="top-container">
      <h1>Scramble Generator</h1>
      <p>{scramble}</p>
      <button id="rescramble" onClick={generateScramble}>Re Scramble</button>

      <div className="grid-container">

        <div className="left-grid">
          {/* This is the area I want the table to be added to */}
          <Table times={times} />
        </div>

        <div className="right-grid">
          <p> Right area</p>
          <Timer className="right-container" />
        </ div>

      </div>
    </div>
  );
}

export default Main;
