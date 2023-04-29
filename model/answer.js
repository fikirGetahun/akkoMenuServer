const mongoose = require('mongoose');




const Answer = mongoose.model('Answer', new mongoose.Schema({
        food_id:{
            required:true,
            type:mongoose.Types.ObjectId
        },
        question_id:{
            required: true,
            type:mongoose.Types.ObjectId
        },
        choose_id:{
            required: true,
            type:mongoose.Types.ObjectId
        },
        time:{
            required: true,
            type : Date, default: Date.now
        }
}));

exports.Answer = Answer;