import React from "react";
import { randomScrambleForEvent } from 'cubing/scramble';

// This version of import breaks the build but loads faster
// import { randomScrambleForEvent } from 'https://cdn.cubing.net/js/cubing/scramble';


const generateScramble = async (cube, setCcramble) => {
    const newScramble = await randomScrambleForEvent(cube);
    setCcramble(newScramble.toString());
  };

export default generateScramble;