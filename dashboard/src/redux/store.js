import {createStore,combineReducers,applyMiddleware} from"redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { userListReducer, userLoginReducer } from "./reducer/userReducer";
import { productCreateReducer, productDeleteReducer, productListReducer, productUpdateReducer } from "./reducer/ProductReducer";
import { orderDeliveredReducer, orderDetailsReducer, orderListReducer } from "./reducer/orderReducer";

const reducer=combineReducers({
    userLogin:userLoginReducer,
    userList:userListReducer,
    productList:productListReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
 
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDetails:orderDetailsReducer,
    orderDelivered:orderDeliveredReducer,
    });


const useFromLocalStorage=localStorage.getItem("userInfo")
?JSON.parse(localStorage.getItem("userInfo")):null


const initialState={
 
    userLogin:{userInfo:useFromLocalStorage}
}

const middleware=[thunk]
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store