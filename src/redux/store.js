// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import restaurantReducer from "./restaurantSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import reviewReducer from "./reviewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    restaurants: restaurantReducer,
    cart: cartReducer,
    orders: orderReducer,
    reviews: reviewReducer,
  },
});

export default store;
