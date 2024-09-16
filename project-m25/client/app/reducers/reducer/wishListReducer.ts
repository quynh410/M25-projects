
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToWishlist, getWishlistById, removeFromWishlist } from "@/app/services/admin/wishList.service";
import { WishList } from "@/app/interface/wishList";

interface WishlistState {
  wishList: WishList[];
}

const initialState: WishlistState = {
  wishList: [],
};

const wishListReducer = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistById.fulfilled, (state, action: PayloadAction<WishList[]>) => {
        state.wishList = action.payload;
      })
    //   .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<WishList>) => {
    //     state.wishList.push(action.payload);
    //   })
      .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<number>) => {
        state.wishList = state.wishList.filter((product) => product.id !== action.payload);
      });
  },
});

export default wishListReducer.reducer;
