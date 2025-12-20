import { tagTypes } from "../tag-types";
import { product } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: product.all,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    getAllProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: product.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.product],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: product.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    updateProduct: builder.mutation({
      query: ({id, data}) => ({
        url: product.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: product.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
