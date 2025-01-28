import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DATA_ENCRYPTION_KEY = import.meta.env.VITE_DATA_ENCRYPTION_KEY;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUserThunk = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);
export const loginUserThunk = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    // encrypt the password before sending it to the server
    const encryptedEmail = CryptoJS.AES.encrypt(
      formData.email,
      DATA_ENCRYPTION_KEY
    ).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      DATA_ENCRYPTION_KEY
    ).toString();

    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {
        email: encryptedEmail,
        password: encryptedPassword,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);
export const checkAuthThunk = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
    },
  });
  return response.data;
});

export const logoutUserThunk = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {}, // post method requires a body, so we pass an empty object
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const updateUserThunk = createAsyncThunk(
  "/auth/update",
  async (formData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/account/update-profile`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "/auth/resetpassword",
  async ({ oldPassword, newPassword }) => {
    try {
      const encryptedOldPassword = CryptoJS.AES.encrypt(
        oldPassword,
        DATA_ENCRYPTION_KEY
      ).toString();
      const encryptedNewPassword = CryptoJS.AES.encrypt(
        newPassword,
        DATA_ENCRYPTION_KEY
      ).toString();

      const response = await axios.put(
        `${API_BASE_URL}/api/account/change-password`,
        {
          oldPassword: encryptedOldPassword,
          newPassword: encryptedNewPassword,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // action creator name : reducer function
    setUser: (state, action) => {},
    logOut: (state, action) => {
      // do api cals to logout the user
      // can't do that here
    },
  },
  extraReducers: (builder) => {
    // add reducers for registerUserThunk
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    // add reducers for loginUserThunk
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      } else {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      }
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    // add reducers for checkAuthThunk

    builder.addCase(checkAuthThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // set the authenticated user in the redux state
      } else {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      }
    });
    builder.addCase(checkAuthThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });

    // add reducers for logoutUserThunk
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

// export action creator to set the user
export const { setUser } = authSlice.actions;
// export reducer to include it in the store
export default authSlice.reducer;
