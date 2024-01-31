const express = require('express')
const router=express.Router()
const {CreateTask , GetTask , deleteTask , UpdateTask}=require('../Controllers/TaskControllers')
const userMiddleware=require('../Middleware/UserMiddleware')

router.post('/createtask',userMiddleware,CreateTask)
router.get('/gettask',userMiddleware,GetTask)
router.delete('/deletetask/:id',userMiddleware,deleteTask)
router.put('/updatetask/:id',userMiddleware,UpdateTask)



module.exports=router

