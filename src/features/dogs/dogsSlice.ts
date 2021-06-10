import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DOG_API_KEY = "283eb670-2f18-43b4-bc8d-9d745fd82026";

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

const dogsSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thedogapi.com/v1",
    prepareHeaders(headers) {
      headers.set("x-api-key", DOG_API_KEY);

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export default dogsSlice;

export const { useFetchBreedsQuery } = dogsSlice;
