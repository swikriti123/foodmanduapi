const express = require('express');
const router = express.Router();
const resturant= require('../model/resturant');
const auth = require('../auth');

router.get('/all',(req,res,next)=>{
   
    resturant.find({},(err,callbacks)=>{
        if(err){
            let err= new Error("could not hash password");
            err.status=500;
            return next(err);
        }
        res.json(callbacks);
    }) ;


});
router.post('/create',auth.verifyAdmin,(req,res,next)=>{
    resturant.create({
        name:req.body.name,
        address: req.body.address,
        restype:req.body.restype,
        deliveryhour:req.body.deliveryhour
    }).then((callbacks)=>{
        res.json({ status:"resturant created"});
    }).catch(next);
})
module.exports = router;