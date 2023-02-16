import React, { useState, useRef } from "react";
import formatTime from "./FormatTime";
import generateScramble from "./GenerateScramble";

// Timer
// Global spacebar count variable
let spacebarCount = 0;

const Timer = (cube, times) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalRef = useRef();

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    };

    const handlePause = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setTime(0);
    };

    // Prevent spacebar from scrolling page
    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            event.preventDefault();
        }
    });


    // Spacebar event listener to control timer
    document.body.onkeyup = function (e) {
        e.preventDefault();
        if (e.key == " " ||
            e.code == "Space" ||
            e.keyCode == 32
        ) {

            spacebarCount++;

            if (isRunning) {
                setIsRunning(false);
            } else {
                setIsRunning(true);
            }

            if (spacebarCount == 1) {
                handleStart();
            }

            if (spacebarCount == 2) {
                times.push(time);
                console.log(time);
                handlePause();
            }

            if (spacebarCount == 3) {
                handleReset();
                generateScramble(cube);
                spacebarCount = 0;
            }
        }
    };

    return (
        <div>
            <div className="timer">
                <p id="clock">{formatTime(time)}</p>
            </div>
        </div>
    );
};


export default Timer;