var mongoose=require('mongoose');
var express=require('express');
var app=express();
var  session=require('express-session');
var model=require('./model');
var user=model.usermodel;
var product=model.productmodel;
var hash=require('./hash');


app.use(session({secret:'Robert',resave:true,saveUninitialized:false}));

/* REGISTER USER */

function registeruser(name,password){
    mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/auth?retryWrites=true',{ useNewUrlParser: true },(err)=>{
        if(err) throw err;
        console.log('Connected for Login');
        var hpass=hash.encrypt(password);
        var user1=new user({
            _id:new mongoose.Types.ObjectId,
            name:name,
            password:hpass
        });

        user1.save((err)=>{
            if(err) throw err;
            console.log('User Registered!');
            
        });

    });

}

/* LOGIN */
function loginuser(name,password,res,req)
{
    
    mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/auth?retryWrites=true',{ useNewUrlParser: true },(err)=>{
    if(err) throw err;
    console.log('Connected for Login');
    user.findOne({name:name},(err,data)=>{
        if(err) throw err;
        if(password==data.password)
        {
            res.render('home');
            req.session.name=name

        }
        else
        res.send('Sorry! Try Again');
         
    });
    });
}




/*ADD PRODUCT */
function addproduct(req)
{
    mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/product?retryWrites=true',{ useNewUrlParser: true },(err)=>{
    console.log('Connected for Adding Product!');
    var product1=new product({
        _id:new mongoose.Types.ObjectId,
        name:req.query.name,
        price:req.query.price,
        date:req.query.date,
        image:req.query.image,
        desc:req.query.desc,
        username:req.session.name
    });

    product1.save((err)=>{
        if(err) throw err;
        console.log('Product Added!');
    })
    });
}


/* SHOW PRODUCTS */
function showproducts(resm){
    mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/product?retryWrites=true',{ useNewUrlParser: true },(err)=>{
        if(err) throw err;
        console.log('Connected for Showing Product!');
        product.find({},(err,res)=>{
            if(err) throw err;
            console.log('Sucess!')
            resm.render('products',{product:res});
        });

    });
}



module.exports.showproducts=showproducts;
module.exports.registeruser=registeruser;
module.exports.addproduct=addproduct;
module.exports.loginuser=loginuser;