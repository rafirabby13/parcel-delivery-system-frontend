
// import Logo from "@/assets/icons/Logo"
// import { Button } from "@/components/ui/button"
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { Link, NavLink } from "react-router"
// import { ModeToggle } from "../ModeToggle"
// import { useGetMeQuery, userApi } from "@/redux/feature/user/user.api"
// import { Role } from "@/constants/role"
// import { authApi, useLogoutMutation } from "@/redux/feature/auth/auth.api"
// import { useDispatch } from "react-redux"
// import { Loader1 } from "@/utils/Loader1"

// // Navigation links array to be used in both desktop and mobile menus


// export default function Navbar() {
//     const { data, isLoading } = useGetMeQuery(undefined)
//     const [logout] = useLogoutMutation()
//     const dispatch = useDispatch()
//     // if (isLoading) {
//     //     return <LoaderIcon />
//     // }
//     // console.log(data?.data?.user)
//     const role = data?.data?.user?.role
//     // console.log(role)
//     const navigationLinks = [
//         { href: "/", label: "Home" },
//         { href: "about", label: "About" },
//         { href: "contact", label: "Contact" },
//         { href: "track-parcel", label: "Track Parcel" },
//         { href: role === Role.SUPER_ADMIN ? "/dashboard/admin" : role === Role.SENDER ? "/dashboard/sender" : role === Role.DELIVERY_PERSON ? "/dashboard/delivery-person" : "/dashboard/receiver", label: "Dashboard" },
//     ]
//     const handleLogout = async () => {
//         await logout().unwrap()
//         dispatch(userApi.util.resetApiState())
//         dispatch(authApi.util.resetApiState())

//     }
//     return (
//         <header className="border-b px-4 md:px-6 w-full fixed top-0  bg-primary text-foreground ">
//             <div className="flex h-24 items-center justify-between gap-4 container mx-auto">
//                 {/* Left side */}
//                 <div className="flex items-center gap-2">
//                     {/* Mobile menu trigger */}
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 className="group size-8 md:hidden"
//                                 variant="ghost"
//                                 size="icon"
//                             >
//                                 <svg
//                                     className="pointer-events-none"
//                                     width={16}
//                                     height={16}
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M4 12L20 12"
//                                         className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
//                                     />
//                                 </svg>
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent align="start" className="w-40   md:hidden">
//                             <NavigationMenu className="max-w-none *:w-full">
//                                 <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
//                                     {navigationLinks.map((link, index) => (
//                                         <NavigationMenuItem key={index} className="w-full border-4 ">
//                                             <NavigationMenuLink
//                                                 asChild
//                                                 className="py-1.5"
//                                             >
//                                                 <Link to={link.href}>
//                                                     {link.label}

//                                                 </Link>
//                                             </NavigationMenuLink>
//                                         </NavigationMenuItem>
//                                     ))}
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </PopoverContent>
//                     </Popover>
//                     {/* Main nav */}
//                     <div className="flex items-center gap-6 p-1">
//                         <Link to="/" className="text-primary hover:text-primary/90">
//                             <Logo />
//                         </Link>
//                         {/* Navigation menu */}
//                         <NavigationMenu className="max-lg:hidden ">
//                             <NavigationMenuList className="gap-1 flex">
//                                 {navigationLinks.map((link, index) => (
//                                     <NavigationMenuItem key={index} >
//                                         {/* <NavigationMenuLink
//                                             asChild
//                                             // className="py-1.5 px-3 rounded-md  transition-colors"
//                                         > */}
//                                         {/* <Link to={link.href}>
//                                                 {link.label}

//                                             </Link> */}
//                                         <NavLink
//                                             to={link.href}
//                                             end={link.href === "/"} // make Home exact

//                                             className={({ isActive }) =>
//                                                 isActive
//                                                     ? "border-b-4 border-x-2 border-foreground bg-foreground px-7 py-2 rounded-sm font-medium shadow-md transition-all duration-200" // active style
//                                                     : "px-7 py-2 border-r-2 border-t-2 border-l-2  border-primary  font-bold  rounded-md hover:bg-gray-100 transition-colors" // normal style
//                                             }
//                                         >
//                                             {link.label}
//                                         </NavLink>
//                                         {/* </NavigationMenuLink> */}
//                                     </NavigationMenuItem>
//                                 ))}
//                             </NavigationMenuList>
//                         </NavigationMenu>
//                     </div>
//                 </div>
//                 {/* Right side */}
//                 <div className="flex items-center gap-2">
//                     <ModeToggle />
//                     {
//                         data?.data?.user ? <div>

//                             <Button onClick={handleLogout}>
//                                 {isLoading ? <Loader1 /> : "Sign Out" }
//                             </Button>
//                         </div> :
//                             <div>

//                                 <Button asChild >
//                                     <Link to="/login">Sign In</Link>
//                                 </Button>
//                             </div>
//                     }
//                 </div>
//             </div>
//         </header>
//     )
// }
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
import { Loader1 } from "@/utils/Loader1"

export default function Navbar() {
    const { data, isLoading } = useGetMeQuery(undefined)
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()
    
    const role = data?.data?.user?.role
    
    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "about", label: "About" },
        { href: "contact", label: "Contact" },
        { href: "track-parcel", label: "Track Parcel" },
        { href: role === Role.SUPER_ADMIN ? "/dashboard/admin" : role === Role.SENDER ? "/dashboard/sender" : role === Role.DELIVERY_PERSON ? "/dashboard/delivery-person" : "/dashboard/receiver", label: "Dashboard" },
    ]
    
    const handleLogout = async () => {
        await logout().unwrap()
        dispatch(userApi.util.resetApiState())
        dispatch(authApi.util.resetApiState())
    }
    
    return (
        <header className="border-b border-primary-foreground/20 px-4 md:px-6 w-full fixed top-0 bg-primary dark:bg-background z-[100] text-primary-foreground dark:text-foreground backdrop-blur-3xl">
            <div className="flex h-24 items-center justify-between gap-4 container mx-auto">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
                                variant="ghost"
                                size="default"
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
                        <PopoverContent align="start" className="w-40 lg:hidden  border z-999 bg-background">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-full">
                                            <NavigationMenuLink
                                                asChild
                                                className="py-1 text-card-foreground hover:text-primary border my-1"
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
                        <Link to="/" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors">
                            <Logo />
                        </Link>
                        
                        {/* Navigation menu */}
                        <NavigationMenu className="max-lg:hidden">
                            <NavigationMenuList className="gap-1 flex">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavLink
                                            to={link.href}
                                            end={link.href === "/"} // make Home exact
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "border-b-4 border-x-2 border-primary-foreground bg-primary-foreground dark:bg-foreground dark:border-foreground/30 text-primary dark:text-primary-foreground  px-7 py-2 rounded-sm font-medium shadow-md transition-all duration-200" // active style
                                                    : "px-7 py-2 border-r-2 border-t-2 border-l-2 border-primary-foreground/30 dark:border-foreground/30 text-primary-foreground font-bold rounded-md hover:bg-primary-foreground/10 transition-colors dark:text-foreground" // normal style
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                
                {/* Right side */}
                <div className="flex items-center gap-2 text-primary">
                    <ModeToggle />
                    {
                        data?.data?.user ? 
                        <div>
                            <Button 
                                onClick={handleLogout}
                                variant="secondary"
                                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                            >
                                {isLoading ? <Loader1 /> : "Sign Out"}
                            </Button>
                        </div> :
                        <div>
                            <Button 
                                asChild 
                                variant="secondary"
                                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                            >
                                <Link to="/login">Sign In</Link>
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}