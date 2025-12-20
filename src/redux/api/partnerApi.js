import { tagTypes } from "../tag-types";
import { partner } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPartner: builder.mutation({
      query: (formData) => ({
        url: partner.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.partner],
    }),
    getAllPartner: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: partner.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.partner],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSinglePartner: builder.query({
      query: (id) => ({
        url: partner.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.partner],
    }),

    updatePartner: builder.mutation({
      query: ({id, data}) => ({
        url: partner.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.partner],
    }),

    deletePartner: builder.mutation({
      query: (id) => ({
        url: partner.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.partner],
    }),
  }),
});

export const {
  useCreatePartnerMutation,
  useGetAllPartnerQuery,
  useLazyGetAllPartnerQuery,
  useGetSinglePartnerQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
