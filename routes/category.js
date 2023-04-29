const express = require('express')

const auth = require( '../middleware/auth')
const{ Category, Validate }= require( '../model/category')
const {Food , Validation   } = require('../model/food')
const router = express.Router()

router.post('/',auth, async (req,res)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    // if(error) return res.status(400).send("this is errrrrorr")
    const co = await Category.find().count()
 
        const data = Category({name:req.body.name, image:req.body.image, order: co+1})
        const result =await data.save()
        return res.send(result);
   
})


router.get('/',  async (req,res)=>{
    const data = await Category.find().sort("order")
    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

router.get('/active', async (req,res)=>{
    const data = await Category.findOne({isActive:true})
    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

router.get('/order', async (req,res)=>{
    const data = await Category.find( ).sort("order")
    if(!data) return res.status(404).send('error on db')

    res.send(data)
})

router.patch('/order/:id', async (req,res)=>{
    const data = await Category.findByIdAndUpdate(req.params.id,{order: req.body.order})
    if(!data) return res.status(404).send('error on db')

    res.send(data)
})


router.post('/makeActive',auth, async (req,res)=>{
    // const {error} = Validate(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    // if(error) return res.status(400).send("this is errrrrorr")

 
        const data = await Category.findOneAndUpdate({isActive: req.body.isActive})
        
        return res.send(data);
   
})

router.get('/:id', async(req, res)=>{
    const data = await Category.findById(req.params.id)
    if(!data) return res.status(404).send('content not found!')
     return res.send(data)
})


router.patch('/:id',auth, async (req, res)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const data = await Category.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
     
        image:req.body.image
    })

    if(!data) return res.status(404).send('id Not found')
    res.send('Edited!')


})

router.delete('/:id', auth, async (req,res)=>{
    // let data = await Category.findByIdAndRemove(req.params.id)
    let data = await Category.findByIdAndRemove(req.params.id)

    let fo = await Food.deleteMany({categoryId: req.params.id})

    if(!data) return res.status(404).send('error: Cant delete unkown product')

    res.send('Deleted!')
})


module.exports=router;