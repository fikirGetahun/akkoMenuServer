const mongoose = require('mongoose');




const Rating = mongoose.model('Rating', new mongoose.Schema({
        food_id:{
            required:true,
            type:String
        },
        rating:{
            required: true,
            type:Number
        },
        feedBack:{
          
            type:String
        },
        time:{
            required: true,
            type : Date, default: Date.now
        }
}));

exports.Rating = Rating;