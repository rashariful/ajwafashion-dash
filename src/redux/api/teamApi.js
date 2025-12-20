// redux/api/teamApi.ts
import { team } from "./apiEndpoints";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (formData) => ({
        url: team.all,
        method: "POST",
        data: formData,
      }),
    }),
    
    getAllTeam: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: team.all,
          method: "GET",
          params,
        };
      },
      providesTags: ["team"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    getSingleTeam: builder.query({
      query: (id) => ({
        url: team.withId(id),
        method: "GET",
      }),
      providesTags: ["team"],
    }),

    
        updateTeam: builder.mutation({
          query: ({ id, data }) => ({
            url: team.withId(id),
            method: "PATCH",
            data,
          }),
          invalidatesTags: [tagTypes.team],
        }),

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: team.withId(id),
        method: "DELETE",
      }),
      invalidatesTags: ["team"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetAllTeamQuery,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;