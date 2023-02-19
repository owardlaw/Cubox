import React, { useState } from "react";

const CubeButtons = (props) => {

  const [value, setValue] = useState('333');

  const handleChange = (event) => {

    setValue(event.target.value);
    changeCube(event.target.value);

  };

  function changeCube(cube) {
    props.setCube(cube);
    props.generateScramble(cube, props.setCcramble);
  }

  return (
    <div>
      <select id="scramble-buttons" value={value} onChange={handleChange}>
        <option id="scramble-buttons" value="222">2x2</option>
        <option id="scramble-buttons" value="333">3x3</option>
        <option id="scramble-buttons" value="444">4x4</option>
        <option id="scramble-buttons" value="555">5x5</option>
        <option id="scramble-buttons" value="666">6x6</option>
        <option id="scramble-buttons" value="777">7x7</option>
        <option id="scramble-buttons" value="sq1">Sq1</option>
        <option id="scramble-buttons" value="minx">Megaminx</option>
        <option id="scramble-buttons" value="clock">Clock</option>
        <option id="scramble-buttons" value="333fm">3x3 fm</option>
        <option id="scramble-buttons" value="333bf">3x3 bf</option>
        <option id="scramble-buttons" value="333oh">3x3 oh</option>
      </select>
      <button id="scramble-buttons" onClick={() => props.generateScramble(value, props.setCcramble)}>Next Scramble</button>
      <button id="scramble-buttons" onClick={props.deleteLastTime}>Delete Last Time</button>
    </div>
  );
}

export default CubeButtons;