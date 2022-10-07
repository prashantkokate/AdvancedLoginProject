import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../Slice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials=true
const Header = () => {
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  const dispatch=useDispatch
  const history=useNavigate()
  const handleLogout=()=>{
    (async()=>{
    const response=await axios.post('http://localhost:3000/logout',null,{
      withCredentials:true
    })
    })().then(()=>dispatch(logout)).then(history('/'))
  }
  return (
    <div className='header'>
        <h2>MERNAuth</h2>
       <Link to='/signup'><h2>SignUP</h2></Link> 
       <Link to='/login'><h2>LOGIN</h2></Link>
       <Link to='/logout'><h2 onClick={handleLogout}>LOGOUT</h2></Link>
    </div>
  )
}

export default Header
