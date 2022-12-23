import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,

  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
const initialState={
  prds:[],
  loading:false,
  error:null,
  success:false,
  product:{},
}
// ALL PRODUCT
export const productListReducer = (state = initialState , { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state,loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state,loading: false, prds: payload };
    case PRODUCT_LIST_FAIL:
      return { ...state,loading: false, error: payload };
    default:
      return state;
  }
};
// DELETE PRODUCT
export const productDeleteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state,loading: true, prds: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state,loading: false, success: true };
    case PRODUCT_LIST_FAIL:
      return { ...state,loading: false, error: payload };
    default:
      return state;
  }
};
// CREATE PRODUCT
export const productCreateReducer = (state = initialState , { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state,loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state,loading: false, success: true, product: payload };
    case PRODUCT_CREATE_FAIL:
      return { ...state,loading: false, error: payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// UPDATE PRODUCT
export const productUpdateReducer = (state = initialState , { type, payload }) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state,loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state,loading: false, success: true, product: payload };
    case PRODUCT_UPDATE_FAIL:
      return { ...state,loading: false, error: payload };
    case PRODUCT_UPDATE_RESET:
      return { ...state,product:{} };

    default:
      return state;
  }
};
