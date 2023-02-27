const mongoose = require('mongoose');




const Answer = mongoose.model('Answer', new mongoose.Schema({
        food_id:{
            required:true,
            type:String
        },
        question_id:{
            required: true,
            type:String
        },
        choose_id:{
            required: true,
            type:String
        },
        time:{
            required: true,
            type : Date, default: Date.now
        }
}));

exports.Answer = Answer;