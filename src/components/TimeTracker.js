import { openDB } from 'idb';
import React, { useState, useEffect } from 'react';

function TimeTracker(props) {
  const [dbTimes, setDbTimes] = useState([]);

  useEffect(() => {
    // Open the database and get all times
    async function getTimes() {
      const db = await openDB('time-tracker', 1, {
        upgrade(db) {
          db.createObjectStore('times', { keyPath: 'id', autoIncrement: true });
        },
      });
      const dbTimes = await db.getAll('times');

      // convert all db times to ints or set to null if not possible
      const intTimes = dbTimes.map((time) => {
        const parsedTime = parseInt(time.time, 10);
        return isNaN(parsedTime) ? null : parsedTime;
      });

      setDbTimes(intTimes);
      props.setTimes(intTimes);
    }

    getTimes();
  }, []);

   async function addTime(time) {
    // Add a new time to the database with the array index as the key
    const db = await openDB('time-tracker', 1);
    const tx = db.transaction('times', 'readwrite');
    const store = tx.objectStore('times');
    const index = dbTimes.length; // get the current length of the array as the key
    await store.add({ id: index, time }); // include the index as the key
    setDbTimes([...dbTimes, { id: index, time }]); // include the new item in the state
  }


  // Delete all times 
  async function deleteTimes() {
    const db = await openDB('time-tracker', 1);
    const tx = db.transaction('times', 'readwrite');
    const store = tx.objectStore('times');
    await store.clear();
    setDbTimes([]);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target;
          const time = form.time.value;
          addTime(time);
          form.reset();
        }}
      >
        <button type="button" onClick={deleteTimes}> Delete All</button>
        <label>
          Time:
          <input type="text" name="time" />
        </label>
        <button type="submit">Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {dbTimes.map(({ id, time }) => (
            <tr key={id}>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeTracker;
