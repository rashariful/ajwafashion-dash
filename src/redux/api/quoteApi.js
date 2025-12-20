import { tagTypes } from "../tag-types";
import { quote } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const quoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuote: builder.mutation({
      query: (formData) => ({
        url: quote.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.quote],
    }),
    getAllQuote: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: quote.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.quote],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleQuote: builder.query({
      query: (id) => ({
        url: quote.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.quote],
    }),

    updateQuote: builder.mutation({
      query: (data) => ({
        url: quote.withId(data.id),
        method: "PATCH",

        data: data.body,
      }),
      invalidatesTags: [tagTypes.quote],
    }),

    deleteQuote: builder.mutation({
      query: (id) => ({
        url: quote.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.quote],
    }),
  }),
});

export const {
  useCreateQuoteMutation,
  useGetAllQuoteQuery,
  useLazyGetAllQuoteQuery,
  useGetSingleQuoteQuery,
  useUpdateQuoteMutation,
  useDeleteQuoteMutation,
} = quoteApi;
