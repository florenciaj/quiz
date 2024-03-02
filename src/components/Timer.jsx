import React, { useEffect, useState } from 'react';

const Timer = ({ timeout, onTimeout, mode }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => clearTimeout(timer);
    }, [onTimeout, timeout])


    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prev => prev - 100);
        }, 100);

        return () => clearInterval(interval); // return cleanup function
        // will be automatically executed by React before it runs this useEffect function again or when this component is unmounted from the DOM, so if it disappears from the screen
    }, [])

    return (
        <progress
            id='question-time'
            max={timeout}
            value={remainingTime}
            className={mode}
        />
    )
}

export default Timer