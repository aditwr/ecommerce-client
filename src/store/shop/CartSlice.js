import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action?.payload?.data ?? [];
      })
      .addCase(addProductToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(getCartDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action?.payload?.data ?? [];
      })
      .addCase(getCartDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; // error.message
      });

    builder
      .addCase(increaseCartProductQuantityThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseCartProductQuantityThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action?.payload?.data ?? [];
      })
      .addCase(increaseCartProductQuantityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const addProductToCartThunk = createAsyncThunk(
  "cart/addProductToCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCartDataThunk = createAsyncThunk(
  "cart/getCartData",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/${userId}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const increaseCartProductQuantityThunk = createAsyncThunk(
  "cart/increaseCartProductQuantity",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/increase",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const decreaseCartProductQuantityThunk = createAsyncThunk(
  "cart/decreaseCartProductQuantity",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/decrease",
        {
          userId,
          productId,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const removeProductFromCartThunk = createAsyncThunk(
  "cart/removeProductFromCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/remove",
        {
          userId,
          productId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export default cartSlice.reducer;
