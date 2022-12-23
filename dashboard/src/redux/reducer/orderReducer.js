import { ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_RESET, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstant";
const initiaState={
  loading:true,
  orders:[],
  error:null,
  orderItems:[],
  shippingAdress:{},
  success:false
}
// ALL ORDER
export const orderListReducer = (state = initiaState, { type, payload }) => {
    switch (type) {
      case ORDER_LIST_REQUEST:
        return { ...state,loading: true };
      case ORDER_LIST_SUCCESS:
        return { ...state,loading: false, orders: payload };
      case ORDER_LIST_FAIL:
        return { ...state,loading: false, error: payload };
      default:
        return state;
    }
  };

  // ORDER DETAILS
  export const orderDetailsReducer = (
    state = initiaState, { type, payload }
    ) => {
    switch (type) {
      case ORDER_DETAILS_REQUEST:
        return {...state , loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { ...state,loading: false, orders: payload };
      case ORDER_DETAILS_FAIL:
        return {...state, loading: false, error: payload };
      default:
        return state;
    }
  };
  // ORDER DELIVERED
  export const orderDeliveredReducer = (
    state = { initiaState }, { type, payload }
    ) => {
    switch (type) {
      case ORDER_DELIVERED_REQUEST:
        return {...state,loading: true };
      case ORDER_DELIVERED_SUCCESS:
        return { ...state,loading: false, succes: true };
      case ORDER_DELIVERED_FAIL:
        return { ...state,loading: false, error: payload };
        case ORDER_DELIVERED_RESET:
          return {  };
      default:
        return state;
    }
  };



