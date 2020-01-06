const express = require('express');
const router =express.Router();
const items = require('../model/item');
const auth = require('../auth');

router.post('/create',(req,res,next)=>{
    items.create({
        itemname:req.body.itemname,
        price:req.body.price,
        detail:req.body.detail,
        item_category:req.body.item_category,
        resturant:req.body.resturant,
        image:req.body.image
    }).then((callbacks)=>{
        res.json( {status:"item created successfully",callback:callbacks});
        console.log(callbacks);
    }).catch(next);

});

router.get('/all',(req,res,next)=>{
    items.find({},(err,callback)=>{
        if(err){
            let err = new Error('Error finding items');
                err.status = 401;
                return next(err);
        }
        res.json(callback)
    });
});
module.exports=router;