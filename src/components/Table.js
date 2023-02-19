import React from "react";
import formatTime from "./FormatTime";
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: "#2e3233",
    // border: '1px solid #2e3233',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    color: "rgb(207, 207, 207)",
}));

const Table = ({ times, deleteTimes }) => {
    let minTime = "--:--.--";
    let maxTime ="--:--.--";
    let averageTime = "--:--.--";
    let ao5 = "--:--.--";
    let ao12 = "--:--.--";
    let bestAo5 = "--:--.--";
    let bestAo12 = "--:--.--";
    let totalCompletedSolves = times.length;

    if (times.length !== 0) {
        minTime = formatTime(Math.min(...times));
        maxTime = formatTime(Math.max(...times));
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

        if (bestAo5 === "--:--.--") {
            bestAo5 = ao5;
        } else {

            if (ao5 < bestAo5) {
                bestAo5 = ao5;
            }
        }
    }

    if (times.length >= 12) {
        const last5Solves = times.slice(-12);
        const minSolve = Math.min(...last5Solves);
        const maxSolve = Math.max(...last5Solves);
        const sumWithoutMinMax = last5Solves.reduce((acc, cur) => acc + cur, 0) - minSolve - maxSolve;
        ao12 = formatTime(sumWithoutMinMax / 10);

        if (bestAo12 === "--:--.--") {
            bestAo12 = ao5;
        } else {

            if (ao5 < bestAo5) {
                bestAo12 = ao5;
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

    function handlePbClear() {
        bestAo5 = null;
        bestAo12 = null;
        deleteTimes();

    }

    return (
        <div className="solve-stats">

            <div className="table-container">
                <Grid container spacing={1} className="stats-grid">
                    <Grid xs={12}>
                        <Item className="pb-grid-item"><p className="pb-titles">pb</p> <p className="pb-text">{minTime}</p></Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item className="pb-grid-item"><p className="pb-titles">pb ao5</p> <p className="pb-text">{bestAo5}</p></Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item className="pb-grid-item"><p className="pb-titles">pb a12</p> <p className="pb-text">{bestAo12}</p></Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item className="pb-grid-item"><p className="pb-titles">ao5</p> <p className="pb-text">{ao5}</p></Item>

                    </Grid>
                    <Grid xs={6}>
                        <Item className="pb-grid-item"><p className="pb-titles">ao12</p> <p className="pb-text">{ao12}</p></Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item className="pb-grid-item"><p className="pb-titles">worst</p> <p className="pb-text">{maxTime}</p></Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item className="pb-grid-item"><p className="pb-titles">avg</p> <p className="pb-text">{averageTime}</p></Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item ><p className="pb-titles">solves</p> <p className="pb-text">{totalCompletedSolves}</p></Item>
                    </Grid>
                </Grid>

                <div className="table-buttons">
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

                    <div className="buffer-div">
                        <button id="scramble-buttons" onClick={handlePbClear}>Clear All Times</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Table;
