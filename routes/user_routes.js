const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const user= require('../model/user');
const auth = require('../auth');


router.post('/signup', (req,res,next)=>{
    let password = req.body.password;
    bcrypt.hash(password,10,function(err,hash){
        if(err){
            let err= new Error("could not hash password");
            err.status=500;
            return next(err);
        }
        user.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            username:req.body.username,
            password:hash,
            image:req.body.image
        }).then((user)=>{
            let token = jwt.sign({id:user._id},process.env.SECRETKEY);
            res.json({status:"signup success",token:token});
        }).catch(next);
    })

})

router.put('/editUser', auth.verifyUsers, (req, res, next) => {
    user.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, firstName: req.user.firstName, lastName: req.user.lastName, username: user.username, image: user.image });
        }).catch(next);
});

router.post('/login', (req, res, next) => {
    user.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
                        res.json({ status: 'Login success!', token: token ,user:user});
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;
//router.get()
