import IncomingParcels from "@/pages/receiver/IncomingParcels";
import PArcelHistory from "@/pages/receiver/PArcelHistory";
import type { RouteItem } from "@/types/route.type";
import {  HistoryIcon, LayoutDashboard, PackageCheckIcon } from "lucide-react";

export const ReceiverRoutes: RouteItem[] = [
    {
      title: "User",
      url: "/",
      icon: LayoutDashboard,
      items: [
        {
          title: "Incoming Parcels",
          url: "incoming-parcel",
          icon: PackageCheckIcon,
          Component: IncomingParcels
        },
        {
          title: "Delivery History",
          url: "delivery-history",
          icon: HistoryIcon,
          Component: PArcelHistory
        },
      ],
    }
  ]