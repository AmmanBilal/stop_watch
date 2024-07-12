import React,{useState,useEffect, useRef} from 'react'
import './Stopwatch.css'

const Stopwatch = () => {
  const [isRunning,setRunning]=useState(false)
  const [elapsedTime,setelapsedTime]=useState(0)
  const intervalRef=useRef(null)
  const startTimeRef=useRef(0)


  useEffect(()=>{
     if(isRunning){
      intervalRef.current=setInterval(()=>{
            setelapsedTime(Date.now()-startTimeRef.current)
      },10)
    }

    return()=>{
      clearInterval(intervalRef.current)
    }

  },[isRunning])

  function start(){
      setRunning(true)
      // minus the already elapsed time (to support resume functionality).
      startTimeRef.current=Date.now()-elapsedTime
      // console.log(startTimeRef.current)
      
  }
  function stop(){
    setRunning(false)
      
  }
  function reset(){
   setelapsedTime(0)
   setRunning(false)
  }
  function formatTime(){

    // milliseconds to hours.
    let hour = Math.floor(elapsedTime / (1000 * 60 * 60))
        // elapsedTime / (1000 * 60) converts milliseconds to minutes.
// % 60 gives the remainder when divided by 60, which is the number of minutes not making up an hour.
let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
//    elapsedTime / 1000 converts milliseconds to seconds.
// % 60 gives the remainder when divided by 60, which is the number of seconds not making up a minute.
let seconds = Math.floor((elapsedTime / 1000) % 60);
// elapsedTime % 1000 gives the remainder when milliseconds are divided by 1000, which is the number of milliseconds not making up a second.
// / 10 converts it to a two-digit format (hundredths of a second).
let milliseconds = Math.floor((elapsedTime % 1000) / 10);


     return `${hour} : ${minutes} : ${seconds} : ${milliseconds}`
  }

  return (
    <div className='stopwatch'>
      <div className='display'>
          {formatTime()}
      </div>
      <div className='control'>
        <button onClick={start} className='start-button'>Start</button>
        <button onClick={reset} className='reset-button'>Reset</button>
        <button onClick={stop} className='stop-button'>Stop</button>

      </div>

    </div>
  )
}

export default Stopwatch