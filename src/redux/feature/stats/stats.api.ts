import baseApi from "@/redux/baseApi"


export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsersStats: builder.query({
            query: () => ({
                url: "/stats/user",
                method: "GET",
            })
        }),
        getParcelStats: builder.query({
            query: () => ({
                url: "/stats/parcel",
                method: "GET",
            })
        }),
        getPaymentStats: builder.query({
            query: () => ({
                url: "/stats/payment",
                method: "GET",
            })
        })
    })
})


export const { useGetUsersStatsQuery, useGetParcelStatsQuery, useGetPaymentStatsQuery } = statsApi