import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// load the API key from .env file
const apiKey = process.env.REACT_APP_STOCK_NEWS_KEY;

const stockNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

export const stockNewsApi = createApi({
  reducerPath: "stockNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl, headers: stockNewsHeaders }),
  endpoints: (builder) => ({
    getStockNews: builder.query({
      query: ({ newsCategory, count }) =>
        `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    }),
  }),
});

export const { useGetStockNewsQuery } = stockNewsApi;
