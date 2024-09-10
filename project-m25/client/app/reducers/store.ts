import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import productsReducer from "./reducer/productsReducer";
import categoriesReducer from "./reducer/categoriesReducer";

const store = configureStore({
    reducer:{
        userReducer,
        productsReducer,
        categoriesReducer,
    }
})
export default store