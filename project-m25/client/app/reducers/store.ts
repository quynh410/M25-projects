import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import productsReducer from "./reducer/productsReducer";
import categoriesReducer from "./reducer/categoriesReducer";
import cartReducer from "./reducer/cartReducer";
import orderReducer from "./reducer/orderReducer";
import wishListReducer from "./reducer/wishListReducer";

const store = configureStore({
    reducer:{
        userReducer,
        productsReducer,
        categoriesReducer,
        cartReducer,
        orderReducer,
        wishListReducer,
    }
})
export default store