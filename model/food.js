const Joi = require('joi')
const mongoose = require('mongoose')


 

const Food =   mongoose.model('Food', new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:2,
        maxlength:100
    },
    categoryId:{
        type:String,
        required:true,
        minlength:2,
        maxlength:1000
    },
    info:{
        type:String,
        required:true,
        minlength:2,
        maxlength:1000
    },
    order:{
        type:Number,
       
        minlength:2,
        maxlength:100
    },
    image:{
        type:String,
        required: true
    },
    isActive: Boolean

}))


const Validation = (Food)=>{
    const schem =  Joi.object({
        name: Joi.string().required().max(100),
        categoryId: Joi.string().required().max(100),
        info: Joi.string().required().max(1000),
        order: Joi.number().max(100),
        image: Joi.string().required()
    })

    return schem.validate(Food)
}

exports.Food = Food;
exports.Validation = Validation