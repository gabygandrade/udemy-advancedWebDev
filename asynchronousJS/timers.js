/* 
Your goal is to implement a function called countDown.  
    The function will accept 1 parameter which is a time in seconds for the count down.  
    The function should console.log the time remaining every second.  
    Once the timer gets to 0, the timer should be stopped and you should console.log "Ring Ring Ring!!!".
*/

function countDown(seconds){
    var intervalId = setInterval(function(){
        seconds--
        if (seconds > 0){
            console.log(`Time remaining: ${timeRemaining}`)
        } else {
            console.log('Ring Ring Ring!!!')
            clearInterval(intervalId)
        }
    }, 1000)
}