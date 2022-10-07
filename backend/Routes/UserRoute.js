const express=require('express')
const router=express.Router()
const {signUp,login, verifyToken,getUser,logout}=require('../controllers/UserControllers')
router.post('/signup',signUp)
router.post('/login',login)
router.get('/user',verifyToken,getUser)    
router.post('/logout',verifyToken, logout)
module.exports=router