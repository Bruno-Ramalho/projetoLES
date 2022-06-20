import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer
} from "./reducers/productReducers";
import { userRegisterReducer, userSigninReducer, userDetailsReducer, userUpdateReducer, userPasswordReducer, userListReducer } from "./reducers/userReducer";
import { endRegisterReducer, endListReducer, endDetailsReducer, endUpdateReducer, endRemoveReducer } from "./reducers/endReducers";
import { payCardRegisterReducer, payCardListReducer, payCardDetailsReducer } from "./reducers/payCardReducer";
import { orderDetailsReducer, orderCreateReducer, orderListReducer, orderGraphReducer, orderDetailsCreateReducer } from "./reducers/orderReducers";
import { orderUserListReducer } from "./reducers/orderReducers";
import { orderChangeStatusReducer } from "./reducers/orderReducers";
import { listCupomReducer, registerCupomReducer, detailsCupomReducer } from "./reducers/cupomReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  },
  cart: {
    cartItems: localStorage.getItem("cartItens")
      ? JSON.parse(localStorage.getItem("cartItens"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("savePaymentMethod")
      ? JSON.parse(localStorage.getItem("savePaymentMethod"))
      : {},
  }
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  passwordUpdate: userPasswordReducer,
  endRegister: endRegisterReducer,
  endList: endListReducer,
  endDetails: endDetailsReducer,
  endUpdate: endUpdateReducer,
  endRemove: endRemoveReducer,
  payCardRegister: payCardRegisterReducer,
  payCardList: payCardListReducer,
  payCardDetails: payCardDetailsReducer,
  createOrder: orderCreateReducer,
  detailsOrder: orderDetailsReducer,
  ListOrder: orderUserListReducer,
  allOrder: orderListReducer,
  changeOrderStatus: orderChangeStatusReducer,
  createCupom: registerCupomReducer,
  cupomList: listCupomReducer,
  detailCupom: detailsCupomReducer,
  orderGraph: orderGraphReducer,
  createDetails: orderDetailsCreateReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
