import { useGetMeQuery } from "@/redux/feature/user/user.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, role: string) => {
    return function Authwrapper() {
        const { data, isLoading } = useGetMeQuery(undefined)

        // console.log("....................with auth.........")

        // console.log("data?.data?.user?.email", data?.data?.user?.role, role)
        if (!isLoading && !data?.data?.user?.email) {
            return <Navigate to="/login" />
        }
        if (role && !isLoading && role !== data?.data?.user?.role) {
            console.log("data?.data?.user?.email", data?.data?.user?.role, role)

            return <Navigate to="/unauthorized" />

        }

        return <Component />

    }
}