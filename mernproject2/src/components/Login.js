import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from '../Slice'
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const history=useNavigate()
    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault();
        try{(async()=>{
            await axios.post('http://localhost:3005/login',{email,password}).then(()=>dispatch(login)).then(()=>history('/user'))
        })();}catch(err){console.log(err)}
      
     }
    return (
    <>
    <div>Login</div>
    <form className='form' onSubmit={submitHandler}>
      <input type='text'placeholder='Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type='text'placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default Login