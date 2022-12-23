import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCES, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCES, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCES, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCES } from "../constants/userConstant"
import axios from 'axios'
import { ORDER_LIST_MY_RESET } from "../constants/orderConstant"
import { CART_CLEAR_ITEMS } from "../constants/cartContant"
export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post("/user/login",{email,password},config)
        dispatch({type:USER_LOGIN_SUCCES,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
            ?error.response.data.message
            :error.message,
        })
        
    }
}
//LOGOUT
export const logout=()=>(dispatch)=>{
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
  
    dispatch({type: CART_CLEAR_ITEMS})
    dispatch({type: ORDER_LIST_MY_RESET})
    // document.location.href="/login"
}
//REGISTER
export const register=(name,email,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQUEST})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post("/user",{name,email,password},config)
        dispatch({type:USER_REGISTER_SUCCES,payload:data})
        dispatch({type:USER_LOGIN_SUCCES,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message
            ?error.response.data.message
            :error.message,
        })
        
    }
}
//USER DETAILS
export const getUserDetails=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST})
        const {
            userLogin:{userInfo},
            }=getState()
        const config={
            headers:{
               Authorization:`Bearer ${userInfo.token}`
            }
        }    
      
      
        const {data}=await axios.get(`/user/${id}`,config )
        console.log(data)
        dispatch({type:USER_DETAILS_SUCCES,payload:data})

       
    } catch (error) {
        const message=
        error.response && error.response.data.message
        ?error.response.data.message
        :error.message;
        if (message === "Not autorized, token failed") {
            dispatch(logout())
        }
        dispatch({
          
            type: USER_DETAILS_FAIL,
            payload:message,
          
        })
        
    }
};
//UPDATE PROFILE
export const updateProfile=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST})
        const{
            userLogin:{userInfo},
        }=getState()
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`,


            }
        }
        const {data}=await axios.put('/user/profile',user,config)
       
        dispatch({type:USER_UPDATE_PROFILE_SUCCES,payload:data})
        dispatch({type:USER_LOGIN_SUCCES,payload:data})
        localStorage.setItem(userInfo,JSON.stringify(data))
    } catch (error) {
                const message=
        error.response && error.response.data.message
        ?error.response.data.message
        :error.message;
        if (message === "Not autorized, token failed") {
            dispatch(logout())
        }
        dispatch({
          
            type: USER_UPDATE_PROFILE_FAIL,
            payload:message,
          
        })
        
    }
}