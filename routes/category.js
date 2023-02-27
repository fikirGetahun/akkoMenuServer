const express = require('express')
const multer = require('multer')
const fileupload = require('express-fileupload')
const auth = require( '../middleware/auth')
const{ Category, Validate }= require( '../model/category')
const router = express.Router()
const path = require('path')
// router.use(fileupload())
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.use(express.static("./uploads"));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'uploads')
//     },
//     filename: (req,file , cb)=>{
//         cb(null, Date.now()+path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }})  

router.post('/' ,async (req,res)=>{
    // const {error} = Validate(req.body)
    // if(error) return res.status(400).send(error.details[0].message)
    // if(error) return res.status(400).send("this is errrrrorr")
    console.log(req.files)
    res.send(req.files)
        let ava = req.files
        let extraname = process.hrtime();
        let path = './uploads/'+extraname+ava.name;
         
       
            ava.mv(path)
        
 
        const data = Category({name:req.body.name, image:path })
        const result =await data.save()
        return res.send(result);
   
})


router.get('/', async (req,res)=>{
    const data = await Category.find();
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


router.put('/:id',auth, async (req, res)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const data = await Category.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        order:req.body.order,
        image:req.body.image
    })

    if(!data) return res.status(404).send('id Not found')
    res.send('Edited!')


})

router.delete('/:id', auth, async (req,res)=>{
    // let data = await Category.findByIdAndRemove(req.params.id)
    let data = await Category.findByIdAndUpdate(req.params.id)
    if(!data) return res.status(404).send('error: Cant delete unkown product')

    res.send('Deleted!')
})


module.exports=router;