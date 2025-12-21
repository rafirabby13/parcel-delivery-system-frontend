
import Dashboard from "@/pages/admin/Dashboard";
import ManagePricings from "@/pages/admin/ManagePricings";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManagParcels from "@/pages/admin/ManageParcels";
import type { RouteItem } from "@/types/route.type";
import { BlocksIcon, LayoutDashboard, LayoutDashboardIcon, PrinterCheck, Users2 } from "lucide-react";

export const AdminRoutes: RouteItem[] = [
  {
    title: "Dashboard",
    url: "hello",
    icon: LayoutDashboard,
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: LayoutDashboardIcon,
        Component: Dashboard
      },
      {
        title: "Manage Users",
        url: "manage-users",
        icon: Users2,
        Component: ManageUsers
      },
      {
        title: "Manage Parcels",
        url: "manage-parcels",
        icon: BlocksIcon,
        Component: ManagParcels
      },
      {
        title: "Manage Pricings",
        url: "manage-pricings",
        icon: PrinterCheck,
        Component: ManagePricings
      },
    ],
  }
]