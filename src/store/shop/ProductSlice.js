import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setFiltersToQuery } from "@/utils/shop-utils";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    closeProductDetailsDialog: (state) => {
      state.product = null;
    },
  },
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
  async ({ filtersParams, sortParams, page, limit, search }) => {
    // make a query string based on filters
    let query = new URLSearchParams();
    query = setFiltersToQuery(query, filtersParams);
    query.set("sort", sortParams);
    query.set("page", page);
    query.set("limit", limit);
    if (search) query.set("search", search);

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

export const { closeProductDetailsDialog } = shopProductSlice.actions;

export default shopProductSlice.reducer;
