
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../Models/UserSchema')
const { validationResult }=require('express-validator')

const   Register=async(req,res)=>{
   // Afiiche lerreurs
   
    
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
         res.status(400).json({msg:errors.array()})
        }else{
            const {name,age,email,password}=req.body
            const existUser= await User.findOne({email:email})
            if(existUser){
                res.status(400).json({msg:'User already exist ! pls login '})
            }else{
            const  hashPW=await bcrypt.hash(password ,10 )
            const newUser = await User.create({name,age,email,password:hashPW})
            const token=await jwt.sign({id:newUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
            res.status(200).json({masg:'Register Done', token})
            }

        }
       
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }

}


const Login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser=await User.findOne({email:email})
        if(!existUser){
           res.status(400).json({msg:'make sure to register first !!'})
        }else{
            const verifyPw=await bcrypt.compare(password,existUser.password)
            if(!verifyPw){
                res.status(400).json({msg:'wrong password pl try again !'})
            }else{
                const token=await jwt.sign({id:existUser._id},process.env.JWT_TOKEN,{expiresIn:"7d"})
                res.status(200).json({msg:"Login done !",token} )
            }
        }


    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})

    }
}

const Userdata=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.userId})
        if(!user){
            res.status(400).json({msg:' user not exist !'})


        }else{
            res.status(201).json({msg:'het user datac!',user})
        }
    } catch (error) {
        res.status(500).json({msg:'somthing wrong'})
    }
}

module.exports={Register , Login ,Userdata }