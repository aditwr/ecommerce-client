import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductReducer from "./admin/products-slice";
import shopProductReducer from "./shop/ProductSlice";
import cartReducer from "./shop/CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer,
    cart: cartReducer,
  },
});

// export the store to be used in the app
export default store;
