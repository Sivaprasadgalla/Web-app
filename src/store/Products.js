import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../utils/ApiRequest";


export const fetchProductsList = createAsyncThunk("products/fetchProductsList", async (query) => {
    try{
        const response = await instance.get(`/products`, {
          headers: {
            'Access-Control-Allow-Origin': '*', 
          },
        });
        return response.data;
    }catch(error){
        throw error;

    }
});

// Thunk to fetch product details by ID
export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (id) => {
    try {
      const response = await instance.get(`/product/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*', 
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


const ProductsSlice = createSlice({
    name: 'products',
    initialState:{
        Items: [],
        productDetails:{},
        status: 'idle',
        searchStatus:'idle',
        error: null,
    },
    reducers: {
      addProduct: (state, action) => {
          console.log(action.payload);
          state.Items.products.unshift(action.payload);;
      },
      updateProduct: (state, action) => {
          const index = state.Items.products.findIndex(product => product.id === action.payload.id);
          if (index !== -1) {
            state.Items.products[index] = action.payload;
          }
      }
  },
    extraReducers: (builder) => {
        builder
      .addCase(fetchProductsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Items = action.payload;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'productsucceeded';
        state.productDetails = action.payload;
      })
    }
})
export const { addProduct, updateProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;
