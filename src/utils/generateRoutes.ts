import type { RouteItem } from "@/types/route.type"

export const generateRoutes=(routes: RouteItem[])=>{
  
  return routes.flatMap(routes=> routes.items?.map(route=>({
    path: route.url,
    Component: route.Component
  })))

}