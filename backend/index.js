const express=require('express')
const app=express()
const port=3005;
const cors=require('cors')
const mongoose=require('mongoose')
const router=require('./Routes/UserRoute')
const cookieParser=require('cookie-parser')
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/',router)
mongoose.connect('mongodb+srv://kokatepk123:kokatepk123@cluster0.wixhnad.mongodb.net/?retryWrites=true&w=majority').then(()=>
app.listen(port,(req,res)=>{
    console.log(`database connected! i am listining on ${port}`)
})).catch((err)=>{
    console.log(err)
})

