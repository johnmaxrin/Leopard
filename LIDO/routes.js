var express=require('express');
var bodyparser=require('body-parser');
var dbf=require('./server')
var app=express();
var jwt=require('./jwt');


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.post('/register',(req,res)=>{
    
    dbf.registeruser(req,res);

    
});

app.post('/auth',(req,res)=>{
dbf.authuser(req,res);
});

app.get('/protected',(req,res)=>{
   jwt.verify(req,res) ;
});


app.post('/a',(req,res)=>{
    
    dbf.audioupload(req,res);
})

app.listen(1111,()=>{console.log('Listening to Port 1111')});