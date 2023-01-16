import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  "https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history";

export const stockHistoryApi = createApi({
  reducerPath: "stockHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStockHistory: builder.query({
      query: ({ symbol, resolution, from, to, countback }) =>
        `/?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&countback=${countback}&currencyCode=INR`,
    }),
  }),
});

export const { useGetStockHistoryQuery } = stockHistoryApi;
