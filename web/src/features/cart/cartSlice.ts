import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../auth/authSlice";


export type productitem = {
  productId: string;
  name:string
  quantity: number;
  price: number;
  total: number;
  description:string;
  productPictures:[{img:string}]

};
export interface cart{
    userId:string,
    items:[productitem],
    subTotal:number
}
export interface cartState {
    cart: cart | null;
  }
  
  const initialState: cartState = {
    cart: null,
  };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setcartCredentials: (state, action) => {

            const cart = action.payload
            console.log("nnnnnnnnnnnnnnnnn",cart)
            state.cart = cart
        },
       
    },
})

export const { setcartCredentials } = cartSlice.actions
export default cartSlice.reducer
export const selectCart = (state:RootState) => state.cart.cart
export const selectcartquery = (state:RootState) => state.api.queries.getCart?.data
