import { apiSlice } from "../../app/api/apiSlice";
import { cart } from "./cartSlice";

export const cartApiSlice:any = apiSlice.enhanceEndpoints({ addTagTypes: ["Admin"] }).injectEndpoints({

  endpoints: (builder) => ({
    getCart: builder.query<cart, void>({
      query: () => "/cart",
      providesTags:  ["Admin"],

       keepUnusedDataFor: 30,

    }),
    addTocart: builder.mutation({
      query: (credentials) => ({
        url: "/cart/addIteam",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags:["Admin"]
    }),
    removeTocart: builder.mutation({
      query: (credentials) => ({
        url: "/cart/removeItem",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags:["Admin"]
    }),
   
  }),

  overrideExisting: false,
});

export const { useGetCartQuery , useAddTocartMutation,useRemoveTocartMutation} = cartApiSlice;
