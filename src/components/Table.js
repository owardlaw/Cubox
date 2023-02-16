import React from "react";
import formatTime from "./FormatTime";
import LineChart from "./LineChart";

const Table = ({ times }) => {
    let minTime = "--:--.---";
    let averageTime = "--:--.---";
    let ao5 = "--:--.---";
    let ao12 = "--:--.---";
    let totalCompletedSolves = times.length;

    if (times.length !== 0) {
        minTime = formatTime(Math.min(...times));
        averageTime = formatTime(
            times.reduce((a, b) => a + b) / times.length
        );
    }

    if (times.length >= 5) {
        ao5 = formatTime(
            times
                .slice(-5)
                .reduce((acc, cur) => acc + cur, 0) -
            (Math.min(...times.slice(-5)) + Math.max(...times.slice(-5))) / 3
        );
    }

    if (times.length >= 12) {
        ao12 = formatTime(
            times
                .slice(-12)
                .reduce((acc, cur) => acc + cur, 0) -
            (Math.min(...times.slice(-12)) + Math.max(...times.slice(-12))) / 10
        );
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
                        <th id="table-font">Best ao5: {ao5}</th>
                    </tr>
                    <tr>
                        <th id="table-font">Best ao12: {ao12}</th>
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

            <div className="chart">
                <LineChart data={times} />
            </div>
        </div>
    );
};

export default Table;
