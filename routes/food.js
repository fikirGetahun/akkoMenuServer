const express = require('express')
const db2 = require('../startup/db2')
const router = express.Router()
// const auth = require('../middleware/admin')
const {Food , Validation   } = require('../model/food')
 const {Price  } = require('../model/price')
 const Category = require('../model/category')
const { compareSync } = require('bcrypt')
const auth = require( '../middleware/auth')


router.post('/' , async (req, res)=>{

 
    let {error} = Validation(req.body.food)
   
    if(error) return res.status(400).send(error.details[0].message)
    console.log('this is from express  ',req.body)

    const co = await Food.find({categoryId:req.body.food.categoryId}).count()

    const data = await Food({
        name: req.body.food.name,
        categoryId:req.body.food.categoryId,
        info: req.body.food.info,
         image:req.body.food.image,
         order: co+1
    })

    let foodUploadedData = await data.save()

    const pdata = await Price({
        price:req.body.price.price,
    	halfPrice:req.body.price.halfPrice,
        halfFull:req.body.price.halfFull,
    	oldPrice:req.body.price.oldPrice,
    	foodId:foodUploadedData._id
    })
    
    let priceUploadedData = await pdata.save()
  
    
     
    
    // .exec(function (err, res){
    //     console.log("this is output ",JSON.stringify(err))
    //     console.log("this is output ",JSON.stringify(res))
    //     ff = res
    //     return res
    // })
    // console.log(datax)
    // res.send({priceUploadedData, foodUploadedData})
    res.send("successfull")

    // res.send(priceUploadedData)
})

router.put('/:fid/:pid' , async (req, res)=>{

 
    let {error} = Validation(req.body.food)
   
    if(error) return res.status(400).send(error.details[0].message)
    console.log('this is from express  ',req.body)
    const data = await Food.findByIdAndUpdate(req.params.fid,{
        name: req.body.food.name,
        categoryId:req.body.food.categoryId,
        info: req.body.food.info,
       
        image:req.body.food.image
    })

    // let foodUploadedData = await data.save()

    const pdata = await Price.findByIdAndUpdate(req.params.pid,{
        price:req.body.price.price,
    	halfPrice:req.body.price.halfPrice,
        halfFull:req.body.price.halfFull,
    	oldPrice:req.body.price.oldPrice,
    	 
    })
    
    // let priceUploadedData = await pdata.save()

    if(!pdata) return res.status(400).send('error on price update')

      if(!data) return res.status(400).send('error on product update')

    
     
    
    // .exec(function (err, res){
    //     console.log("this is output ",JSON.stringify(err))
    //     console.log("this is output ",JSON.stringify(res))
    //     ff = res
    //     return res
    // })
    // console.log(datax)
    // res.send({priceUploadedData, foodUploadedData})
    res.send("successfull")

    // res.send(priceUploadedData)
})


router.get('/:catId',  async (req, res)=>{
    
    const data = await Food.find({categoryId: req.params.catId}).sort('order')
 


    // const data =await Food.aggregate([
    //     {
    //         $lookup:{
    //             from: Category,
    //             localField: "categoryId",
    //             foreignField: "_id",
    //             as: "foodWithCategory"
    //         },
    //         $unwind: "foodWithCategory",
    //         $lookup:{
    //             from: Price,
    //             localField: "priceId",
    //             foreignField: "foodId",
    //             as: "foodWithCategoryWithPrice"
    //         }
    //     }
    // ]).exec(function (err, res){
    //     console.log("this is output ",JSON.stringify(res))
    //     return res
    // })

     
    // if(error) return res.status(400).send('404 error')

    res.send(JSON.stringify(data))
    
})

router.get('/search/:product', async (req,res)=>{
     let data = await Food.find({name: { $regex: ".*"+req.params.product+".*" }    })

 
    // 
     if(!data) return res.status(404).send('error on search')

    res.send(data)
})



router.get('/', async (req,res)=>{
    const data = await Food.find()
    if(!data) return res.status(404).send('error on db')

    res.send(data)
})

 

router.patch('/order/:id', async (req,res)=>{
    const data = await Food.findByIdAndUpdate(req.params.id,{order: req.body.order})
    if(!data) return res.status(404).send('error on db')

    res.send(data)
})


router.get('/product/:id', async (req,res)=>{
    var result;
    
    let data = await Food.findById(req.params.id)

    if(!data) return res.status(404).send('error: product not found')

    res.send(data)
})


router.get('/catWithProduct/:cid', async(req,res)=>{
    var result;
    
    let data = await Food.aggregate([
        {
          $match: {
            categoryId : req.params.cid
          }
        },
        {
        $lookup:   
 
      {
        from: "prices",
        localField: "_id",
        foreignField: "foodId",
        as: "result"
      }
      }
      ])

    if(!data) return res.status(404).send('error: product not found')

    res.send(data)
})


router.delete('/:id', auth, async (req,res)=>{
    let data = await Food.findByIdAndRemove(req.params.id)
    if(!data) return res.status(404).send('error: Cant delete unkown product')


    let price = await Price.findOneAndDelete({foodId: req.params.id})
    if(!price) return res.status(404).send('error: Cant delete unkown product')

    res.send('Deleted!')
})

module.exports=router;