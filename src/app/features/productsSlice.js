import { createSlice } from "@reduxjs/toolkit";
import { inputValue } from "../../components/data/inputValue";

const initialState = [];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductsFromApi: (state, action) => {
      return (state = action.payload);
    },
    deleteProducts: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    editProducts: (state, action) => {
      console.log(action);

      return state.filter((product) => product.id !== action.payload);
    },
    addProducts: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { addProducts, addProductsFromApi, deleteProducts, editProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
