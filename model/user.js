const jwt=require('jsonwebtoken');
const config= require('config')
const mongoose= require('mongoose');
const Joi = require('joi');

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://0.0.0.0:27017/Customer').then(()=>{
//     console.log('connected to MongoDb ...')
// }).catch((error)=>{
//     console.error('Could not connect to MongoDB ...', error);
// });
const userSchema=new mongoose.Schema({
    name:{type:String,
         required:true,
        minlength:5,
        maxlength:50
    },
   email:{
          type:String,
          required:true,
          unique:true,
          minlength:5,
          maxlength:255},
   password:{
          type:String,
          required:true,
          minlength:5,
          maxlength:1024},
   isAdmin: Boolean
         
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id ,
        isAdmin: this.isAdmin   
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };



const user=mongoose.model('User',userSchema)

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string() .required().min(5).max(255).email(),
       password:Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean()
        
        });
           return   schema.validate(user);
}

exports.User=user;
exports.Validate=validateUser;