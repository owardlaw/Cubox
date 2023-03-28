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

  // Add a time to the database
  async function addTime(time) {
    const db = await openDB(dbName, 1);
    const tx = db.transaction(dbObjectStore, 'readwrite');
    const store = tx.objectStore(dbObjectStore);
    const index = Math.floor(Math.random() * 1000000); // generate a random key
    await store.add({ id: index, time }); // include the index as the key
    const times = await db.getAll(dbObjectStore);
    const intTimes = times.map((time) => {
      const parsedTime = parseInt(time.time, 10);
      return isNaN(parsedTime) ? null : parsedTime;
    });
    setTimes(intTimes);
  }

  // Delete the last time recorded
  async function deleteLastTime() {
    const db = await openDB(dbName, 1);
    const tx = db.transaction(dbObjectStore, 'readwrite');
    const store = tx.objectStore(dbObjectStore);
    const key = await store.getAllKeys();
    await store.delete(key[key.length - 1]); // remove the last time object
    const times = await db.getAll(dbObjectStore);
    const intTimes = times.map((time) => {
      const parsedTime = parseInt(time.time, 10);
      return isNaN(parsedTime) ? null : parsedTime;
    });
    setTimes(intTimes);
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

      {/* Cont 1 */}
      <div className='header'>
        <CubeButtons cube={cube} setCube={setCube} generateScramble={generateScramble} setCcramble={setCcramble} deleteLastTime={deleteLastTime} scramble={scramble} />
      </div>

      {/* Cont 2 */}
      <div className='timer-container'>
        <Timer cube={cube} times={times} setTimes={setTimes} setCcramble={setCcramble} generateScramble={generateScramble} addTime={addTime} setCube={setCube} deleteLastTime={deleteLastTime} scramble={scramble} />
      </div>

      {/* Cont 3 */}
        <div className="grid-container">
          <div className='grid-item-table'>
            <Table times={times} deleteTimes={deleteTimes} />
          </div>
          <div className='grid-item-chart'>
            <div className='chart'>
              <LineChart id="chart" data={times} />
            </div>
          </div>
          <div className='grid-item-scramble'>
            <scramble-display
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
