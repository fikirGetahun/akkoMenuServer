const mongoose= require('mongoose');
const Joi = require('joi');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/Population').then(()=>{
    console.log('connected to MongoDb ...')
}).catch((error)=>{
    console.error('Could not connect to MongoDB ...', error);
});

const Author=mongoose.model('Author',new mongoose.Schema({
    name:{type:String, required:true,
        minlength:5,
        maxlength:50
    },
bio:String,
website:String
}))

const Course=mongoose.model('Course',new mongoose.Schema({
    name:String,
    author:{type: mongoose.Schema.Types.ObjectId,
    ref:'Author'}
}))


async function createAuthor(name,bio,website){
    const author=new Author({
        name,bio,website
    });
    const result=await author.save();
    console.log(result);
}

async function createCourse(name,author){
    const course=new Course({
        name,
        author
    });
    const result=await course.save();
    console.log(result);
}

async function listCourses(){
    const courses=await Course
    .find()
    .populate('author','name -_id')
    .select('name');
    console.log(courses);
}

//createAuthor('Tsega','My bio','My Website');
//createCourse('Node js','6395a0d07ea78a4bbe965ec2');
listCourses();