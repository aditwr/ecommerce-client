import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const fetchFilteredProducts = createAsyncThunk(
  "shopProduct/fetchFilteredProducts",
  async ({ filtersParams, sortParams }) => {
    // make a query string based on filters
    let query = new URLSearchParams();
    Object.keys(filtersParams).forEach((key) => {
      filtersParams[key].forEach((value) => {
        if (query.has(key)) {
          query.set(key, `${query.get(key)}, ${value}`);
        } else {
          query.set(key, value);
        }
      });
    });
    query.set("sort", sortParams);

    const response = await axios.get(
      `http://localhost:5000/api/shop/products?${query.toString()}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "shopProduct/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/${productId}`
    );
    return response.data;
  }
);

export default shopProductSlice.reducer;
