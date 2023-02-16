// Format time: UNIX to MM:SS:MS
const formatTime = (unixTime) => {
    const date = new Date(unixTime);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
};

export default formatTime;
