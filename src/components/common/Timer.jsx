import { useEffect, useState } from 'react';

const Timer = ({ validTime, onTimerEnd }) => {
    const [time, setTime] = useState(validTime);

    const format = (time) => {
        const base = time / 1000;
        const s = Math.floor(base % 60);
        const m = Math.floor(base / 60);

        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1000);
        }, 1000);

        if (time <= 0) {
            clearInterval(timer);
            onTimerEnd();
        }

        return () => {
            clearInterval(timer);
        };
    }, [time]);

    return <span>{format(time)}</span>;
};

Timer.defaultProps = {
    validTime: 60 * 3 * 1000,
};

export default Timer;
