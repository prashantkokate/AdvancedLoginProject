import {createSlice,configureStore} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:false
    },
    reducers:{
        login:(state)=>{
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.isLoggedIn=false
        }
    }
})

const store=configureStore({
    reducer:authSlice.reducer
})
export const {login,logout}=authSlice.actions
export default store