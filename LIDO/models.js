var mongoose= require("mongoose");


var userschema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name: String,
    password: String,
    username:String,
    email:String
},{collection:"users"});
var usermodel=mongoose.model("User",userschema);

module.exports.usermodel=usermodel;