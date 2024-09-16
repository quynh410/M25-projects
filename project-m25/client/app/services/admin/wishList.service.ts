import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Products } from "@/app/interface/products";

// Get wishlist by user ID

export const getWishlistById:any =  createAsyncThunk("wishlist/getWishlistById",
    async(id:number)=>{
        let response = await axios.get(`http://localhost:8080/wishlist?user_id_like=${id}`);
        return response.data;
    }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
    async(id:number)=>{
        let response = await axios.post(`http://localhost:8080/wishlist`,id);
        return id;
    }
);
// Remove product from wishlist

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
    async(id:number)=>{
        let response = await axios.delete(`http://localhost:8080/wishlist/${id}`);
        return id;
    }
);
