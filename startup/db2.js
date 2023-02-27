const winston=require('winston');
const mongoose= require('mongoose');
const logger = require('./logging');

module.exports= async function db (){

    const url='mongodb://localhost:27017/akkoMenu';  
    mongoose.set('strictQuery', true);
   
  await  mongoose.connect(url,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
   // .then(()=> winston.info('connected to MongoDb ...')
     .then(()=> logger.log('info','connected to MongoDb ...')
    );
}


