import { useEffect, useState } from "react";


export default function QuetionTimer({timeout , onTimeOut}){
    const [remainingTime , setRemainingTime] = useState(timeout)

    useEffect(() =>{
        console.log('settingTimeOut')
        setTimeout( onTimeOut , timeout);
    } , [timeout , onTimeOut])


    useEffect( () => {
        console.log('settingInterval')
        setInterval(() => {
            setRemainingTime( prev => prev -100)
        }, 100);
    } , [])

    return <progress id="question-time" max={timeout} 
    value={remainingTime} />
}