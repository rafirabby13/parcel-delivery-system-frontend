import baseApi from "@/redux/baseApi"


export const pricingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       

        // 2. Configure/Update a Pricing Tier
        updatePricingTier: builder.mutation({
            query: (data) => ({
                url: "/pricing/update-tier",
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: ["PRICING"],

        }),
        createPricingTier: builder.mutation({
            query: (data) => ({
                url: "/pricing/create-tier",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["PRICING"],

        }),
         getPricingTiers: builder.query({
            query: () => ({
                url: "/pricing/tiers",
                method: "GET",
            }),
            providesTags: ["PRICING"],
        }),

        // 3. Configure/Update Location Charge
        updateLocationCharge: builder.mutation({
            query: (data) => ({
                url: "/pricing/config/location",
                method: "POST",
                data: data,
            })
        }),
    })
})


export const { useGetPricingTiersQuery, useUpdateLocationChargeMutation,useCreatePricingTierMutation, useUpdatePricingTierMutation } = pricingApi