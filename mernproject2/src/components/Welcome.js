
import React, { useEffect, useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials=true;
const Welcome = () => {
  const [data,setData]=useState('')
 
    return (
    <div>Welcome</div>
  )
}

export default Welcome
