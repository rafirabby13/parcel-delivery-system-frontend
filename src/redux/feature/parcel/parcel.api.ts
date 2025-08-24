import baseApi from "@/redux/baseApi"



export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllParcelById: builder.query({
            query: (senderId) => ({
                url: `/parcel/all-parcel/${senderId}`,
                method: "GET",
            }),
            providesTags: ["PARCEL"]
        }),
        getAllParcels: builder.query({
            query: () => ({
                url: "/parcel/all-parcel",
                method: "GET",
            }),
            providesTags: ["PARCEL"]
        }),
        incomingParcel: builder.query({
            query: (phone) => ({
                url: `parcel/incoming-parcel?phone=${phone}`,
                method: "GET",
            }),
            providesTags: ["PARCEL"]
        }),
        createparcel: builder.mutation({
            query: (parcelData) => ({
                url: "/parcel/create-parcel",
                method: "POST",
                data: parcelData
            }),
            invalidatesTags: ["PARCEL"]
        }),
        cancelParcel: builder.mutation({
            query: (cancelData) => ({
                url: "/parcel/cancel-parcel",
                method: "POST",
                data: cancelData
            }),
            invalidatesTags: ["PARCEL"]
        }),
        blockUnbloParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcel/${parcelId}/block-parcel`,
                method: "PATCH",
            }),
            invalidatesTags: ["PARCEL"]
        }),
        assignToDeliveryMan: builder.mutation({
            query: (data) => ({
                url: "/parcel/assign-delivery",
                method: "PATCH",
                data: data
            }), 
            invalidatesTags: ["PARCEL"]
        }),
        confirmDelivery: builder.mutation({
            query: (data) => ({
                url: `/parcel/confirm-delivery?phone=${data.phone}&trackingId=${data.trackingId}`,
                method: "PATCH"
            }), 
            invalidatesTags: ["PARCEL"]
        }),
    })
})


export const { useGetAllParcelByIdQuery, useCreateparcelMutation, useCancelParcelMutation, useGetAllParcelsQuery, useBlockUnbloParcelMutation, useAssignToDeliveryManMutation, useIncomingParcelQuery, useConfirmDeliveryMutation } = parcelApi