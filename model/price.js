const Joi = require('joi')
const mongoose = require('mongoose')

const Price=   mongoose.model('Price', new mongoose.Schema({
    price: {
        type: Number,
        required:true,
        minlength:2,
        maxlength:100
    },
    halfPrice:{
        type:Number,
       
 
    },
    halfFull:{
        type:Boolean
    },
   
    foodId:{
        type:mongoose.Types.ObjectId,
        required:true,
        minlength:2,
        maxlength:1000
    },
 

}))


const Validation = (Price)=>{
    const schem =  Joi.object({
        price: Joi.number().required().max(100),
        halfPrice: Joi.boolean().required().max(100),
        oldPrice: Joi.number().required().max(10000),
        foodId: Joi.number().required().max(100),
    })

    return schem.validate(Price)
}

exports.Price = Price;
exports.Validation = Validation