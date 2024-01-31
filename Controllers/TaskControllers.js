const TASK = require('../Models/TaskSchema')


const CreateTask=async(req,res)=>{
    try {
        const {title,description,userId}=req.body
        const newTask=await TASK.create({title,description,owner:userId })
        res.status(201).json({msg:'task created',newTask})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const GetTask=async(req,res)=>{
    try {
       const {userId}=req.body
        const Tasks=await TASK.find({owner:userId })
        res.status(201).json({msg:'tasks getted',Tasks})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const deleteTask=async(req,res)=>{
    try {
        const removetask=await TASK.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg:'tasks deleted',removetask})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

const UpdateTask=async(req,res)=>{
    try {
       const {userId}=req.body
        const updatetask=await TASK.findByIdAndUpdate({ _id:req.params.id } , req.body ,{new:true} )
        res.status(201).json({msg:'tasks Updated',updatetask})
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

module.exports={CreateTask , GetTask , deleteTask , UpdateTask}