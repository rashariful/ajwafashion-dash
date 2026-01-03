import { tagTypes } from "../tag-types";
import { promotion } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const promotionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createPromotion: builder.mutation({
      query: (formData) => ({
        url: promotion.all,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
    getAllPromotion: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: promotion.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.promotion],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSinglePromotion: builder.query({
      query: (id) => ({
        url: promotion.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.promotion],
    }),

    updatePromotion: builder.mutation({
      query: ({ id, data }) => ({
        url: promotion.withId(id),
        method: "PATCH",
        body: data, 
      }),
      invalidatesTags: [tagTypes.promotion],
    }),

    deletePromotion: builder.mutation({
      query: (id) => ({
        url: promotion.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
  }),
});

export const {
  useCreatePromotionMutation,
  useGetAllPromotionQuery,
  useLazyGetAllPromotionQuery,
  useGetSinglePromotionQuery,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;
