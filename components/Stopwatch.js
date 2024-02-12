// implement run time on server later on

export const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isActive]);

    const toggleStopwatch = () => {
        setIsActive(prevIsActive => !prevIsActive);
    };

    const resetStopwatch = () => {
        setSeconds(0);
        setIsActive(false);
    };
};
