import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrder:any = createAsyncThunk("order/getAllOrder",
    async()=>{
        let response = await axios.get("http://localhost:8080/orders");
        return response.data;
    }
)
// export const addOrder:any = createAsyncThunk("order/addOrder",
//     async(order:any)=>{
//         let response = await axios.post("http://localhost:8080/orders",order);
//         return response.data;
//     }
// )
export const addOrder:any = createAsyncThunk("order/addOrder", async (order: any) => {
    let response = await axios.post("  http://localhost:8080/orders", order);
    return response.data;
  });

