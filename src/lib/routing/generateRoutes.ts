import type { RouteItem } from "@/types/route.type"

export const generateRoutes=(routes: RouteItem[])=>{
  // console.log(routes)
  return routes.flatMap(routes=> routes.items?.map(route=>({
    path: route.url,
    Component: route.Component
  })))

} 