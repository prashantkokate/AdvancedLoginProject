
import './App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Welcome from './components/Welcome';
import { Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'
function App() {
 const isLoggedIn=useSelector(state=>state.isLoggedIn)
 console.log(isLoggedIn)
  return (
    <>
    <header>
      <Header/>
    </header>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/user' element={<Welcome/>}/>
    </Routes>
    </>
    
  );
}

export default App;
