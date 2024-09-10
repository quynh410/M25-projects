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