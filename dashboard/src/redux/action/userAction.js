import axios from 'axios';
import { toast } from 'react-toastify';
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

// LOGIN
export const Login = (email, password) => async (dispatch) => {
  const ToastObject = {
    pauseOnFocusLoss: false,
    draggable: false,
    PauseOnHover: true,
    autoClose: 2000,
  };
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/user/login', { email, password }, config);
    if (!data.isAdmin) {
      toast.error('you are Not admin', ToastObject);
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    }
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};
// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};
// ALL USER
export const listUser = () => async (dispatch,getstate) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin:{userInfo}}=getstate()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const  {data}  = await axios.get('/user',  config);
    dispatch({type:USER_LIST_SUCCESS , payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};
