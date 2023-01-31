// const logger=require('./logger')

// function showName(name){
//     console.log('Hello ' +  name)
// }

// showName('Tsega Tadele')
// logger('new message')

//const EventEmitter= require('events');
const Logger= require('./logger')

const logger= new Logger();
// const emmitter= new EventEmitter();
// Register a Listener
logger.on('Logging', (arg)=>{    console.log('Listener Called',arg)})
logger.log('message')