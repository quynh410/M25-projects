import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser, getAllUser, searchName, sortUser, statusUser } from "@/app/services/admin/users.service";
import { Admin } from "@/app/interface/admin";

const userState: Admin[] = []

const userReducer = createSlice({
    name: "admin",
    initialState: {
        user: userState,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
        })
        .addCase(searchName.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.user.push(action.payload);
        })
        .addCase(sortUser.fulfilled, (state, action) => {
            state.user = action.payload;

        })
        .addCase(statusUser.fulfilled,(state, action: PayloadAction<{ id: number, status: number }>)=>{
            const findUser = state.user.findIndex((user) => user.id === action.payload.id);
            if(findUser !== -1){
                state.user[findUser].status = action.payload.status
            }
        })
    }
})

export default userReducer.reducer;