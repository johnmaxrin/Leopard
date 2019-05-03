var model=require('./models');
var user=model.usermodel;
var mongoose=require('mongoose');
var jwt=require('./jwt');
var upload=require('./upload');

function registeruser(req,res)
{
    mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/Lido?retryWrites=true',{ useNewUrlParser: true },(err)=>{
        if(err) throw err;

        console.log('Success!! ');
        var newuser=new user({
            _id:new mongoose.Types.ObjectId,
            name:req.body.name,
            password:req.body.password,
            username:req.body.username,
            email:req.body.email
        });
        newuser.save((err)=>{
            if(err) throw err;
            console.log('User Registered!');
            res.status(200).send('User Registered!');
            
        });
    })
}



function authuser(req,res)
{
    mongoose.connect('mongodb+srv://roks:28284211dns.@cluster0-41kbo.mongodb.net/Lido?retryWrites=true',{ useNewUrlParser: true },(err)=>{
        if(err) throw err;
        console.log(req.body);
        console.log('Connected for Login!');
        user.findOne({username:req.body.username},(err,data)=>{
            if(err) return res.status(400);
            if(data.password==req.body.password)
            jwt.createtoken(req.body.username,res);
            
                
        });
    });

}

function audioupload(req,res)
{
    
console.log('Entered!!')
upload.upload(req,res,(err)=>{
    
    if(err) throw err;
    res.json({
        message:'File Uploaded',
        value:1
    });
})
}


module.exports.audioupload=audioupload;
module.exports.authuser=authuser;
module.exports.registeruser=registeruser;