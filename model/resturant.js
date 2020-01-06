const mongoose = require('mongoose');

let resturantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    restype:{
        type:String,

    },
    deliveryhour:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model('resturant',resturantSchema);