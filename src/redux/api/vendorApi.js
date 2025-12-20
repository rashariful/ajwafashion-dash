import { tagTypes } from "../tag-types";
import { vendor } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendor: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: vendor.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.vendor],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleVendor: builder.query({
      query: (id) => ({
        url: vendor.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),
    updateVendor: builder.mutation({
      query: (data) => ({
        url: vendor.withId(data.id),
        method: "PATCH",
        data: data.body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.vendor, tagTypes.user],
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: vendor.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.vendor],
    }),
  }),
});

export const { useGetAllVendorQuery, useGetSingleVendorQuery, useUpdateVendorMutation, useDeleteVendorMutation } =
  vendorApi;
