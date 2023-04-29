const express = require('express');
const router = express.Router();
const {FeedBackQuestions} = require('../model/feedBackQuestion');
const {Rating} = require('../model/rating');
 const {QuestionChoose} = require('../model/questionChoose');
const {Answer} = require('../model/answer');
const {Food} =require('../model/food')
const { date } = require('joi');
const auth = require('../middleware/auth');
const { default: mongoose } = require('mongoose');
// const { default: FoodLister } = require('../../components/foodLister');  


router.post('/', async (req,res)=>{
    // this is the skeleten which the data is sent
    // body = {
    //  {
    //         question: 'question',
    //         active: true
    
    //    
    // }
    body= req.body;   
    
    const data =  FeedBackQuestions({questions:body.question, active: body.active})
    result = await data.save();
    if(!result){
        res.status(400).send('Couldnt add feedbackquestioon')
    }
  

    res.send(data)
})


router.post('/choose',auth, async(req,res)=>{
    body= req.body;  
    const data2 =  QuestionChoose({chooseContent:body.chooseContent , question_id: body.question_id})
    resultx = await data2.save();
    if(!resultx){
        res.status(400).send('Couldnt add feedbackquestioon')
    }
    res.send('200')
})

router.post('/rating',auth, async (req,res)=>{
    body= req.body;  
    const data2 =  Rating({food_id:body.food_id, rating: body.rating, feedBack: body.feedBack, time: Date.now()})
    resultx = await data2.save();
    if(!resultx){
        res.status(400).send('Couldnt add feedbackquestioon')
    }
    res.send('200')
})


router.post('/answer',auth, async (req,res)=>{
    body= req.body;  
    // const data2 =  Answer({food_id: mongoose.Types.ObjectId(body.food_id) ,question_id: mongoose.Types.ObjectId(body.question_id), choose_id: mongoose.Types.ObjectId(body.choose_id), time: Date.now() })

    const data2 =  Answer({food_id:body.food_id,question_id: body.question_id, choose_id: body.choose_id, time: Date.now() })
    resultx = await data2.save();
    if(!resultx){
        res.status(400).send('Couldnt add feedbackquestioon')
    }
    res.send('200')
})

// get questions
router.get('/', async (req,res)=>{
    const data = await FeedBackQuestions.find();
    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

// get questions single
router.get('/singleQ/:id', async (req,res)=>{
    const data = await FeedBackQuestions.findById(req.params.id);
    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

// get choose by question id
router.get('/choose/:id', async (req,res)=>{
    const data = await QuestionChoose.find({question_id : req.params.id})
    if(!data) return res.status(404).send('page not found')
    
    res.send(data)
})

router.get('/choose', async (req,res)=>{
    const data = await QuestionChoose.find()
    if(!data) return res.status(404).send('page not found')
    res.send(data)
})


// get rating
router.get('/ratingLimit/:foodId/:startId', async (req,res)=>{
    const data = await Rating.find({food_id: req.params.foodId}).skip(req.params.startId).limit(20).sort({time: 'desc'})
  


    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

router.get('/ratingLimitDate/:foodId/:startId/:stDate/:fDate', async (req,res)=>{
    const data = await Rating.find({food_id: req.params.foodId, time:{
        $gte: new Date(req.params.stDate),
        $lt: new Date(req.params.fDate)
    } }).skip(req.params.startId).limit(20).sort({time: 'desc'})
    if(!data) return res.status(404).send('page not found')
    res.send(data)
})







let ans = [];
ans= []
let count = 0;
// get persentage of answeres
router.get('/answer/:qId/:foodId', async (req,res)=>{
    
    // first get all choose content on the question
    const data = await QuestionChoose.find({question_id : req.params.qId});
    if(!data) return res.status(404).send('Could not get choosen content')

    // collect choosen id anser count per choosen id 
   
    // to get over all counts and put it on var
    // data.forEach(async (element) => {
    //    let choos = await Answer.find({question_id:req.params.qId,food_id:req.params.foodId, choose_id: element._id}).count()
    //     // if(!choos) return res.status(404).send('Could not get choosen content')
    //     // console.log(choos)
    //     let xz = choos;
    //     count +=  xz; // to count over all answere

    // }); 

    // after calculating persentage, put in object array to be outputed to front end
    data.forEach(async (element) => {
        const choos = await Answer.find({question_id:req.params.qId,food_id:req.params.foodId, choose_id: element._id}).count()
        // if(!choos) return res.status(404).send('Could not get choosen content')
        // console.log(count)
        // let x = (choos*100)/(count);
        let x = choos
        const body = {
            qid: element.question_id,
            choice_id:element._id,
            name: element.chooseContent,
            countx: x
        }
        // console.log(body)
        
    ans.push(body)
    } );
 
    // const choos = await Answer.find({question_id:req.params.qId,food_id:req.params.foodId, choose_id: req.params.cid}).count()
    // // if(!choos) return res.status(404).send('Could not get choosen content')
    // // console.log(count)
    // let x = (choos*100)/(count-1);
    // const f = await QuestionChoose.findById(req.params.cid)
    // const body = {
    //     qid: req.params.qId,
    //     choice_id:req.params.cid,
    //     name: f.chooseContent,
    //     countx: x
    // }
    // console.log(body)
    
 
 

  
// console.log(req.params)
res.send(ans)
// the last lines are to remove the pushed data in the array ans and count data 
// i did this b/c when i test it on post man , it returns the previous data that has been requested before
// so i made sure i empty the array ans and value count to 1 so that when next request comes, it will always be calculated in empty ans aray
ans=[];
ans=[];
ans=[];
ans=[];
count = 0;
})



router.get('/answer/:qId/:foodId/:cid', async (req,res)=>{
    
    // first get all choose content on the question
    const data = await QuestionChoose.find({question_id : req.params.qId});
    if(!data) return res.status(404).send('Could not get choosen content')

 
 
    const choos = await Answer.find({question_id:req.params.qId,food_id:req.params.foodId, choose_id: req.params.cid}).count()

    const choos2  = await Answer.aggregate([{$match : {question_id:req.params.qId,food_id:req.params.foodId, choose_id: req.params.cid}}, {$group :{ _id :  "$choose_id"   , total :{ "$sum": 1 }  }}])
    // if(!choos) return res.status(404).send('Could not get choosen content')
    // console.log(count)
    let x = (choos*100)/(count-1);
    const f = await QuestionChoose.findById(req.params.cid)
    const body = {

        countx: choos
    }
    // console.log(choos2)
    
 
 

  
// console.log( (choos*100)/(choos2[0].total) )
// res.send(choos2)
res.send(body)
// the last lines are to remove the pushed data in the array ans and count data 
// i did this b/c when i test it on post man , it returns the previous data that has been requested before
// so i made sure i empty the array ans and value count to 1 so that when next request comes, it will always be calculated in empty ans aray
ans=[];
ans=[];
ans=[];
ans=[];
count = 0;
})


ans=[];

count = 0;
// update question
router.patch('/:id', async (req,res)=>{
    const data = await FeedBackQuestions.findByIdAndUpdate(req.params.id,{questions: req.body.question})
    if(!data ) return res.status(400).send('error updating')
    res.send(true)
})

// update choice
router.patch('/choice/:id', async (req,res)=>{
    const data = await QuestionChoose.findByIdAndUpdate(req.params.id,{chooseContent: req.body.content})
    if(!data ) return res.status(400).send('error updating')
    res.send(true)
})


router.get('/ratingCompareGte/:gte/:skip', async (req,res)=>{
    let skip = Number(req.params.skip);
    const data2 = await Rating.aggregate([{$match : { rating: {
        $gte : Number(req.params.gte)
    } }}, {$lookup: 
        {
            from: "foods",
            pipeline:[
                {
                    $group:{
                        _id:{
                            name: '$name',
                            image:'$image'
                        }
                    }
                }
            ],
            localField: "food_id",
            foreignField: "_id",
            as: "result",
          }
    }, {$group:{ _id:{ foodId:"$food_id"},rateAv: {$sum: "$rating" }, count:{$count: {}} , foodName :{'$first':'$result'}  }}  ])

    const data = await Rating.aggregate([{$match : { rating: {
        $gte : Number(req.params.gte)
    } }}, {$lookup: 
        {
            from: "foods",
            pipeline:[
                {
                    $group:{
                        _id:{
                            name: '$name',
                            image:'$image'
                        }
                    }
                }
            ],
            localField: "food_id",
            foreignField: "_id",
            as: "result",
          }
    }, {$group:{ _id:{ foodId:"$food_id"},rateAv: {$sum: "$rating" }, count:{$count: {}} , foodName :{'$first':'$result'}  }}  ]).skip(skip).limit(3)


 
    // d.
 
    if(data2.length <= skip){
        let body = {
            message : 4000
        }
   
      return  res.send(body)
    }



    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

router.get('/ratingCompareLs/:ls/:skip', async (req,res)=>{
    let skip = Number(req.params.skip);

    const data2 = await Rating.aggregate([{$match : { rating: {
        $lt : Number(req.params.ls)
    } }}, {$lookup: 
        {
            from: "foods",
            pipeline:[
                {
                    $group:{
                        _id:{
                            name: '$name',
                            image:'$image'
                        }
                    }
                }
            ],
            localField: "food_id",
            foreignField: "_id",
            as: "result",
          }
    }, {$group:{ _id:{ foodId:"$food_id"},rateAv: {$sum: "$rating" }, count:{$count: {}} , foodName :{'$first':'$result'}  }}  ])

    const data = await Rating.aggregate([{$match : { rating: {
        $lt : Number(req.params.ls)
    } }}, {$lookup: 
        {
            from: "foods",
            pipeline:[
                {
                    $group:{
                        _id:{
                            name: '$name',
                            image:'$image'
                        }
                    }
                }
            ],
            localField: "food_id",
            foreignField: "_id",
            as: "result",
          }
    }, {$group:{ _id:{ foodId:"$food_id"},rateAv: {$sum: "$rating" }, count:{$count: {}} , foodName :{'$first':'$result'}  }}  ]).skip(skip).limit(3)

    if(data2.length <= skip){
        let body = {
            message : 4000
        }
   
      return  res.send(body)
    }

    if(!data) return res.status(404).send('page not found')
    res.send(data)
})

router.get('/ratingcount', async (req,res)=>{
    const data = await Rating.find().count()
    if(!data) return res.status(404).send('page not found')

    let ress = {
        data : data
      }
    
      res.send(ress)
})

router.get('/rattingAvg/:foodId', async (req,res)=>{
    const d = await Rating.find({food_id: req.params.foodId}).count()
    const data = await Rating.aggregate([{$match : {food_id:mongoose.Types.ObjectId(req.params.foodId) }}, {$group: { _id: "$food_id",rateAv: {$sum: "$rating" }}}])
        // d.

      
    //    console.log(data[0].rateAv)

    if(data.length > 0){
        let f = (data[0].rateAv)/(d)
       
        let body = {
         avg: f,
         outOf: d
        }
 
     res.send(body)
    }else{
        let body = {
            avg: 0,
            outOf: 0
           }
        res.send(body)
    }

})


router.get('/rattingAvgAllFoods', async (req,res)=>{
    // const d = await Rating.find({food_id: req.params.foodId}).count()
    // const data = await Rating.aggregate([{$match : {food_id: req.params.foodId}}, {$group: { _id: "$food_id",rateAv: {$sum: "$rating" }}}])
        // d.

      const test = await Rating.aggregate([{$lookup :{from : "Food", localField:"food_id", foreignField:  "_id" , as: "joined"}}])
    //    console.log(data[0].rateAv)
 
    console.log(test)
    // res.send(test)

})

// to reset reviews
router.delete('/delReview/:pid', async (req,res)=>{
    const data = await Answer.deleteMany({food_id: req.params.pid})
    if(!data) return res.status(404).send('error on deleting  ')

    res.send('deleted Successfully!')

})


// to reset rating
router.delete('/delRating/:fid', async (req,res)=>{
    const data = await Rating.deleteMany({food_id: mongoose.Types.ObjectId(req.params.fid) })
    if(!data) return res.status(404).send('error on deleting  ')

    res.send('deleted Successfully!')

})

router.delete('/:qid', async (req,res)=>{
    const data = await FeedBackQuestions.findByIdAndDelete(req.params.qid)
    if(!data) return res.status(404).send('error on deleting question')

    const choose = await QuestionChoose.deleteMany({question_id:req.params.qid})
    if(!choose) return res.status(404).send('error on deleting question')

    const ans = await Answer.deleteMany({question_id: req.params.qid})
    if(!ans) return res.status(404).send('error on deleting question')

    res.send('deleted Successfully!')
})


router.delete('/choice/:cid', auth, async (req,res)=>{
    const data = await QuestionChoose.findByIdAndDelete(req.params.cid)
    if(!data) return res.status(404).send('error on deleting choice')

    const ans = await Answer.deleteMany({choose_id: req.params.cid})
    if(!ans) return res.status(404).send('error on deleting question')

    res.send('deleted Successfully!')

})


router.get('/questionWithChoice', async(req,res)=>{
    const data = await FeedBackQuestions.aggregate([
        {
            $lookup:
 
              {
                from: "questionchooses",
                localField: "_id",
                foreignField: "question_id",
                as: "result",
              },
          }
    ])
    if(!data) return res.status(404).send('error page not found')
    res.send(data)
})

 



module.exports=router;
