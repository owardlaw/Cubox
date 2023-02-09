import './Main.css';
import React, { useState, useEffect } from "react";

function Main() {

  const [scramble, setCcramble] = useState(null);

  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const turns = ['', "'", '2'];

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

    document.body.onkeyup = function (e) {
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
          generateScramble();
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

  // Table 
  const Table = () => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [userTime, setUserTime] = useState("");

    const handleSubmit = () => {
      setTimeEntries([Number(userTime).toFixed(3), ...timeEntries.slice(0, 4)]);
      setUserTime("");
    };

    const recentTime = timeEntries.slice(-1)[0] || "-";

    const timeAverageOf5 = (index) => {
      let lastFive = timeEntries.slice(index, index + 5);
      return lastFive.length === 5
        ? lastFive.reduce((sum, entry) => sum + parseFloat(entry), 0) / 5
        : "-";
    }

    const timeAverageOf12 = (index) => {
      let lastTwelve = timeEntries.slice(index, index + 12);
      return lastTwelve.length === 12
        ? lastTwelve.reduce((sum, entry) => sum + parseFloat(entry), 0) / 12
        : "-";
    }

    const timeEntriesToShow = timeEntries.slice(0, 5);

    return (
      <div>
        <input
          type="text"
          value={userTime}
          onChange={(e) => setUserTime(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>ao5</th>
              <th>ao12</th>
            </tr>
          </thead>
          <tbody>
            {timeEntriesToShow.map((entry, index) => (
              <tr key={index}>
                <td>{entry}</td>
                <td>{timeAverageOf5(index)}</td>
                <td>{timeAverageOf12(index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <Table className="left-container" />
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
