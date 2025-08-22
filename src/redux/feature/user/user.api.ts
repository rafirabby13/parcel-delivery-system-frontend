import baseApi from "@/redux/baseApi"


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        blockUnblockUser: builder.mutation({
            query: (userId) => ({
                url: `user/${userId}/block-unblock`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"]
        }),
    })
})


export const { useGetMeQuery, useGetAllUsersQuery, useBlockUnblockUserMutation } = userApi