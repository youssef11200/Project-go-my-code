import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCES, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCES, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCES, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCES } from "../constants/userConstant"

//LOGIN
export const userLoginReducer= (state = {}, { type, payload }) => {
  switch (type) {

  case USER_LOGIN_REQUEST:
    return { loading:true }
    case USER_LOGIN_SUCCES:
    return { loading:false,userInfo:payload}
    case USER_LOGIN_FAIL:
    return { loading:false,error:payload }
    case USER_LOGOUT:
    return { }

  default:
    return state
  }
}
//RGISTER
export const userRegisterReducer= (state = {}, { type, payload }) => {
  switch (type) {

  case USER_REGISTER_REQUEST:
    return { loading:true }
    case USER_REGISTER_SUCCES:
    return { loading:false,userInfo:payload}
    case USER_REGISTER_FAIL:
    return { loading:false,error:payload }
   

  default:
    return state
  }
}
//USER DETAILS

export const userDetailsReducer= (state = {user:{}}, { type, payload }) => {
  switch (type) {

  case USER_DETAILS_REQUEST:
    return { ...state,loading:true }
    case USER_DETAILS_SUCCES:
    
    return { loading:false,user:payload}
    case USER_DETAILS_FAIL:
 
    return { loading:false,error:payload }
    case USER_DETAILS_RESET:
      return { user:{} }
   

  default:
    return state
  }
}
//UPDATE PROFILE

export const userUpdateProfileReducer= (state = {}, { type, payload }) => {
  switch (type) {

  case USER_UPDATE_PROFILE_REQUEST:
    return { loading:true }
    case USER_UPDATE_PROFILE_SUCCES:
    return { loading:false,success:true,userInfo:payload}
    case USER_UPDATE_PROFILE_FAIL:
    return { loading:false,error:payload }
    default:
    return state
  }
}
