const mongoose = require('mongoose');




const QuestionChoose = mongoose.model('QuestionChoose', new mongoose.Schema({
        chooseContent:{
            required:true,
            type:String
        },
        question_id:{
            required: true,
            type:mongoose.Types.ObjectId
        }
}));

exports.QuestionChoose = QuestionChoose;