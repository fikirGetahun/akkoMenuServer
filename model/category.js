// const mongoose= require('mongoose');
// const Joi = require('joi');
 


// const  Category=mongoose.model('Category',new mongoose.Schema({
//     name:{type:String, required:true,
//         minlength:5,
//         maxlength:50
//     },
 
//     image:{type:String, required: true,
//         minlength:10,
//         maxlength:200, 
//     },
//     order:{
//         type:Number, required:true,
//         minlength:1,
//         maxlength:3,
//     }
// }))

// function Validate(customer){
//     const schema = Joi.object({
//         name: Joi.string()
//                  .required()
//                 .min(5)
//             .max(50),
//             image: Joi.string()
//             .required()
//            .min(5)
//        .max(50),
//        order: Joi.number()
//        .required()
//        .min(1)
//        .max(3)
    
        
        
//         });
//            return   schema.validate(customer);
// }

// exports.customer=Category;
// exports.Validate=Validate;


const mongoose = require('mongoose')
const Joi = require('joi')
  

const Category = mongoose.model('Category', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:4,
        maxlength:50
    },
    image:{
        type: String,
        required: true,
     
    },
  
    order:{
        type:Number,
        
        minlength:1,
        maxlength:2
    },
    isActive: Boolean
}))

const Validate = (Category) =>{
    const schema = Joi.object({
        name:Joi.string()
            .required()
            .min(4)
            .max(50),
        image: Joi.string()
            .required()
            ,
        order: Joi.number()
            
            .min(1)
            .max(200),
            isActive:Joi.boolean()
    })
    return schema.validate(Category)
 }


 exports.Validate= Validate
 exports.Category= Category

