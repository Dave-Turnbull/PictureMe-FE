import { useState, useEffect } from "react";
import { View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

const Timer = ({setTimerRunning, totalTime}) => {
    const [timerTime, setTimerTime] = useState(totalTime)

    //TIMER FUNCTIONS
    useEffect(() => {
        if(timerTime <= 0){
            setTimerRunning(false)
            setTimerTime(null)
        }

        if (timerTime > 0) {
            // save intervalId to clear the interval when the
            // component re-renders
            const intervalId = setInterval(() => {
                setTimerTime(timerTime - 1);
            }, 1000);
    
            return () => clearInterval(intervalId);
        }

    }, [timerTime]);

    return (
        <View>
        <Text>{timerTime}</Text>
        <ProgressBar progress={timerTime/10} />
        </View>
    )
}

export default Timer;