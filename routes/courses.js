const express= require('express')
const router= express.Router();
const Joi = require('joi');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

courses=[
    {    id:1 , name:'course1'},
    {    id:2 , name:'course2'},
    {    id:3 , name:'course3'}
]

router.get('/',(req,res)=>{
    res.send(courses)
})

router.get('/:id',(req,res)=>{

    let course= courses.find(c=>c.id=== parseInt( req.params.id))

    if(!course) res.status(404).send('Not found')
    else res.send(course)

    
})
router.post('/',(req,res)=>{

    //Validation using Joi
    const {error}=    ValidateCourse(req.body); 
    if(error){
              res.status(400).send(error.details[0].message)
    }else{
    const course={
        id: courses.length +1,
        name: req.body.name
    };

    courses.push(course);
    res.send(courses);}
})
router.put('/:id',(req,res)=>{
    let course= courses.find(c=>c.id=== parseInt( req.params.id))

    if(!course) res.status(404).send('id Not found')
   // const result=    ValidateCourse(req.body);
   const {error}=    ValidateCourse(req.body);  // object destructuring
    if(error){
           res.status(400).send(error.details[0].message)
    }
    else{
        course.name= req.body.name;
        res.send(course);
    }

})
router.delete('/:id',[admin,auth],(req,res)=>{
    let course= courses.find(c=>c.id=== parseInt( req.params.id))
    if(!course) return res.status(404).send('id Not found')

    const index=courses.indexOf(course);
courses.splice(index);
res.send(course);


})
function ValidateCourse(course){
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()});
           return   schema.validate(course);
}
module.exports=router;