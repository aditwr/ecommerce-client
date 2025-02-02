import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  reviews: [],
  specificProductReviewsByUser: {},
  loading: false,
};

export const fetchRiviews = createAsyncThunk(
  "riview/fetchRiviews",
  async ({ productId }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/shop/riview/${productId}`,
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
  async ({ productId, rating, comment, userId }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/shop/riview/create`,
        {
          productId,
          rating,
          comment,
          userId,
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
        `${API_BASE_URL}/api/shop/riview/check/brought-product`,
        {
          productId,
          userId,
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
        `${API_BASE_URL}/api/shop/riview/check/has-riviewed`,
        {
          productId,
          userId,
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
  name: "riviews",
  initialState,
  reducers: {},
});

export default riviewSlice.reducer;
