// const config= require('config')
// const jwt=require('jsonwebtoken');
const Joi = require('joi');
const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const _= require('lodash');
const express= require('express');
const router= express.Router();


router.post('/',async(req,res)=>{

    ///--Validation using Joi
    const {error}=    Validate(req.body); 
    if(error){          return    res.status(400).send(error.details[0].message)    }

    let user= await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password.');

try {
const validPassword=await   bcrypt.compare(req.body.password, user.password)
if(!validPassword) return res.status(400).send('Invalid email or password.');
    // res.send(result);

  //const token=  jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
  const token=user.generateAuthToken();
  let body ={
    token : token,
    isAdmin: user.isAdmin
  }
   res.send(body);

} catch (error) {
    res.send(error.message+'ddd')
}

});

function Validate(user){
    const schema = Joi.object({
       email: Joi.string() .required().min(5).max(255).email(),
       password:Joi.string().min(5).max(255).required()
        
        
        });
           return   schema.validate(user);
}
module.exports=router;