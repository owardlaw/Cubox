import React, { useState } from "react";

const Table = () => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [userTime, setUserTime] = useState("");

    const handleSubmit = () => {
        setTimeEntries([Number(userTime).toFixed(3), ...timeEntries.slice(0, 4)]);
        setUserTime("");
    };

    const recentTime = timeEntries.slice(-1)[0] || "-";

    const timeAverageOf5 = (index) => {
        let lastFive = timeEntries.slice(index, index + 5);
        return lastFive.length === 5
            ? lastFive.reduce((sum, entry) => sum + parseFloat(entry), 0) / 5
            : "-";
    }

    const timeAverageOf12 = (index) => {
        let lastTwelve = timeEntries.slice(index, index + 12);
        return lastTwelve.length === 12
            ? lastTwelve.reduce((sum, entry) => sum + parseFloat(entry), 0) / 12
            : "-";
    }

    const timeEntriesToShow = timeEntries.slice(0, 5);

    return (
        <div>
            <input
                type="text"
                value={userTime}
                onChange={(e) => setUserTime(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>ao5</th>
                        <th>ao12</th>
                    </tr>
                </thead>
                <tbody>
                    {timeEntriesToShow.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry}</td>
                            <td>{timeAverageOf5(index)}</td>
                            <td>{timeAverageOf12(index)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
