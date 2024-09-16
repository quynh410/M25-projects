import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCate:any = createAsyncThunk("categories/getAllCate",
    async ()=>{
        const response = await axios.get("http://localhost:8080/categories")
        return response.data;
    }
)
export const deleteCate:any  = createAsyncThunk("categories/deleteCate",
    async(id:number)=>{
        let response = await axios.delete(`http://localhost:8080/categories/${id}`)
        return id;
    }
)
export const addCate:any = createAsyncThunk("categories/addCate", async (cate:any)=>{
    let response = await axios.post(`http://localhost:8080/categories`,cate)
    return response.data;
})
export const upadateCate:any = createAsyncThunk("categories/upadateCate",
    async(cate:any,data)=>{
        let response = await axios.put(`http://localhost:8080/categories/${cate.id}`,cate)
        return response.data;
    }
)