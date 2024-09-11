import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL
// API lấy dữ liệu user
export const getAllUser: any = createAsyncThunk(
    "user/getAllUser",
    async () => {
        const response = await axios.get(`http://localhost:8080/users`);
        return response.data;
    }
)
export const searchName:any = createAsyncThunk("user/searchName", async (name:any) => {
    const response = await axios.get(`http://localhost:8080/users?username_like=${name}`);
    return response.data;
})
//thêm users

export const addUser: any = createAsyncThunk(
    "user/addUser",
    async (user: any) => {
        const response = await axios.post(`http://localhost:8080/users`, user);
        return response.data;
    }
) 
//sắp xếp


export const sortUser:any = createAsyncThunk("users/sortUser", async (order: 'asc' | 'desc') => {
    let response = await axios.get(`http://localhost:8080/users?_sort=username&_order=${order}`);
    return response.data;
})
// API cập nhật trạng thái user
export const statusUser: any=createAsyncThunk("user/statusUser", async(data:any)=>{
    const response= await axios.patch(` http://localhost:8080/users/${data.id}`,data)
    return response.data
})

