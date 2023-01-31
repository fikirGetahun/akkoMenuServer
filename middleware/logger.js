const EventEmitter= require('events');

class Logger extends EventEmitter{
    log(message){
        console.log('Add my message here ' +message);
   
    // Risse an event
this.emit('Logging',{username:'Tsega', password:29,URL:'//http/test.com'})
} 

}

module.exports=Logger;