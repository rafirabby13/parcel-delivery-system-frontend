import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { ReceiverRoutes } from "./ReceiverRoutes";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/constants/role";
import Unauthorized from "@/pages/Unauthorize";
import VerifyUser from "@/pages/VerifyUser";
import { AdminRoutes } from "./AdminRoutes";
import { SenderRoutesItems } from "./SenderRoutesItems";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "about"
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
        Component: withAuth(DashboardLayout, Role.ADMIN),
        path: "/dashboard/admin",
        children: [
            ...generateRoutes(AdminRoutes)
        ]
    },
    {
        Component: withAuth(DashboardLayout, Role.RECEIVER),
        path: "/dashboard/receiver",
        children: [
            ...generateRoutes(ReceiverRoutes)
        ]
    },
    {
        Component: withAuth(DashboardLayout, Role.SENDER),
        path: "/dashboard/sender",
        children: [
            ...generateRoutes(SenderRoutesItems)
        ]
    }
])