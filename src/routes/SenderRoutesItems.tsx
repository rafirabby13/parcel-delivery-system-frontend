

import Parcels from "@/pages/sender/Parcels";
import type { RouteItem } from "@/types/route.type";
import { LayoutDashboard, Package2 } from "lucide-react";


export const SenderRoutesItems: RouteItem[] = [
    {
        title: "User",
        url: "/",
        icon: LayoutDashboard,
        items: [
            {
                title: "Create Parcel",
                url: "create-parcel",
                icon: Package2,
                Component: Parcels
            }
        ],
    }
]

