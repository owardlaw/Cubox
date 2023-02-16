import React from "react";
import { randomScrambleForEvent } from 'https://cdn.cubing.net/js/cubing/scramble';

const generateScramble = async (cube, setCcramble) => {
    const newScramble = await randomScrambleForEvent(cube);
    setCcramble(newScramble.toString());
  };

export default generateScramble;