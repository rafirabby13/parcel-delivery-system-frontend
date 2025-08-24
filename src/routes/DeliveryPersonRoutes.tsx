

import UpdateStatus from "@/pages/deliveryPerson/UpdateStatus";
import type { RouteItem } from "@/types/route.type";
import {  LayoutDashboard, PackageCheck } from "lucide-react";

export const DeliveryPersonRoutes: RouteItem[] = [
    {
      title: "Dashboard",
      url: "hello",
      icon: LayoutDashboard,
      items: [
        {
          title: "Update Percel Status",
          url: "update-percel-status",
          icon: PackageCheck,
          Component: UpdateStatus
        },
      ],
    }
  ]