import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://www.moneycontrol.com/mc/widget/stockdetails";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStockChart: builder.query({
      query: (id) => `/getChartInfo?classic=true&scId=${id}&type=N`,
    }),
  }),
});

export const { useGetStockChartQuery } = stockApi;
