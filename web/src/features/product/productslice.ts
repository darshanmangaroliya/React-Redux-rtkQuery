import { createSlice } from "@reduxjs/toolkit"
import { Product } from "./productApiSlice";


export interface ProductState {
    product: Product | null;
  }
  
  const initialState: ProductState = {
    product: null,
  };

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductCredentials: (state, action) => {
            const { product } = action.payload
            state.product = product
        },
       
    },
})

export const { setProductCredentials } = productSlice.actions
