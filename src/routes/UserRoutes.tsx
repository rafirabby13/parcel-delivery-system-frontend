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
          url: "parcel",
          icon: BookA,
          Component: About
        },
        {
          title: "User",
          url: "user",
          icon: User2Icon,
          Component: About
        },
      ],
    }
  ]