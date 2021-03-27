import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null; // means the userInfo is based on the data that get from the user

const initialState ={cart: {cartItems, shipping: {}, payment: {} }, userSignin: { userInfo }, };
//const initialState ={};
const reducer = combineReducers ({    // a function that gets a state and action and return a new state based on that action
    productList: productListReducer ,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,


})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
); //thunk is a middle ware for redux and it allows us to run asing operation inside action in the redux

export default store;