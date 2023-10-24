const Timer = (startTime, duration)=>{
    let startTimestamp = +new Date(startTime);
   
    const currentTimestamp = +new Date();
    console.log(startTime)
    startTimestamp = startTimestamp + duration * 60 * 1000;
    const timeRemaining =  startTimestamp  - currentTimestamp;
    // console.log(timeRemaining)
    // console.log(new Date(), startTime)
    if(timeRemaining > 0 ){
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        duration = duration - 1;
        // console.log(minutes, seconds, hours)
        return `${String(hours).padStart(2, '0')}:${String(duration - minutes).padStart(2, '0')}:${String(60 -seconds).padStart(2, '0')}`;
        // return {
        //     timer: true,
        //     hours,
        //     minutes,
        //     seconds
        // };
    }else{
        return '00:00:00';
    }
  }

  export default Timer;