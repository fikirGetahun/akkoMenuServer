
// const winston = require('winston');
// require('winston-mongodb');
// require('express-async-errors');


// module.exports=function(){

//     winston.exceptions.handle(
//         new winston.transports.Console({
//             format: winston.format.simple()}),
//         new winston.transports.File({filename:'uncaughtExceptions.log'})
//     )
// process.on('uncaughtException',(ex)=>{
//     winston.error(ex.message,ex);
//     process.exit(1);
// });

// process.on('unhandledRejection',(ex)=>{
//     throw ex;
// })
    
// winston.add(new winston.transports.File({ filename: 'logfile.log'}));
// winston.add(new winston.transports.MongoDB({db:'mongodb://0.0.0.0:27017/Customer',level:'info'}));

// }

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, simple } = format;
// require("winston-mongodb");

const logFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${timestamp} ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      handleRejections: true,
      format: simple(),
    }),
    new transports.File({
      level: "info",
      filename: "loginfo.log",
      format: simple(),
    }),
    new transports.File({
      level: "error",
      filename: "exception.log",
      handleExceptions: true,
      handleRejections: true,
      format: combine(timestamp({ format: "DD/MM/YYYY HH:mm:ss" }), logFormat),
    }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'rejections.log' })
  ]
});

module.exports = logger;
module.exports.stream = {
  write: function (message) {
    logger.info(message.replace(/(\r\n|\n|\r)/gm, ""));
  },
};

