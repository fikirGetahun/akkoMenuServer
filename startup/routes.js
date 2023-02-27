
const express= require('express')
const error = require('../middleware/error');
const courses=require('../routes/courses');
const customers=require('../routes/customers');
const home=require('../routes/home');
const users=require('../routes/users');
const auth=require('../routes/auth');
const category = require('../routes/category')
const food = require('../routes/food')
const price = require("../routes/price")
const feedBackQuestion = require('../routes/feedBack');

module.exports=function(app){
app.use(express.json());
app.use('/api/courses',courses);
app.use('/',home);
app.use('/api/customers',customers);
app.use('/api/category', category)
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/food', food )
app.use('/api/price', price )
app.use('/api/feedback', feedBackQuestion)

app.use(error);
}