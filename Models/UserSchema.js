const mongoose = require('mongoose')


const userschema=mongoose.Schema({
    name:String,
    age:Number,
    email:{type:String , require:true},
    password:{type:String , require:true}
})


const User=mongoose.model('user', userschema)

module.exports=User