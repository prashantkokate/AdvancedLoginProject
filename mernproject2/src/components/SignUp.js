import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
 const [name,setName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const history=useNavigate()
 const submitHandler=(e)=>{
    e.preventDefault();
    try{(async()=>{
        await axios.post('http://localhost:3005/signup',{name,email,password}).then(()=>history('/login'))
    })();}catch(err){console.log(err)}
  
 }
 return (
    <>
    <div>SignUp</div>
    <form className='form' onSubmit={submitHandler}>
      <input type='text'placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type='text'placeholder='Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type='text'placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>SignUP</button>
    </form>
    </>
  )
}

export default SignUp