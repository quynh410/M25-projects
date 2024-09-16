import { Orders } from "@/app/interface/order";
import { addOrder, getAllOrder } from "@/app/services/admin/order.service";
import { createSlice } from "@reduxjs/toolkit";

const orderState:Orders[]= []

const orderReducer = createSlice({
    name:"orders",
    initialState:{
        orders:orderState,
        // orderDetail: {}  // chi tiết đơn hàng nếu có
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrder.fulfilled,(state,action)=>{
            state.orders = action.payload;
        })
        .addCase(addOrder.fulfilled,(state,action)=>{
            state.orders.push(action.payload);
        })
    }
})
export default orderReducer.reducer;