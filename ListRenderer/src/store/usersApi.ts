import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjViNmYxYjhmNTYwYmY3YmU2YTIyNTM2NThmZWYzMyIsInN1YiI6IjVmNGQyMzdhMTQwYmFkMDAzNThiMDA0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w6AKK9xzn0vP4iIeeRir4lutusMgRb0EpP8VC1kIabw';

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/", headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  } }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 1) => `movie/upcoming?page=${page}`,
      transformResponse: (response) => response.results,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if(!currentCache) return newItems;
        currentCache.push(...newItems.filter(item => !currentCache.map(i => i.id).includes(item.id)));
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery } = usersApi;
