import { Role } from "@/constants/role";
import { adminRoutes } from "@/routes/AdminRoutes";
import { userRoutes } from "@/routes/UserRoutes";
import type { TRole } from "@/types/route.type";



 const getSidebarByRole = (role: TRole) => {

    switch (role) {

        case Role.ADMIN:
            return [...adminRoutes]
        case Role.RECEIVER:
            return [...userRoutes]
        case Role.SENDER:
            return [...userRoutes]

        default:
            return [...userRoutes]
    }


}

export {getSidebarByRole}