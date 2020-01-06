const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }

});
module.exports=mongoose.model('user',userSchema);