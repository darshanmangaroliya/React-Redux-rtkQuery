import { apiSlice } from "../../app/api/apiSlice";
export type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  productPictures: [{ img: string }];
  createdBy: string;
};
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/product",
      keepUnusedDataFor: 5,
    }),
    addProduct: builder.mutation({
      query: (credentials) => ({
        url: "/product",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    addImage: builder.mutation({
      query: (credentials:FormData) => ({
        url: "/uploads",
        method: "POST",
        body:credentials
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useGetProductsQuery, useAddProductMutation,useAddImageMutation } = productsApiSlice;
