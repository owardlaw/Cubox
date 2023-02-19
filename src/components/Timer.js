import React, { useState, useRef } from "react";
import formatTime from "./FormatTime";
import generateScramble from "./GenerateScramble";

// Timer
// Global spacebar count variable
let spacebarCount = 0;
let spacebarDown = 0;
let lastPress = 0;

const Timer = (props) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [timerColor, setTimerColor] = useState("");
    const intervalRef = useRef();

    const green = "#87ab69";
    const red = "#f46d75";

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
    document.body.onkeydown = function (e) {
        e.preventDefault();
        if (
            e.code == "Space" && lastPress === 0
        ) {
            lastPress = 1;
            if (spacebarDown == 0) {
                spacebarDown = 1;
                setTimerColor(red);
            } else if (spacebarDown == 1) {
                spacebarDown = 2;
                props.setTimes([...props.times, time]);
                props.addTime(time);
                handlePause();
                setTimerColor("");
            } else if (spacebarDown == 2) {
                spacebarDown = 0;
            }
        }
    };


    // Spacebar event listener to control timer
    document.body.onkeyup = function (e) {
        e.preventDefault();
        if (e.key == " " && lastPress === 1 ||
            e.code == "Space" && lastPress === 1 ||
            e.keyCode == 32 && lastPress === 1
        ) {
            lastPress = 0;
            spacebarCount++;

            if (isRunning) {
                setIsRunning(false);
            } else {
                setIsRunning(true);
            }

            if (spacebarCount == 1) {
                handleStart();
                setTimerColor(green);
            } else if (spacebarCount == 3) {
                handleReset();
                props.generateScramble(props.cube, props.setCcramble);
                spacebarCount = 0;
            }
        }
    };

    return (
        <div>
            <div className="timer">
                <p id="clock" style={{color: timerColor}}>{formatTime(time)}</p>
            </div>
        </div>
    );
};


export default Timer;