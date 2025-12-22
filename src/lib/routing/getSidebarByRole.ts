import { Role } from "@/constants/role";
import { AdminRoutes } from "@/app/routes/AdminRoutes";
import { DeliveryPersonRoutes } from "@/app/routes/DeliveryPersonRoutes";
import { ReceiverRoutes } from "@/app/routes/ReceiverRoutes";
import { SenderRoutesItems } from "@/app/routes/SenderRoutesItems";
import type {  TRole } from "@/types/route.type";



 const getSidebarByRole= (role: TRole) => {

    // console.log(role)

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