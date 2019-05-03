var jwt=require('jsonwebtoken');

function createtoken(user,res)
{

var token=jwt.sign({id:user},'leopard|Lido',{expiresIn:604800})
res.json({
auth:true,
token:token,
message:'Success'
});


}


function verify(req,res){
var token=req.headers['access-token'];

if(token)
{
    jwt.verify(token,'leopard|Lido',(err,decode)=>{
        if(err){
            res.json({message:'Token Error'})
        }
        else{
            req.decode=decode;
            res.json({
                message:'Success',
                decode:decode
            });
        }
    })

}
else{
    res.json({message:'no token provided'})
}
}


module.exports.verify=verify;
module.exports.createtoken=createtoken;