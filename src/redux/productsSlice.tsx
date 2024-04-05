import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Welcome, Product, Doc } from "../utils/interfaces";
import axios from "axios";

interface initState {
  products: Doc | null;
  status: string;
  welcome: Welcome | null;
}

export const getProducts = createAsyncThunk("product", async () => {
  try {
    const { data } = await axios("http://localhost:3000/api/products");

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getWelcome = createAsyncThunk("welcome", async () => {
  try {
    const { data } = await axios("https://rickandmortyapi.com/api/episode/28");

    return data;
  } catch (error) {
    console.log(error);
  }
});
const initialState: initState = {
  products: null,
  welcome: null,
  status: "idle",
};
const servicesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<Doc>) => {
        state.products = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(getProducts.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getWelcome.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getWelcome.fulfilled,
      (state, action: PayloadAction<Welcome>) => {
        state.welcome = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(getWelcome.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { setCurrentProduct } = servicesSlice.actions;
export default servicesSlice.reducer;
