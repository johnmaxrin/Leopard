var express=require('express');
var handlebar=require('express-handlebars');
var session=require('express-session');
var db=require('./db');
var hash=require('./hash')

var app=express();
 
app.engine('handlebars',handlebar());
app.set('view engine','handlebars');   
app.use(session({secret:'Robert',resave:true,saveUninitialized:false}));

app.get('/',(req,res)=>{
    
    res.render('intro');

});

app.get('/auth',(req,res)=>{ 
    db.registeruser(req.query.name,req.query.password,res);
    res.render('success');
});


app.get('/signup',(req,res)=>{
res.render('form1')
});

app.get('/login',(req,res)=>{
if(req.session.name)
{
    res.render('home')
}  
res.render('login');
});

app.get('/userauth',(req,res)=>{
db.loginuser(req.query.name,hash.encrypt(req.query.password),res,req);
req.session.name=req.query.name
}); 

app.get('/success',(req,res)=>{
    res.render('success');
});

app.get('/add',(req,res)=>{
    if(req.session.name) 
    {res.render('add');}
    else
    res.render('login')
});

app.get('/addp',(req,res)=>{
    if(req.session.name)
    {
        console.log("Adding Product!");
        db.addproduct(req,res);
        
    }
    res.render('login') 
});

app.get('/products',(req,res)=>{
    var data=db.showproducts(res);
    
});

app.get('/delete',(req,res)=>{
    console.log(req.query);
});
app.get('*',(req,res)=>{
    res.render('404')
});


 
app.listen(1233,()=>{console.log('Server Running on 1233')});
















































































 
















/*var schema=require("./model");

var express=require('express');
var crypto=require('./auth');
var bodyParser = require('body-parser');
const session =  require('express-session') ;
var exphbs  = require('express-handlebars');

var app=express();

app.use(session({secret: 's2it',resave:true,saveUninitialized:false}));
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/auth?retryWrites=true',{ useNewUrlParser: true },(err)=>{
if (err) throw err;
console.log("Connection Sucess");
});


app.get('/',(req,res)=>{

if(req.session.name)
{res.send('Success!');}
else
res.render('form1');
});


//********Sign Up********/

/*
app.get('/signup',(req,res)=>{
var name1=req.query.name;
var pass=req.query.password;
var hpass=crypto.encrypt(pass);
var user=new schema({
    _id:new mongoose.Types.ObjectId,
    name:name1,
    password:hpass
});
user.save((err)=>{
    if(err) throw err;
    console.log('Success!');
    });
res.render('success');
    });
    
//**********************/



//************Login**********//
/*
app.get('/login',(req,res)=>{ 

    console.log(req.session.name);
    res.render('login');
});

app.get('/auth',(req,res)=>{ 

  
    
        schema.findOne({name:req.query.name},(err,data)=>{
            if(err) throw err;
            if(crypto.encrypt(req.query.password)==data.password){
                res.send(req.session.name);
                req.session.name=res.query.name;
                
                
            }
            else    
            res.send("Fail!");
            
        });
    
        console.log(req.session.name);

    
});


app.get("*",(req,res)=>{
    res.render('404');
    });
app.listen(4003,()=>{console.log("Listening on Port 4003")});


*/



