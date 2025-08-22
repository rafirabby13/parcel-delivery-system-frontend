import baseApi from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo
            }),
            invalidatesTags: ["USER"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"]

        }),
        sendOTP: builder.mutation({
            query: (otpData) => ({
                url: "/otp/send",
                method: "POST",
                data:otpData
            }),
            invalidatesTags: ["USER"]

        }),
        verifyOTP: builder.mutation({
            query: (verifyOTPData) => ({
                url: "/otp/verify",
                method: "POST",
                data: verifyOTPData
            }),
            invalidatesTags: ["USER"]

        })
    })
})


export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useSendOTPMutation, useVerifyOTPMutation } = authApi