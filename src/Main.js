import './Main.css';
import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";

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

  // Updating table 
  const Table = ({ times }) => {

    let minTime;
    let averageTime;
    let ao5;
    let ao12;
    let totalCompletedSolves = times.length;

    if (times.length !== 0) {
      minTime = formatTime(Math.min(...times));
      averageTime = formatTime(times.reduce((a, b) => a + b) / times.length);

    } else {
      minTime = "No times";
      averageTime = "No times";
    }

    if (times.length >= 5) {
      // ao5 = (times.splice(-5).reduce((a, b) => a + b, 0)) - Math.min(...times.splice(-5)) - Math.max(...times.splice(-5)) / 3;
      ao5 = formatTime(times.slice(-5).reduce((acc, cur) => acc + cur, 0) - Math.min(...times.slice(-5)) - Math.max(...times.slice(-5)) / 3);
    }

    if (times.length >= 12) {
      ao12 = formatTime(times.slice(-12).reduce((acc, cur) => acc + cur, 0) - Math.min(...times.slice(-12)) - Math.max(...times.slice(-12)) / 10);
    }

    // Only show last 10 times
    const amountofTimesShown = 15;
    const lastTenTimes = times.slice(-amountofTimesShown).reverse();

    return (

      <div className="solve-stats">
        <table className="solve-stats">
        <table className="solve-stats">
          <tr>
            <th>Min: {minTime}</th>
          </tr>
          <tr>
            <th>ao5: {ao5}</th>
          </tr>
          <tr>
            <th>ao12: {ao12}</th>
          </tr>
          <tr>
            <th>Avg: {averageTime}</th>
          </tr >
        </table>
        <br />
          <thead>
            <tr>
              <th>Completed Solves: {totalCompletedSolves}</th>
            </tr>
          </thead>
          <tbody>
            {lastTenTimes.map((time, index) => (
              <tr key={index}>
                <td>{formatTime(time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className="chart">
          <LineChart  data={times}/>
        </div>
      </div >
    );
  };



  // Timer
  // Global spacebar count variable
  let spacebarCount = 0;
  let lastTime ;

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

        if (spacebarCount == 2) {
          setTimes([...times, elapsedTime]);
          generateScramble();
        }

        if (spacebarCount == 3) {
          reset();
          spacebarCount = 0;
          times.push(elapsedTime);

          if (elapsedTime !== 0) {
            lastTime = elapsedTime;
          }
        }
      }
    };



    return (
      <div className="timer">
        <p id="clock">{minutes}:{seconds}.{milliseconds}</p>
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
