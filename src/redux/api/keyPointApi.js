import { tagTypes } from "../tag-types";
import { keyPoint } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const keyPointApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createKeyPoint: builder.mutation({
      query: (formData) => ({
        url: keyPoint.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.keyPoint],
    }),
    getAllKeyPoint: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: keyPoint.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.keyPoint],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleKeyPoint: builder.query({
      query: (id) => ({
        url: keyPoint.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.keyPoint],
    }),

    updateKeyPoint: builder.mutation({
      query: ({ id, data }) => ({
        url: keyPoint.withId(id),
        method: "PATCH",
        body: data, 
      }),
      invalidatesTags: [tagTypes.keyPoint],
    }),

    deleteKeyPoint: builder.mutation({
      query: (id) => ({
        url: keyPoint.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.keyPoint],
    }),
  }),
});

export const {
  useCreateKeyPointMutation,
  useGetAllKeyPointQuery,
  useLazyGetAllKeyPointQuery,
  useGetSingleKeyPointQuery,
  useUpdateKeyPointMutation,
  useDeleteKeyPointMutation,
} = keyPointApi;
