import {

  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
 


} from '../constants/userConstant';
const initialState={
  users:[],
  userInfo:{},
  loading:false,
  error:null

}
// LOGIN
export const userLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state,loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { ...state,loading: false, error: payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return {...state, loading: false, users: payload };
    case USER_LIST_FAIL:
      return { ...state,loading: false, error: payload };
    case USER_LIST_RESET:
      return {...state,users:[]};

    default:
      return state;
  }
};
