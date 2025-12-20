import { tagTypes } from "../tag-types";
import { faq } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFaq: builder.mutation({
      query: (formData) => ({
        url: faq.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    getAllFaq: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: faq.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.faq],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleFaq: builder.query({
      query: (id) => ({
        url: faq.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    updateFaq: builder.mutation({
      query: ({id, data}) => ({
        url: faq.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: faq.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetAllFaqQuery,
  useLazyGetAllFaqQuery,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
