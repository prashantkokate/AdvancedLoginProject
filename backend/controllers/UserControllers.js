const User=require('../model/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwt_secret_key='kokatepk123'
const signUp= async(req,res)=>{
   const{name,email,password}=req.body
   let existinguser; 
   try{
    existinguser=await User.findOne({email:email})
   }catch(err){
    console.log(err)
   }
   if(existinguser){
    return res.status(400).json({message:`user allready exist`})
   }
   const hashedPassword=bcrypt.hashSync(password)
   const user=new User({ name, email,password:hashedPassword,});
    try{
    await user.save()
   }catch(err){
    console.log(err)
   }
   return res.status(201).json({message:`user Added sucessfully`})

}
const login=async(req,res)=>{
    const {email,password}=req.body
    let existinguser;
    try{
        existinguser=await User.findOne({email:email})
    }catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(400).json({message:`user not found please SignUP`})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existinguser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:`invalid password/email`})
    }
    const token=jwt.sign({id:existinguser.id},jwt_secret_key,{expiresIn:'1hr'})
    console.log(token)
    res.cookie(String(existinguser.id),token,{
        path:'/',
        expiresIn:'1hr',
        httpOnly:true,
        sameSite:'lax'//security reason
    })
    return res.status(200).json({message:`login sucessfully`,user:existinguser,token})
}
const verifyToken=async(req,res,next)=>{
    const cookies=req.headers.cookie
   const token=cookies.split("=")[1]
   console.log(token)
   if(!token){
      return res.status(400).json({message:`token not found`})
    }
    jwt.verify(String(token),jwt_secret_key,(err,user)=>{
        if(err){
          return  res.status(400).json({message:`invalid token`})
        }
      
       req.id=user.id
     
    })
     next();
}  
const getUser=async(req,res)=>{
   const userId=req.id
   let user;
   try{
    user=await User.findById(userId,'password')
    console.log(user)
   }catch(err){
    console.log(err)
   }
   if(!user){
    return res.status(404).json({message:`user not found`})
   }
   return res.status(200).json({user})
   
} 
const logout=async(req,res)=>{
    const cookies=req.headers.cookie
    const token=cookies.split('=')[1]
    if(!token){
        return res.status(400).json({message:`token not found`})
      }
      jwt.verify(String(token),jwt_secret_key,(err,user)=>{
          if(err){
            return  res.status(400).json({message:`invalid token`})
          }
          res.clearCookie(`${user.id}`)
          req.cookies[`${user.id}`]=''
          return res.status(200).json({message:'SucessFully logged out'})
    })
    
}
exports.signUp=signUp
exports.login=login
exports.verifyToken=verifyToken
exports.getUser=getUser
exports.logout=logout