import './Main.css';
import React, { useState, useRef } from "react";
import LineChart from "./components/LineChart";
import formatTime from "./components/FormatTime";
import Table from "./components/Table";
import Timer from "./components/Timer";
import CubeButtons from './components/CubeButtons';
import generateScramble from './components/GenerateScramble';
import TimeTracker from './components/TimeTracker';

function Main() {

  const [scramble, setCcramble] = useState(null);
  const [times, setTimes] = useState([]);
  const [cube, setCube] = useState("333");

  // Init scramble on startup
  React.useEffect(() => {
    generateScramble(cube, setCcramble)
  }, []);


  return (
    <div className="top-container">

      <div className='header'>
        <p id="scramble">{scramble}</p>
        <CubeButtons setCube={setCube} generateScramble={generateScramble} setCcramble={setCcramble}/>
        <div>
          <button id="scramble-buttons" onClick={() => generateScramble(cube, setCcramble)}>Next Scramble</button>
        </div>
      </div>

      <div className="grid-container">
        <div className="left-grid">
          <Table times={times} />
        </div>

        <div className="middle-grid">
          <Timer cube={cube} times={times} setTimes={setTimes} setCcramble={setCcramble} generateScramble={generateScramble}/>
          <TimeTracker times={times} setTimes={setTimes}/>
        </div>

        <div className="right-grid">
          <scramble-display
            id="scramble-display"
            scramble={scramble}
            event={cube}
            visualization="3D"
          ></scramble-display>

          <div className="chart">
            <LineChart data={times} />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Main;
