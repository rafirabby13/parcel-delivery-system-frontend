import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./AdminRoutes";
import { userRoutes } from "./UserRoutes";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/constants/role";
import Unauthorized from "@/pages/Unauthorize";

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
        Component: Unauthorized,
        path: "/unauthorized"
    },
    {
        Component: withAuth(DashboardLayout, Role.ADMIN),
        path: "/dashboard/admin",
        children: [
            ...generateRoutes(adminRoutes)
        ]
    },
    {
        Component: withAuth(DashboardLayout, (Role.RECEIVER )),
        path: "/dashboard/user",
        children: [
            ...generateRoutes(userRoutes)
        ]
    }
])