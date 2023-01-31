const { Socket } = require('dgram');
const http= require('http')

const server= http.createServer

((req,res)=>{
    if(req.url==='/'){
        res.write('Hello there :)')
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write(JSON.stringify([1,2,3,4,5]))
        res.end();
    }
})
// server.on('connection', (Socket)=>{
//     console.log('New connection')
// })
server.listen(3000);
console.log('Listen on Port 3000 ')
