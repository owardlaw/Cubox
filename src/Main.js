import './Main.css';
import React, { useState, useRef, useEffect } from "react";
import LineChart from "./components/LineChart";
import Table from "./components/Table";
import Timer from "./components/Timer";
import CubeButtons from './components/CubeButtons';
import generateScramble from './components/GenerateScramble';
import { openDB } from 'idb';
import { ScrambleDisplay } from "scramble-display"


function Main() {

  const [scramble, setCcramble] = useState(null);
  const [times, setTimes] = useState([]);
  const [cube, setCube] = useState("333");

  // Init scramble on startup
  React.useEffect(() => {
    generateScramble(cube, setCcramble)
  }, []);

  // Define the database and object store names based on the cube state
  const dbName = cube + "times";
  const dbObjectStore = cube;

  // Get the times associated with the current cube state
  async function getTimes() {
    const db = await openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(dbObjectStore, { keyPath: 'id', autoIncrement: true });

      },
    });
    const times = await db.getAll(dbObjectStore);

    // convert all db times to ints or set to null if not possible
    const intTimes = times.map((time) => {
      const parsedTime = parseInt(time.time, 10);
      return isNaN(parsedTime) ? null : parsedTime;
    });

    setTimes(intTimes);
  }

  // Retrieve the initial times on startup and whenever the cube state changes
  useEffect(() => {
    getTimes();
  }, [cube]);

  async function addTime(time) {
    // Add a new time to the database with the array index as the key
    const db = await openDB(dbName, 1);
    const tx = db.transaction(dbObjectStore, 'readwrite');
    const store = tx.objectStore(dbObjectStore);
    const index = times.length; // get the current length of the array as the key
    await store.add({ id: index, time }); // include the index as the key
  }

  // Delete all times 
  async function deleteTimes() {
    const db = await openDB(dbName, 1);
    const tx = db.transaction(dbObjectStore, 'readwrite');
    const store = tx.objectStore(dbObjectStore);
    await store.clear();
    setTimes([]);
  };


  return (
    <div className="top-container">

      <div className='header'>
        <p id="scramble">{scramble}</p>
        <CubeButtons setCube={setCube} generateScramble={generateScramble} setCcramble={setCcramble} />
        <div>
          <button id="scramble-buttons" onClick={() => generateScramble(cube, setCcramble)}>Next Scramble</button>
        </div>
      </div>

      <div className="grid-container">
        <div className="left-grid">
          <Table times={times} deleteTimes={deleteTimes} />
        </div>

        <div className="middle-grid">
          <Timer cube={cube} times={times} setTimes={setTimes} setCcramble={setCcramble} generateScramble={generateScramble} addTime={addTime} />
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
