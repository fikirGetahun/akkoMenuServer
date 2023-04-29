const winston=require('winston');
const mongoose= require('mongoose');
const logger = require('./logging');

module.exports= async function(){

    const url='mongodb://localhost:27017/akkoMenu';   
    // const url='mongodb://192.168.1.2:27017/akkoMenu'; 
    // const url='mongodb+srv://vercel-admin-user:Qwe%40123@cluster0.syzc5vp.mongodb.net/akkoMenu';  

    // const url='mongodb+srv://vercel-admin-user:Qwe%40123@cluster0.syzc5vp.mongodb.net/?retryWrites=true&w=majority';  

    // const url = 'mongodb+srv://vercel-admin-user:Qwe%40123@cluster0.syzc5vp.mongodb.net/akkoMenu';
    mongoose.set('strictQuery', true);
   
  await  mongoose.connect(url,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
   // .then(()=> winston.info('connected to MongoDb ...')
     .then(()=> logger.log('info','connected to MongoDb ...')
    );
}


