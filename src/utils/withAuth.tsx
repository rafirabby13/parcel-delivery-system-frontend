import { useGetMeQuery } from "@/redux/feature/user/user.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, role: string) => {
    return function Authwrapper() {
        const { data, isLoading } = useGetMeQuery(undefined)

        // console.log(data)

        if (!isLoading && !data?.data?.sleecteduser?.email) {
            return <Navigate to="/login" />
        }
        if (role && !isLoading && role !== data?.data?.sleecteduser?.role) {
            return <Navigate to="/unauthorized" />

        }

        return <Component />

    }
}