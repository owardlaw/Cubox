import './Main.css';
import React, { useState, useRef } from "react";
import LineChart from "./components/LineChart";
import formatTime from "./components/FormatTime";
import Table from "./components/Table";
import { randomScrambleForEvent } from 'https://cdn.cubing.net/js/cubing/scramble';
import { ScrambleDisplay } from "scramble-display"

function Main() {

  const [scramble, setCcramble] = useState(null);
  const [times, setTimes] = useState([]);
  const [cube, setCube] = useState("333");

  const twoByTwo = "222";
  const threeByThree = "333";
  const threeByThreeBf = "333bf";
  const threeByThreeFm = "333fm";
  const threeByThreeOh = "333oh";
  const fourByFour = "444";
  const fiveByFive = "555";
  const sixBySix = "666";
  const sevenBySeven = "777";
  const sq1 = "sq1";
  const megaminx = "minx";
  const clock = "clock";

  const generateScramble = async (cube) => {
    const newScramble = await randomScrambleForEvent(cube);
    setCcramble(newScramble.toString());
  };

  // Init scramble on startup
  React.useEffect(() => {
    generateScramble(cube)
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
          generateScramble(cube);
          spacebarCount = 0;
        }
      }
    };

    return (
      <div>
        <div className="timer">
          <p id="clock">{formatTime(time)}</p>
        </div>
      </div>
    );
  };

  function changeCube(cube) {
    setCube(cube);
    generateScramble(cube);
  }

  return (
    <div className="top-container">

      <div className='header'>
        <p id="scramble">{scramble}</p>
        <div>
          <button id="scramble-buttons" onClick={() => changeCube(twoByTwo)}>2x2</button>
          <button id="scramble-buttons" onClick={() => changeCube(threeByThree)}>3x3</button>
          <button id="scramble-buttons" onClick={() => changeCube(fourByFour)}>4x4</button>
          <button id="scramble-buttons" onClick={() => changeCube(fiveByFive)}>5x5</button>
          <button id="scramble-buttons" onClick={() => changeCube(sixBySix)}>6x6</button>
          <button id="scramble-buttons" onClick={() => changeCube(sevenBySeven)}>7x7</button>
          <button id="scramble-buttons" onClick={() => changeCube(sq1)}>Sq1</button>
          <button id="scramble-buttons" onClick={() => changeCube(megaminx)}>Pyraminx</button>
          <button id="scramble-buttons" onClick={() => changeCube(clock)}>Clock</button>
          <button id="scramble-buttons" onClick={() => changeCube(threeByThreeFm)}>3x3 fm</button>
          <button id="scramble-buttons" onClick={() => changeCube(threeByThreeBf)}>3x3 bf</button>
          <button id="scramble-buttons" onClick={() => changeCube(threeByThreeOh)}>3x3 oh</button>
        </div>
        <div>
          <button id="scramble-buttons" onClick={() => generateScramble(cube)}>Next Scramble</button>
        </div>
      </div>

      <div className="grid-container">
        <div className="left-grid">
          <Table times={times} />
        </div>

        <div className="middle-grid">
          <Timer />
        </div>

        <div className="right-grid">
        <scramble-display
            id="scramble-display"
            scramble={scramble}
            event={cube}
            visualization="3D"
          ></scramble-display>   
      </div>  
      </div>
    </div>
  );
}

export default Main;
