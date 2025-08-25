import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { ReceiverRoutes } from "./ReceiverRoutes";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/constants/role";
import Unauthorized from "@/pages/Unauthorize";
import VerifyUser from "@/pages/VerifyUser";
import { AdminRoutes } from "./AdminRoutes";
import { SenderRoutesItems } from "./SenderRoutesItems";
import TrackParcel from "@/pages/TrackParcel";
import { DeliveryPersonRoutes } from "./DeliveryPersonRoutes";
import Home from "@/pages/home/Home";
import Contact from "@/components/layout/home/Contact";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "about"
            },
            {
                Component: Contact,
                path: "/contact"
            },
            {
                Component: Home,
                path: "/"
            },
            {
                Component: TrackParcel,
                path: "/track-parcel"
            }
        ]
    },
    {
        Component: login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: VerifyUser,
        path: "/verify"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    },

    {
        Component: withAuth(DashboardLayout, Role.SUPER_ADMIN),
        path: "/dashboard/admin",
        children: [
            { index: true, element: <Navigate to={"/dashboard/admin/dashboard"} /> },
            ...generateRoutes(AdminRoutes)
        ]
    },
    {
        Component: withAuth(DashboardLayout, Role.RECEIVER),
        path: "/dashboard/receiver",
        children: [
            { index: true, element: <Navigate to={"/dashboard/receiver/incoming-parcel"} /> },

            ...generateRoutes(ReceiverRoutes)
        ]
    },
    {
        Component: withAuth(DashboardLayout, Role.SENDER),
        path: "/dashboard/sender",

        children: [
            { index: true, element: <Navigate to={"/dashboard/sender/create-parcel"} /> },

            ...generateRoutes(SenderRoutesItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, Role.DELIVERY_PERSON),
        path: "/dashboard/delivery-person",
        
        children: [
            { index: true, element: <Navigate to={"/dashboard/delivery-person/update-percel-status"} /> },
            ...generateRoutes(DeliveryPersonRoutes)
        ]
    }
])