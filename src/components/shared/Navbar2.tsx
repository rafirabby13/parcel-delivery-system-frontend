import Logo from "@/assets/icons/Logo";
import { NavMenu } from "../nav-menu";
import { Button } from "../ui/button";
import { NavigationSheet } from "../navigation-sheet";
import { useGetMeQuery, userApi } from "@/redux/feature/user/user.api";
import { authApi, useLogoutMutation } from "@/redux/feature/auth/auth.api";
import { useDispatch } from "react-redux";
import { Role } from "@/constants/role";
import { ModeToggle } from "../ModeToggle";
import { ConfirmDialogue } from "@/utils/ConfirmDialogue";
import { Loader1 } from "@/utils/Loader1";
import { Link } from "react-router";


const Navbar2 = () => {
    const { data, isLoading } = useGetMeQuery(undefined)
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()

    const role = data?.data?.user?.role
    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/track-parcel", label: "Track Parcel" },
        {
            href:
                role === Role.SUPER_ADMIN
                    ? "/dashboard/admin"
                    : role === Role.SENDER
                        ? "/dashboard/sender"
                        : role === Role.DELIVERY_PERSON
                            ? "/dashboard/delivery-person"
                            : "/dashboard/receiver",
            label: "Dashboard",
        },
    ]
    const handleLogout = async () => {
        await logout().unwrap()
        dispatch(userApi.util.resetApiState())
        dispatch(authApi.util.resetApiState())
    }
    return (
        <nav className="fixed inset-x-0 top-0 h-24 bg-primary   mx-auto  z-50 ">
            <div className="h-full flex items-center container  justify-between mx-auto ">
                <div className=" bg-background/80 p-2 rounded-xl">
                    <Logo />
                </div>

                {/* Desktop Menu */}
                <NavMenu navigationLinks={navigationLinks} className="hidden md:block" />

                <div className="flex items-center gap-3">
                    <div className="flex flex-1 items-center justify-end gap-2">
                        <ModeToggle />

                        {data?.data?.user ? (
                            <ConfirmDialogue
                                title="Sign Out"
                                description="Are you sure you want to sign out?"
                                onConfirm={handleLogout}
                            >
                                <Button variant="secondary">
                                    {isLoading ? <Loader1 /> : "Sign Out"}
                                </Button>
                            </ConfirmDialogue>
                        ) : (
                            <Button asChild variant="secondary">
                                <Link to="/login">Sign In</Link>
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden bg-primary">
                        <NavigationSheet navigationLinks={navigationLinks} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
