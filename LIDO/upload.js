var multer=require('multer')

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./audio');
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename);
    }
});

var upload=multer({storage:storage}).single('track');

module.exports.upload=upload;