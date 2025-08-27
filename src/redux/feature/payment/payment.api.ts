import baseApi from "@/redux/baseApi"


export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initPayment: builder.mutation({
            query: (parcelId) => ({
                url: `/payment/init-payment/${parcelId}`,
                method: "POST",
            }),
            invalidatesTags: ["PARCEL"]
        }),
    })
})


export const { useInitPaymentMutation } = paymentApi