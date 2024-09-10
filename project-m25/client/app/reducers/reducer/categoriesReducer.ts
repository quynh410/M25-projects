import { Categories } from "@/app/interface/categories";
import { deleteCate, getAllCate } from "@/app/services/admin/categories.service";
import { createSlice } from "@reduxjs/toolkit";

const categoriesState:Categories[]=[];

const categoriesReducer = createSlice({
    name:"categories",
    initialState:{
        categories:categoriesState
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCate.fulfilled,(state,action)=>{
            state.categories = action.payload;
        })
        .addCase(deleteCate.fulfilled,(state,action)=>{
            state.categories = state.categories.filter((category:Categories)=> {
                return category.id!== action.payload
            })
        })
    }
})
export default categoriesReducer.reducer;