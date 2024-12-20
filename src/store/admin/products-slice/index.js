import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/new",
  async (productData) => {
    // Send a POST request to the server
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      productData
    );
    // Return the product data
    console.log(response);
    alert("Product added successfully");
    return response.data;
  }
);

// think is a function that takes a string and a callback function as arguments
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    return response.data;
  }
);

export const testThunk = createAsyncThunk("test/thunk", async () => {
  console.log("test Thunk called");
  return true;
});

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add new product thunk reducers
    builder.addCase(addNewProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewProduct.fulfilled(), (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addNewProduct.rejected(), (state) => {
      state.isLoading = false;
    });
  },
});

export default adminProductsSlice.reducer;
