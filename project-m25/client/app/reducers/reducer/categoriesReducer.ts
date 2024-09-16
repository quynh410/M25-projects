import { Categories } from "@/app/interface/categories";
import { addCate, deleteCate, getAllCate, upadateCate } from "@/app/services/admin/categories.service";
import { createSlice } from "@reduxjs/toolkit";

const categoriesState:Categories[]=[];

const categoriesReducer = createSlice({
    name:"categories",
    initialState:{
        categories:categoriesState,
        cateDetail: {} 
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
        .addCase(addCate.fulfilled,(state,action)=>{
            state.categories.push(action.payload);
        })
        .addCase(upadateCate.fulfilled,(state,action)=>{
            let index = state.categories.findIndex((categories:any)=>{
                return categories.id === action.payload.id
            })
            if(index!== -1){
                state.categories[index] = action.payload
            }
        })
    }
})
export default categoriesReducer.reducer;