 
const auth=require('../middleware/auth');
 const bcrypt = require('bcrypt');
const _= require('lodash');
const {User,Validate} = require('../model/user');
const express= require('express');
const router= express.Router();


router.get('/me',auth,async(req,res)=>{
    
    const u=await User.findById(req.user._id).select('-password');
    res.send(u);
})


router.get('/byemail/:email', async (req,res)=>{
    const u = await User.findOne({email: req.params.email})

    if(!u) return res.status(400).send('invalid user to fetch')

    res.send(u)
})

router.get('/allUsers', async (req,res)=>{
    const u = await User.find()
    
  

    if(!u) return res.status(400).send('invalid user to fetch')
 
    if(!User){
        return res.send('the schema has problem')
        }else{
            User.length
            return   res.send(User.length)
        }
      res.send(u)
})

router.patch('/', async (req,res)=>{
    let {tobeEdited} = req.body.tobe
   let u
    if(req.body.tobe == 'name'){
          u = await User.findByIdAndUpdate(req.body.id,{name: req.body.data})
          res.send("Name Changed!")
    }else if(req.body.tobe == 'email'){
         u = await User.findByIdAndUpdate(req.body.id,{email: req.body.data})
         res.send("Email Changed!")
    }else{
        const salt= await  bcrypt.genSalt(10);
        let password= await bcrypt.hash(req.body.data,salt);
       u = await User.findByIdAndUpdate(req.body.id,{password: password})
       res.send("Password Changed!")
    }
    if(!u) return res.status(400).send('invalid user to fetch')


})

router.post('/',async(req,res)=>{

    ///--Validation using Joi
    const {error}=    Validate(req.body); 
    if(error){          return    res.status(400).send(error.details[0].message)    }

    let user=await User.findOne({        email:req.body.email    })
    if(user) return res.status(400).send('User already register');

try {
   //  user= new User({name:req.body.name,email:req.body.email, password: req.body.password});
   user =new User(_.pick(req.body,['name','email','password']));
   
  const salt= await  bcrypt.genSalt(10);
  user.password= await bcrypt.hash(user.password,salt);
let result =await user.save();
    // res.send(result);
const token=user.generateAuthToken();
   res.header('x-auth-token',token).send( _.pick(user,['_id', 'name','email']));

} catch (error) {
    res.send(error.message)
}

})


router.delete('/:id', auth, async (req,res)=>{
    let data = await User.findByIdAndRemove(req.params.id)
    if(!data) return res.status(404).send('error: Cant delete unkown product')

    res.send('Deleted!')
})



module.exports=router;
