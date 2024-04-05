import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Doc } from "../utils/interfaces";
import axios from "axios";

interface initState {
  products: Doc | null;
  status: string;
  searcher: string | null;
  quantity: number;
  page: number;
}

export const getProducts = createAsyncThunk("product", async () => {
  try {
    const { data } = await axios(
      "https://henry-partner-back-test.vercel.app/api/products"
    );

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
  searcher: null,
  quantity: 3,
  page: 1,
  status: "idle",
};
const servicesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.products = action.payload;
    },
    setCurrentSearch: (state, action) => {
      state.searcher = action.payload;
    },
    setCurrentQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
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
  },
});

export const {
  setCurrentProduct,
  setCurrentSearch,
  setCurrentQuantity,
  setCurrentPage,
} = servicesSlice.actions;
export default servicesSlice.reducer;
