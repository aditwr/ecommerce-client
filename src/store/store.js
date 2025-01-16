import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductReducer from "./admin/products-slice";
import shopProductReducer from "./shop/ProductSlice";
import cartReducer from "./shop/CartSlice";
import shopOrderReducer from "./shop/OrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer,
    cart: cartReducer,
    shopOrder: shopOrderReducer,
  },
});

// export the store to be used in the app
export default store;
