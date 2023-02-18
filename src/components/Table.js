import React from "react";
import formatTime from "./FormatTime";

const Table = ({ times, deleteTimes }) => {
    let minTime = "--:--.---";
    let averageTime = "--:--.---";
    let ao5 = "--:--.---";
    let ao12 = "--:--.---";
    let totalCompletedSolves = times.length;

    const [bestAo5, setBestAo5] = React.useState("--:--.---");

    if (times.length !== 0) {
        minTime = formatTime(Math.min(...times));
        averageTime = formatTime(
            times.reduce((a, b) => a + b) / times.length
        );
    }

    if (times.length >= 5) {
        const last5Solves = times.slice(-5);
        const minSolve = Math.min(...last5Solves);
        const maxSolve = Math.max(...last5Solves);
        const sumWithoutMinMax = last5Solves.reduce((acc, cur) => acc + cur, 0) - minSolve - maxSolve;
        ao5 = formatTime(sumWithoutMinMax / 3);

        if (bestAo5 === "--:--.---") {
            setBestAo5(ao5);
        } else {

            if (ao5 < bestAo5) {
                setBestAo5(ao5);
            }
        }
    }

    if (times.length >= 12) {
        const last12Solves = times.slice(-12);
        const minSolve = Math.min(...last12Solves);
        const maxSolve = Math.max(...last12Solves);
        const sumWithoutMinMax = last12Solves.reduce((acc, cur) => acc + cur, 0) - minSolve - maxSolve;
        ao12 = formatTime(sumWithoutMinMax / 10);
    }

    const amountOfTimesShown = times.length;
    const lastTenTimes = times.slice(-amountOfTimesShown).reverse();

    return (
        <div className="solve-stats">
            <table className="solve-stats">
                <tbody className="table-font">
                    <tr>
                        <th id="table-font">Best Time: {minTime}</th>
                    </tr>
                    <tr>
                        <th id="table-font">Current ao5: {ao5}</th>
                    </tr>
                    <tr>
                        <th id="table-font">BEST ao5: {bestAo5}</th>
                    </tr>
                    <tr>
                        <th id="table-font">Current ao12: {ao12}</th>
                    </tr>
                    <tr>
                        <th id="table-font">Total avg: {averageTime}</th>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th id="table-font">Completed Solves: {totalCompletedSolves}</th>
                    </tr>
                </thead>
            </table>

            <button id="scramble-buttons" onClick={deleteTimes}>Clear All Times</button>

            <div className="scroll-table">
                <table className="solve-stats" id="times-displayed">
                    <tbody>
                        {lastTenTimes.map((time, index) => (
                            <tr id="table-font" key={index}>
                                <td id="index-text">{totalCompletedSolves - index}</td>
                                <td>{formatTime(time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
