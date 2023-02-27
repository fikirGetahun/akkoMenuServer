const mongoose = require('mongoose');




const FeedBackQuestions = mongoose.model('feedBackQuestions', new mongoose.Schema({
        questions:{
            required:true,
            type:String
        },
        active:{
            required: true,
            type:Boolean
        }
}));

exports.FeedBackQuestions = FeedBackQuestions;