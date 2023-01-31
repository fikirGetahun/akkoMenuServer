const express= require('express');
const app= express();
const bodyParser = require('body-parser')
// const loginRoute = require('./routes/auth')
const cors = require('cors')
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cors())
const logger=require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

// app.use('/login2', loginRoute )

// const port=process.env.PORT || 3002;
const port=3000

//app.listen(port,()=>winston.info(`Listinging on port ${port} ... ${new Date()}`));
app.listen(port,()=>logger.log('info',`Listinging on port ${port} ... ${new Date()}`));


