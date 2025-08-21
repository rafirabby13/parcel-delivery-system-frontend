import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface RouteItem {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
        title: string;
        url: string;
        icon: LucideIcon;
        component: ComponentType
    }[];
}