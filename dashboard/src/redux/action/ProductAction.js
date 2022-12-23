import axios from 'axios';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import { logout } from './UserAction';

// ALL PRODUCT
export const listProduct = () => async (dispatch, getstate) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/product', config);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};
// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getstate) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/product/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};
// Create product
export const addProduct = (newProduct, navigate) => async (dispatch,getstate) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const opts = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
    const response = await axios.post(
      "/product/addProduct",
      newProduct,
      opts
    );
    console.log(response);
    dispatch({ type: PRODUCT_CREATE_SUCCESS });
    dispatch(listProduct());
    navigate("/");
  } catch (error) {
 
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  
  }
};
// EDIT product
export const editProduct = 
(id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(`/product/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};
// UPDATE PRODUCT
export const updateProduct = 
(product) => async (dispatch, getstate) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };
    const { data } = await axios.put(`/product/${product._id}`,product, config);
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.response;
    if (message === 'Not autorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};