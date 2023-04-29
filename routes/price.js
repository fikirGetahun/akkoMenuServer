const { default: axios } = require('axios');
const express = require('express')
const router = express.Router()
const {Price} = require('../model/price')


router.get('/:foodId', async(req, res)=>{
    const price = await Price.findOne({foodId: req.params.foodId})
    if(!price) return res.status(404).send('err 404 page not found')

    res.send(price)
})






module.exports=router;