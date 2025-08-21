import { Role } from "@/constants/role";
import { generateRoutes } from "./generateRoutes";
import { adminRoutes } from "@/routes/AdminRoutes";
import { userRoutes } from "@/routes/UserRoutes";

export const generateSidebarByRole = (role) => {

    switch (role) {

        case role == Role.ADMIN:
            return generateRoutes(adminRoutes)
        case role == Role.RECEIVER:
            return generateRoutes(userRoutes)
        case role == Role.SENDER:
            return generateRoutes(userRoutes)

        default:
            return generateRoutes(userRoutes)
    }


}