import baseApi from "@/redux/baseApi"


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            })
        }),
    })
})


export const {useGetMeQuery} = userApi