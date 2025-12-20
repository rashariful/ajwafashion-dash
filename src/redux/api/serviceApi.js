import { tagTypes } from "../tag-types";
import { service } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (formData) => ({
        url: service.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    getAllService: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: service.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.service],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleService: builder.query({
      query: (id) => ({
        url: service.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: service.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: service.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useLazyGetAllServiceQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
