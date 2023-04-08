import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";
import languageSlice from "./features/languageSlice";
import usersSlice from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    languages: languageSlice,
    users: usersSlice,
  },
});
