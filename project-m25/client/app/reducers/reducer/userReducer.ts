import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUser, getAllUser, searchName, sortUser } from "@/app/services/admin/users.service";
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
    }
})

export default userReducer.reducer;