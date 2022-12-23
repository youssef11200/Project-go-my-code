import {
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, product: [] };
    case PRODUCT_LIST_SUCCESS:
     
      return { loading: false,
        pages:payload.pages,
        page:payload.page,
        products: payload.products };

    case PRODUCT_LIST_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
//single product
export const productDetailReducer = (
  state = { product: { reviews: [] } },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };

    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
//product review create
export const productCreateReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    case PRODUCT_CREATE_REVIEW_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
