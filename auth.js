const jwt= require('jsonwebtoken');
const user = require('./model/user');


//check users
module.exports.verifyUsers = (req,res,next)=>{
    let authHeader= req.headers.authorization;
    if(!authHeader){
        let err= new Error("Bearer token not provided");
        err.status=401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try{
        data=jwt.verify(token,process.env.SECRETKEY);
    }
    catch(err){
        throw new Error('Token could not be verified');
    }
    user.findById(data._id).then((user)=>{
        req.user=user;
        next();
    })
}
//check reqested user is admin or not
module.exports.verifyAdmin=(req,res,next)=>{
    if(!req.user){
        let err= new Error('Unauthorized');
        err.status=403;
        return next(err);
    }
    if(req.user.admin !=true){
        let err= new Error('Forbidden');
        err.status=403;
        return next(err);
    }
    next();
}