import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const bdApi = createApi({
  reducerPath: 'bdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bdapis.vercel.app' }),
  endpoints: (build) => ({
    getAllDivisions: build.query({
      query: () => "/geo/v2.0/divisions",
    }),
    getAllDistricts: build.query({
      query: (id) => `/geo/v2.0/districts/${id}`,
    }),
    getAllUpazillas: build.query({
      query: (id) => `/geo/v2.0/upazilas/${id}`,
    }),
    getAllAreas: build.query({
      query: (id) => `/geo/v2.0/unions/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllDivisionsQuery, useGetAllDistrictsQuery, useGetAllUpazillasQuery, useGetAllAreasQuery } = bdApi 