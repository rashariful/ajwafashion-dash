import { tagTypes } from "../tag-types";
import { testimonial } from "./apiEndpoints";
import { baseApi } from "./baseApi";

const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTestimonial: builder.mutation({
      query: (formData) => ({
        url: testimonial.all,
        method: "POST",
       data: formData,
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
    getAllTestimonial: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: testimonial.all,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.testimonial],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleTestimonial: builder.query({
      query: (id) => ({
        url: testimonial.withId(id),
        method: "GET",
      }),
      providesTags: [tagTypes.testimonial],
    }),

    updateTestimonial: builder.mutation({
      query: ({id, data}) => ({
        url: testimonial.withId(id),
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: testimonial.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
  }),
});

export const {
  useCreateTestimonialMutation,
  useGetAllTestimonialQuery,
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi;
