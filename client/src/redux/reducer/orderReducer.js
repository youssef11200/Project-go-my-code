import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCES,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCES,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCES,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCES,
} from "../constants/orderConstant";
//create order
export const orderRducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCES:
      return { loading: false, succes: true, order: payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: payload };
    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
//order details
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddres: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCES:
      return { loading: false, order: payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
//order pay
export const orderPayReducer = (
  state = { loading: true, orderItems: [], shippingAddres: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCES:
      return { loading: false, success: payload };
    case ORDER_PAY_FAIL:
      return { loading: false, error: payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};
//user orders
export const orderListMyReducer = (
  state = { orders:[]},
  { type, payload }
) => {
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case ORDER_LIST_MY_SUCCES:
      return { loading: false, orders: payload };
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: payload };
    case ORDER_LIST_MY_RESET:
      return {orders:[]};

    default:
      return state;
  }
};


