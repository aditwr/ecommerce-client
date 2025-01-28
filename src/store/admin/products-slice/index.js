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
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/add`,
      productData
    );
    return response.data;
  }
);

// thunk is a function that takes a string and a callback function as arguments
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page, limit }) => {
    const query = new URLSearchParams({ page, limit });
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/admin/products/get?${query.toString()}`
    );
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/edit/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/delete/${id}`
  );
  return response.data;
});

export const testThunk = createAsyncThunk("test/thunk", async () => {
  console.log("test Thunk called");
  return true;
});

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all products thunk reducers
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });

    // add new product thunk reducers
    builder.addCase(addNewProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewProduct.fulfilled(), (state) => {
      state.isLoading = false;
    });
    builder.addCase(addNewProduct.rejected(), (state) => {
      state.isLoading = false;
    });

    // edit product thunk reducers
    builder.addCase(editProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProduct.fulfilled(), (state) => {
      state.isLoading = false;
    });
    builder.addCase(editProduct.rejected(), (state) => {
      state.isLoading = false;
    });

    // delete product thunk reducers
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled(), (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected(), (state) => {
      state.isLoading = false;
    });
  },
});

export default adminProductsSlice.reducer;
