import { baseApi } from "./baseApi";

const dashboardStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/dashboard/dashboard-data",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardStatsApi;
