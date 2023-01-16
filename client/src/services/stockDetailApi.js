import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://priceapi.moneycontrol.com/pricefeed/nse/equitycash";

export const stockDetailApi = createApi({
  reducerPath: "stockDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStockDetail: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetStockDetailQuery } = stockDetailApi;
