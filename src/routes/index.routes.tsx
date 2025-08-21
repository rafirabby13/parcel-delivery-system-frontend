import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

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
        Component: DashboardLayout,
        path: "/dashboard",
        children: [
            {
                // Component: ,
                element: <div>Hello</div>,
                path: 'hello'
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/dashboard",
        children: [
            {
                // Component: ,
                element: <div>Hello</div>,
                path: 'hello'
            }
        ]
    }
])