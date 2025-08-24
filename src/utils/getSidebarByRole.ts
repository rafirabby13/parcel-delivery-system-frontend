import { Role } from "@/constants/role";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { DeliveryPersonRoutes } from "@/routes/DeliveryPersonRoutes";
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
        case Role.DELIVERY_PERSON:
            return [...DeliveryPersonRoutes]

        default:
            return []
    }


}

export {getSidebarByRole}