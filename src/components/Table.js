import React from "react";
import formatTime from "./FormatTime";
import LineChart from "./LineChart";

// Updating table 
const Table = ({ times }) => {

    let minTime = "--:--.---";;
    let averageTime = "--:--.---";;
    let ao5 = "--:--.---";
    let ao12 = "--:--.---";
    let totalCompletedSolves = times.length;

    if (times.length !== 0) {
        minTime = formatTime(Math.min(...times));
        averageTime = formatTime(times.reduce((a, b) => a + b) / times.length);

    }
    
    if (times.length >= 5) {
        ao5 = formatTime(times.slice(-5).reduce((acc, cur) => acc + cur, 0) - Math.min(...times.slice(-5)) - Math.max(...times.slice(-5)) / 3);
    }

    if (times.length >= 12) {
        ao12 = formatTime(times.slice(-12).reduce((acc, cur) => acc + cur, 0) - Math.min(...times.slice(-12)) - Math.max(...times.slice(-12)) / 10);
    }

    // Only show last 10 times
    const amountofTimesShown = 15;
    const lastTenTimes = times.slice(-amountofTimesShown).reverse();

    return (

        <div className="solve-stats">
            <table className="solve-stats">
                <tbody>
                    <tr>
                        <th>Best Time: {minTime}</th>
                    </tr>
                    <tr>
                        <th>Best ao5: {ao5}</th>
                    </tr>
                    <tr>
                        <th>Best ao12: {ao12}</th>
                    </tr>
                    <tr>
                        <th>Total avg: {averageTime}</th>
                    </tr >
                </tbody>
                <thead>
                    <tr>
                        <th>Completed Solves: {totalCompletedSolves}</th>
                    </tr>
                </thead>
            </table>

            <table className="solve-stats" id="times-displayed">
                <tbody>
                    {lastTenTimes.map((time, index) => (
                        <tr key={index}>
                            <td>{formatTime(time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />
            <div className="chart">
                <LineChart data={times} />
            </div>
        </div >
    );
};

export default Table;