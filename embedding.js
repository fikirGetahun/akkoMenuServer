const mongoose= require('mongoose');
const Joi = require('joi');
const Fawn=require('fawn');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/Playground').then(()=>{
    console.log('connected to MongoDb ...')
}).catch((error)=>{
    console.error('Could not connect to MongoDB ...', error);
});
Fawn.init(mongoose);

const authorSchema=new mongoose.Schema({
    name:{type:String, required:true,
        minlength:5,
        maxlength:50
    },
bio:String,
website:String
});
const Author=mongoose.model('Author',authorSchema);

const Course=mongoose.model('Course',new mongoose.Schema({
    name:String,
    authors:{type:[authorSchema],
        required:true}
}))


async function createAuthor(name,bio,website){
    const author=new Author({
        name,bio,website
    });
    const result=await author.save();
    console.log(result);
}

async function createCourse(name,authors){
    const course=new Course({
        name,
        authors
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

async function addAuthor(courseId,author){
    const course= await Course.findById(courseId);
course.authors.push(author);
course.save();
}

async function removeAuthor(courseId,authorId){
    const course= await Course.findById(courseId);

    const author =course.authors.id(authorId);
    author.remove();
    course.save();
    console.log('Author id', author);
}
// createAuthor('Tsega','My bio','My Website');
// createCourse('Node js',[ 
//      new Author({name:'Tsega Tadele'}),
//      new Author({name:'Maedot Tsega'}),
     
// ]);
// // remove item from menu
removeAuthor('6395ac11d560a40d237f36e8','6395ac11d560a40d237f36e5')
   // add item to the menu
//addAuthor('6395ac11d560a40d237f36e8',new Author({name:'Tomas sancara'}));
 //listCourses();