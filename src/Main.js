import './Main.css';
import React, { useState } from "react";
import Table from './components/dataTab';


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

  return (
    <div className="container">

      <div className="top-container">
          <h1>Scramble Generator</h1>
          <p>{scramble}</p>
          <button onClick={generateScramble}>Re Scramble</button>
      </div>

      <Table className="left-container"/>
    </div>
  );
}

export default Main;
