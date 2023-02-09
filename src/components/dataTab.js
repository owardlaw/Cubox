import React, { useState } from "react";

const Table = () => {
    const [timeEntries, setTimeEntries] = useState([]);
    const [userTime, setUserTime] = useState("");

    const handleSubmit = () => {
        setTimeEntries([Number(userTime).toFixed(3), ...timeEntries.slice(0, 4)]);
        setUserTime("");
    };

    const recentTime = timeEntries.slice(-1)[0] || "-";

    const timeAverageOf5 =
        timeEntries.slice(-5).length === 5
            ? timeEntries
                .slice(-5)
                .reduce((sum, entry) => sum + parseFloat(entry), 0) / 5
            : "-";

    const timeAverageOf12 =
        timeEntries.slice(-12).length === 12
            ? timeEntries
                .slice(-12)
                .reduce((sum, entry) => sum + parseFloat(entry), 0) / 12
            : "-";

    const timeEntriesToShow = timeEntries.slice(0, 5).reverse();

    return (
        <div>
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
                            <td>{index === 0 ? timeAverageOf5 : "-"}</td>
                            <td>{index === 0 ? timeAverageOf12 : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <input
                type="text"
                value={userTime}
                onChange={(e) => setUserTime(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Table;
