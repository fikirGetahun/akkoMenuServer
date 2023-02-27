const express = require('express')
const router = express.Router()



router.get('/images/:imgName', async (req, res)=>{
    let imgName = req.params.imgName;
    let image = require('../uploads/'+imgName);
    res.send(image)
})

module.exports = router;