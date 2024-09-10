import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts:any = createAsyncThunk("products/getAllproducts",
    async()=>{
        const response = await axios.get("http://localhost:8080/products");
        return response.data;
    }
)
export const searchProducts:any = createAsyncThunk("products/searchProduct", async (products:any) => {
    const response = await axios.get(`http://localhost:8080/products?product_name_like=${products}`);
    return response.data;
})
// sắp xếp

export const sortProducts:any = createAsyncThunk("products/sortProducts", async (order: 'asc' | 'desc') => {
    let response = await axios.get(`http://localhost:8080/products?_sort=product_name&_order=${order}`);
    return response.data;
})
// xóa

export const deleteProducts:any = createAsyncThunk("products/deleteProduct",
     async (id: number) => {
        let response =  await axios.delete(`http://localhost:8080/products/${id}`);
        return id;
})
// sửa 
    export const updateProducts:any = createAsyncThunk("products/updateProduct", async (product: any) => {
        let response =  await axios.put(`http://localhost:8080/products/${product.product_id}`, product);
        return response.data;
})
 // thêm
 export const addProducts:any = createAsyncThunk("products/addProduct", async (product: any) => {
        let response =  await axios.post(`http://localhost:8080/products`, product);
        return response.data;
})
