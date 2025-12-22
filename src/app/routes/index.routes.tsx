import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/public/About";
import login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { generateRoutes } from "@/lib/routing/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { ReceiverRoutes } from "./ReceiverRoutes";
import { withAuth } from "@/components/hocs/withAuth";
import { Role } from "@/constants/role";
import Unauthorized from "@/pages/public/Unauthorize";
import VerifyUser from "@/features/auth/components/VerifyUser";
import { AdminRoutes } from "./AdminRoutes";
import { SenderRoutesItems } from "./SenderRoutesItems";
import TrackParcel from "@/pages/public/TrackParcel";
import { DeliveryPersonRoutes } from "./DeliveryPersonRoutes";
import Home from "@/pages/public/Home";
import Contact from "@/pages/public/Contact/Contact";
import Cancel from "@/pages/payment/Cancel";
import Failed from "@/pages/payment/Failed";
import Success from "@/pages/payment/Success";

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
        Component: Success,
        path: "/payment/success"
    },
    {
        Component: Cancel,
        path: "/payment/cancel"
    },
    {
        Component: Failed,
        path: "/payment/fail"
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