const mongoose= require('mongoose');
const Joi = require('joi');



const customer=mongoose.model('Customer',new mongoose.Schema({
    name:{type:String, required:true,
        minlength:5,
        maxlength:50
    },
    isGold:Boolean,
    phone:{type:String, required: function(){
        return this.isGold;
    } ,
    minlength:5,
        maxlength:50
}
}))

function Validate(customer){
    const schema = Joi.object({
        name: Joi.string()
                 .required()
                .min(5)
            .max(50),
            phone: Joi.string()
            .required()
           .min(5)
       .max(50),
       isGold:Joi.boolean()
        
        
        });
           return   schema.validate(customer);
}

exports.customer=customer;
exports.Validate=Validate;