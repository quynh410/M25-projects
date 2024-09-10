import { Products } from "@/app/interface/products";
import { addProducts, deleteProducts, getAllProducts, searchProducts, sortProducts, updateProducts } from "@/app/services/admin/products.service";
import { createSlice } from "@reduxjs/toolkit";

const productState:Products[]= []

const productReducer = createSlice({
    name:"producta",
    initialState:{
        products:productState,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        .addCase(searchProducts.fulfilled,(state, action) => {
            state.products = action.payload
        })
        .addCase(sortProducts.fulfilled,(state, action)=>{
            state.products = action.payload
        })
        .addCase(deleteProducts.fulfilled,(state, action)=>{
           state.products = state.products.filter((product:any )=> {
            return product.product_id!== action.payload
           })
        })
        .addCase(updateProducts.fulfilled ,(state, action)=>{
            let index = state.products.findIndex((product:any)=>{
                return product.product_id === action.payload.product_id
            })
            if(index!== -1){
                state.products[index] = action.payload
            }
        })
        .addCase(addProducts.fulfilled,(state,action)=>{
            state.products.push(action.payload)
        })
    }
})
export default productReducer.reducer