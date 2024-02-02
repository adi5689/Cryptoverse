import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_NEWS_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_NEWS_HOST,

};

const baseUrl = process.env.REACT_APP_X_RAPIDAPI_NEWS_BASE_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query:  () => createRequest(`/v1/cointelegraph`)
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;