import { Role } from "@/constants/role";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { ReceiverRoutes } from "@/routes/ReceiverRoutes";
import { SenderRoutesItems } from "@/routes/SenderRoutesItems";
import type {  TRole } from "@/types/route.type";



 const getSidebarByRole= (role: TRole) => {

    console.log(role)

    switch (role) {

        case Role.ADMIN:
            return [...AdminRoutes]
        case Role.SUPER_ADMIN:
            return [...AdminRoutes]
        case Role.RECEIVER:
            return [...ReceiverRoutes]
        case Role.SENDER:
            return [...SenderRoutesItems]

        default:
            return []
    }


}

export {getSidebarByRole}