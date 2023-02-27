
//const asyncMiddleware=require('../middleware/async')
const auth=require('../middleware/auth');
const admin = require('../middleware/admin');
const {customer,Validate} = require('../model/customer')
const express= require('express');
const async = require('../middleware/async');

const router= express.Router();

router.get('/', async(req,res)=>{
 
        const cust=await customer.find().sort('name');
        res.send(cust);
      
})

router.get('/:id', async(req,res)=>{
//console.log('get by id',req.params.id);
    let cust=await customer.findById(req.params.id);

    if(!cust) res.status(404).send('Not found')
    else res.send(cust)

    
})
router.post('/',auth, async(req,res)=>{
    // router.post('/',  async(req,res)=>{
    ///--Validation using Joi
    const {error}=    Validate(req.body); 
    if(error) return    res.status(400).send(error.details[0].message)
    
    const cust= customer({name:req.body.name, isGold:req.body.isGold, phone:req.body.phone});
    let result =await cust.save();
    res.send(result);

})
router.put('/:id', async(req,res)=>{
    const {error}=    Validate(req.body);  
    if(error){
       return    res.status(400).send(error.details[0].message)
    }
let cust =await   customer.findByIdAndUpdate(req.params.id, {
     name:req.body.name,
    phone:req.body.phone,
    isGold:req.body.isGold},{
        new:true
    })
   
    if(!cust) res.status(404).send('id Not found')
       res.send(cust);

})
router.delete('/:id',auth, async(req,res)=>{
    let cust=await customer.findOneAndRemove( req.params.id);
    if(!cust) return res.status(404).send('id Not found')
    res.send(cust);


})

module.exports=router;