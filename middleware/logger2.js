function log(req,res,next){
    console.log('Lodding . . .')
    next();
}
function Authenticate(req,res,next){
    console.log('Authenticate me . . .')
    next();
}
module.exports ={log,Authenticate};