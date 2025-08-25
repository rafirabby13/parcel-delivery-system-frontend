
import Logo from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Link, NavLink } from "react-router"
import { ModeToggle } from "../ModeToggle"
import { useGetMeQuery, userApi } from "@/redux/feature/user/user.api"
import { Role } from "@/constants/role"
import { authApi, useLogoutMutation } from "@/redux/feature/auth/auth.api"
import { useDispatch } from "react-redux"
import { LoaderIcon } from "lucide-react"

// Navigation links array to be used in both desktop and mobile menus


export default function Navbar() {
    const { data, refetch, isLoading } = useGetMeQuery(undefined)
    const [logout] = useLogoutMutation(undefined)
    const dispatch = useDispatch()
    if (isLoading) {
        return <LoaderIcon />
    }
    // console.log(data?.data?.user)
    const role = data?.data?.user?.role
    console.log(role)
    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "about", label: "About" },
        { href: "contact", label: "Contact" },
        { href: "track-parcel", label: "Track Parcel" },
        { href: role === Role.SUPER_ADMIN ? "/dashboard/admin" : role === Role.SENDER ? "/dashboard/sender" : role === Role.DELIVERY_PERSON ? "/dashboard/delivery-person" : "/dashboard/receiver", label: "Dashboard" },
    ]
    const handleLogout = async () => {
        logout(undefined).unwrap()
        refetch()
        dispatch(userApi.util.resetApiState())
        dispatch(authApi.util.resetApiState())

    }
    return (
        <header className="border-b px-4 md:px-6   ">
            <div className="flex h-16 items-center justify-between gap-4 container mx-auto">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-40   md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-full border-4 ">
                                            <NavigationMenuLink
                                                asChild
                                                className="py-1.5"
                                            >
                                                <Link to={link.href}>
                                                    {link.label}

                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center gap-6 p-1">
                        <Link to="/" className="text-primary hover:text-primary/90">
                            <Logo />
                        </Link>
                        {/* Navigation menu */}
                        <NavigationMenu className="max-md:hidden ">
                            <NavigationMenuList className="gap-2 flex">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index} >
                                        {/* <NavigationMenuLink
                                            asChild
                                            // className="py-1.5 px-3 rounded-md  transition-colors"
                                        > */}
                                        {/* <Link to={link.href}>
                                                {link.label}

                                            </Link> */}
                                        <NavLink
                                            to={link.href}
                                            end={link.href === "/"} // make Home exact

                                            className={({ isActive }) =>
                                                isActive
                                                    ? " px-2 py-0.5 rounded-md bg-primary text-white transition-colors" // active style
                                                    : "px-2 py-0.5  rounded-md hover:bg-gray-100 transition-colors" // normal style
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                        {/* </NavigationMenuLink> */}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                {/* Right side */}
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    {
                        data?.data?.user ? <div>

                            <Button onClick={handleLogout}>
                                Sign Out
                            </Button>
                        </div> :
                            <div>

                                <Button asChild >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </header>
    )
}
