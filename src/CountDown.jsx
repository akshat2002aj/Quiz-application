const CountDown = (startTime)=>{
    const startTimestamp = +new Date(startTime);
    const currentTimestamp = +new Date();
    const timeRemaining = startTimestamp - currentTimestamp;
    if(timeRemaining>0){
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        return `${days}d ${hours}h:${minutes}m:${seconds}s`;
    }else{
        return '0d 0h:0m:0s';
    }
  }

  export default CountDown;