const mongoose=require('mongoose')

const tasksckema=mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    createAt:{type:Date, default:new Date },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    isDone:{type:Boolean ,default:false }
})

const TASK=mongoose.model('task',tasksckema)


module.exports=TASK