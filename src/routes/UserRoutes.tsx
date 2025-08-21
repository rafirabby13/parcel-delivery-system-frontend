import About from "@/pages/About";
import type { RouteItem } from "@/types/route.type";
import { BookA,  LayoutDashboard, User2Icon } from "lucide-react";

export const userRoutes: RouteItem[] = [
    {
      title: "User",
      url: "/",
      icon: LayoutDashboard,
      items: [
        {
          title: "Parcel",
          url: "/dashboard/parcel",
          icon: BookA,
          component: About
        },
        {
          title: "User",
          url: "/dashboard/user",
          icon: User2Icon,
          component: About
        },
      ],
    }
  ]