import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateProducts } from "./products.service";

export const getAllCart:any = createAsyncThunk("cart/getAllCart",
    async()=>{
        let response = await axios.get("http://localhost:8080/cart");
        return response.data;
    }
)
export const getCartById:any =  createAsyncThunk("cart/getCartById",
    async(id:number)=>{
        let response = await axios.get(`http://localhost:8080/cart?user_id_like=${id}`);
        return response.data;
    }
)
export const addToCart: any = createAsyncThunk("cart/addToCart",
    async(data:any)=>{
        let response = await axios.post(`http://localhost:8080/cart`,data);
        return response.data;
    }
)

export const updateCart: any = createAsyncThunk("cart/updateCart",
    async(data:any)=>{
        let response = await axios.patch(`http://localhost:8080/cart/${data.id}`,data);
        return response.data;
    })
export const deleteCart:any = createAsyncThunk("cart/deleteCart",
    async(id:number)=>{
        let response = await axios.delete(`http://localhost:8080/cart/${id}`);
        return id;
    })

// tăng 
export const increaseQuantity: any = createAsyncThunk("cart/increaseQuantity",
    async(id:number)=>{
        let response = await axios.patch(`http://localhost:8080/cart/${id}`);
        return response.data;
    })
    // xóa
export const decreaseQuantity: any = createAsyncThunk("cart/decreaseQuantity",
    async(id:number)=>{
        let response = await axios.patch(`http://localhost:8080/cart/${id}`);
        return response.data;
    })
// 
export const updateCartQuantity:any = createAsyncThunk("cart/updateCartQuantity",
    async({itemId,quantity}:{itemId:number, quantity:number})=>{
        const response = await axios.get(`http://localhost:8080/cart/${itemId}`);
        const exist = response.data;
        const updateProduct = {...exist.products, quantity:quantity}
        const upadateCart = {...exist, products:updateProduct}
        await axios.patch(`http://localhost:8080/cart/${itemId}`,upadateCart)
        return upadateCart;
    }
)

