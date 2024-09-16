import { Cart } from "@/app/interface/cart";
import { addToCart, deleteCart, getAllCart, getCartById, increaseQuantity, updateCart, updateCartQuantity } from "@/app/services/admin/cart.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartState:Cart[] = []
const cartReducers  = createSlice({
    name:"cart",
    initialState:{
        cart:cartState,
        totalPrice:0
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getCartById.fulfilled,(state,action)=>{
            state.cart = action.payload
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.cart.push(action.payload)
        })
        .addCase(updateCart.fulfilled,(state,action)=>{
            const update = state.cart.findIndex((item: Cart) => item.id === action.payload.id)
            if(update !== -1){
                state.cart[update].products.quantity = action.payload.products.quantity
            }
        })
        .addCase(deleteCart.fulfilled,(state,action)=>{
            state.cart = state.cart.filter((cart:Cart )=> {
                return cart.id !== action.payload
               })
               console.log(11111111,action.payload);
            })
        .addCase(increaseQuantity.fulfilled,(state,action)=>{
            const update = state.cart.findIndex((item: Cart) => item.id === action.payload.id)
            if(update!== -1){
                state.cart[update].products.quantity += 1
            }
        })
        .addCase(updateCartQuantity.fulfilled,(state,action:PayloadAction<any>)=>{
            const update = action.payload
            const index = state.cart.findIndex((item: Cart) => item.id === update.id)
            if(index!== -1){
                state.cart[index] = update
                state.totalPrice = state.cart.reduce((total, item) => total + (item.products.unit_price * item.products.quantity), 0)
            }
        })
        .addCase(getAllCart.fulfilled,(state,action)=>{
            state.cart = action.payload
        })
    }
})
export default cartReducers.reducer;
