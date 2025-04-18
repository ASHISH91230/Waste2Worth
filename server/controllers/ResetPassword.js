const User=require('../models/User')
const mailSender=require('../utils/mailSender')
const bcrypt=require('bcrypt')
const crypto = require("crypto");

exports.resetPasswordToken=async(req,res)=>{
    try{
        const email=req.body.email
        const user=await User.findOne({email:email})

        if(!user){
            return res.status(403).json({
                success:false,
                message:'User Not Registered'
            })
        }

        //Generating Random Bytes Token
        const token=crypto.randomBytes(20).toString('hex')
        const updatedDetails=await User.findOneAndUpdate({email:email},
            {token:token,
             resetPasswordExpires:Date.now()+(5*60*1000)
            },
            {new:true}
        )
        console.log('Updated User Information ',updatedDetails)

        const url=`http://localhost:3000/update-password/${token}`
        await mailSender(email,
            'Password Reset',
            `Link For Email Verification: ${url}`
        )
        return res.status(200).json({
            success:true,
            message:'Email Sent Successfully'
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}

exports.resetPassword=async(req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body

        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:'Password And Confirm Password Do Not Match'
            })
        }

        const userDetails=await User.findOne({token:token})
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token Is Invalid'
            })
        }

        if(!(userDetails.resetPasswordExpires>Date.now())){
            return res.status(403).json({
                success:false,
                message:'Token Is Expired'
            })
        }
        const encryptedPassword=await bcrypt.hash(password,10)
        await User.findOneAndUpdate(
            {token:token},
            {password:encryptedPassword},
            {new:true}
        )        
        return res.status(200).json({
            success:true,
            message:'Password Reset Successfully'
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}