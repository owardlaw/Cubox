import React from "react";

const CubeButtons = (props) => {

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

  function changeCube(cube) {
    props.setCube(cube);
    props.generateScramble(cube, props.setCcramble);
  }

  return (
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
  );
}

export default CubeButtons;