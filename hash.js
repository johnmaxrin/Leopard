var crypto=require('crypto');


function encrypt (text){
    var cipher=crypto.createCipher('aes-128-ccm',text);
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

module.exports.encrypt=encrypt;
