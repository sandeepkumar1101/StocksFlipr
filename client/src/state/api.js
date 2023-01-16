import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.GOLANG_APP_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Companies",
    "User",
    "Login",
    "Company",
    "MarketIndex",
    "TrendingStocks",
  ],
  endpoints: (build) => ({
    doLogin: build.query({
      query: (data) => ({
        url: "general/login",
        method: "POST",
        body: data,
      }),
      providesTags: ["Login"],
    }),
    getCompanies: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "company/getCompany",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Companies"],
    }),
    getCompany: build.query({
      query: (id) => `company/getCompany/${id}`,
      providesTags: ["Company"],
    }),
    getMarketIndex: build.query({
      query: () => `company/getMarketIndex`,
      providesTags: ["MarketIndex"],
    }),
    getTrendingStocks: build.query({
      query: () => `company/getTrendingStocks`,
      providesTags: ["TrendingStocks"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useGetMarketIndexQuery,
  useGetTrendingStocksQuery,
} = api;
