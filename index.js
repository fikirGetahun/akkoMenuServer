const express= require('express');
const app= express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const multer = require('multer')
app.use(fileUpload({createParentPath:true}));
// const loginRoute = require('./routes/auth')
const cors = require('cors')
// app.use(bodyParser.json({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// app.use(bodyParser.text({ limit: '200mb' }));
 app.use(cors())
 const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: (req,file , cb)=>{
        cb(null, Date.now())
    }
})

const upload = multer({storage: storage, limits: { fieldSize: 10 * 1024 * 1024 }})  
 app.post('/upload', upload.single('x'),   (req,res)=>{
    // console.log(req.body)
    console.log(req.file)
    res.send(req.file)
})
const logger=require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
// require('./startup/validation')();




 


// app.use('/login2', loginRoute )

const port=process.env.PORT || 3002;
//app.listen(port,()=>winston.info(`Listinging on port ${port} ... ${new Date()}`));
app.listen(port,()=>logger.log('info',`Listinging on port ${port} ... ${new Date()}`));


