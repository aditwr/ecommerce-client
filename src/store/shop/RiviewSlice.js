import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { build } from "vite";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  reviews: [],
  specificProductReviewsByUser: [],
  loading: false,
  error: null,
};

export const fetchRiviews = createAsyncThunk(
  "riview/fetchRiviews",
  async ({ productId }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/shop/riview/${productId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error in fetchRiviews", error);
      return error.response.data;
    }
  }
);

export const createRiview = createAsyncThunk(
  "riview/createRiview",
  async ({ productId, rating, comment }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/shop/riview/create`,
        {
          productId,
          rating,
          comment,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error in createRiview", error);
      return error.response.data;
    }
  }
);

export const checkIsUserBroughtTheProduct = createAsyncThunk(
  "riview/checkIsUserBroughtTheProduct",
  async ({ productId, userId }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/shop/riview/check/brought-product`,
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error in checkIsUserBroughtProduct", error);
      return error.response.data;
    }
  }
);

export const checkIsUserHasRiviewedTheProduct = createAsyncThunk(
  "riview/checkIsUserHasRiviewedTheProduct",
  async ({ productId, userId }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/shop/riview/check/has-riviewed`,
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error in checkIsUserHasRiviewedTheProduct", error);
      return error.response.data;
    }
  }
);

const riviewSlice = createSlice({
  name: "riview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchRiviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default riviewSlice.reducer;
