import './Main.css';
import React, { useState, useRef, useEffect } from "react";
import LineChart from "./components/LineChart";
import formatTime from "./components/FormatTime";
import Table from "./components/Table";
import Timer from "./components/Timer";
import CubeButtons from './components/CubeButtons';
import generateScramble from './components/GenerateScramble';
import { openDB } from 'idb';


function Main() {

  const [scramble, setCcramble] = useState(null);
  const [times, setTimes] = useState([]);
  const [cube, setCube] = useState("333");

  // Init scramble on startup
  React.useEffect(() => {
    generateScramble(cube, setCcramble)
  }, []);
  
    useEffect(() => {
      // Open the database and get all times
      async function getTimes() {
        const db = await openDB('time-tracker', 1, {
          upgrade(db) {
            db.createObjectStore('times', { keyPath: 'id', autoIncrement: true });
          },
        });
        const times = await db.getAll('times');
  
        // convert all db times to ints or set to null if not possible
        const intTimes = times.map((time) => {
          const parsedTime = parseInt(time.time, 10);
          return isNaN(parsedTime) ? null : parsedTime;
        });
  
        setTimes(intTimes);
      }
  
      getTimes();
    }, []);
  
     async function addTime(time) {
      // Add a new time to the database with the array index as the key
      const db = await openDB('time-tracker', 1);
      const tx = db.transaction('times', 'readwrite');
      const store = tx.objectStore('times');
      const index = times.length; // get the current length of the array as the key
      await store.add({ id: index, time }); // include the index as the key
      // setTimes([...times, { id: index, time }]); // include the new item in the state
    }
  
    // Delete all times 
    async function deleteTimes() {
      const db = await openDB('time-tracker', 1);
      const tx = db.transaction('times', 'readwrite');
      const store = tx.objectStore('times');
      await store.clear();
      setTimes([]);
    };
  

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
          <Table times={times} deleteTimes={deleteTimes}/>
        </div>

        <div className="middle-grid">
          <Timer cube={cube} times={times} setTimes={setTimes} setCcramble={setCcramble} generateScramble={generateScramble}  addTime={addTime}/>
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
