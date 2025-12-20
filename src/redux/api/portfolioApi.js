import { tagTypes } from "../tag-types";
import { portfolio } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPortfolio: builder.mutation({
      query: (data) => ({
        url: portfolio.all,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),
    getAllPortfolio: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: portfolio.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.portfolio],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSinglePortfolio: builder.query({
      query: (id) => ({
        url: portfolio.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.portfolio],
    }),

    updatePortfolio: builder.mutation({
      query: ({id, data}) => ({
        url: portfolio.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),

    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: portfolio.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),
  }),
});

export const {
  useCreatePortfolioMutation,
  useGetAllPortfolioQuery,
  useGetSinglePortfolioQuery,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
