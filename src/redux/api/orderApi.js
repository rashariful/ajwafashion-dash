import { tagTypes } from "../tag-types";
import { order } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (formData) => ({
        url: order.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    getAllOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: order.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.order],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        url: order.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: order.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: order.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useLazyGetAllOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
