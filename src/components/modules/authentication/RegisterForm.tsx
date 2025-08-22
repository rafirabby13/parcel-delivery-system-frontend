/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import img from "../../../assets/images/login_2.jpg"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { useRegisterMutation } from "@/redux/feature/auth/auth.api"
import { Role } from "@/constants/role"
import { useId, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const formSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    name: z.string().min(2, { message: "Name is required" }),
    password: z.string().min(8, {
        message: "Must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
        message: "Must be at least 8 characters",
    }),
    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, {
            message: "Invalid Bangladeshi phone number (must be 11 digits, start with 013–019)",
        }),
    role: z.string()
}).refine((data) => data.password == data.confirmPassword, {
    message: " Password do not matched",
    path: ['confirmPassword']
})

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const id = useId()
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const [register] = useRegisterMutation(undefined)

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            role: ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...rest } = values

            console.log(rest)
            const res = await register(rest)
            if (res?.data?.success) {
                toast.success("Registered Successfully..")
                navigate("/login")

            }

        } catch (error: any) {
            toast.error("Error occures", error.message)
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="bg-muted relative hidden md:block border-r-2 ">
                        <img
                            src={img}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Sign Up to your account
                                </p>
                            </div>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" id="login-form">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your name here.." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your email here.." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    {/* <Input placeholder="Your password here.." {...field} /> */}
                                                    <div className="*:not-first:mt-2">
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                id={id}
                                                                className="pe-9"
                                                                placeholder="Password"
                                                                type={isVisible ? "text" : "password"}
                                                            />
                                                            <button
                                                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="button"
                                                                onClick={toggleVisibility}
                                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                                aria-pressed={isVisible}
                                                                aria-controls="password"
                                                            >
                                                                {isVisible ? (
                                                                    <EyeOffIcon size={16} aria-hidden="true" />
                                                                ) : (
                                                                    <EyeIcon size={16} aria-hidden="true" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    {/* <Input placeholder="Your password here.." {...field} /> */}
                                                    <div className="*:not-first:mt-2">
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                id={id}
                                                                className="pe-9"
                                                                placeholder="Password"
                                                                type={isVisible ? "text" : "password"}
                                                            />
                                                            <button
                                                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="button"
                                                                onClick={toggleVisibility}
                                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                                aria-pressed={isVisible}
                                                                aria-controls="password"
                                                            >
                                                                {isVisible ? (
                                                                    <EyeOffIcon size={16} aria-hidden="true" />
                                                                ) : (
                                                                    <EyeIcon size={16} aria-hidden="true" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="01834526153" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="role"
                                        
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Select Your Role</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                    <FormControl className="w-full">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Your Role" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent >
                                                        {[Role.SENDER, Role.RECEIVER, Role.DELIVERY_PERSON].map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type.charAt(0) + type.slice(1).toLowerCase()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />



                                </form>
                            </Form>
                            <Button type="submit" className="w-full" form="login-form">
                                Sign up
                            </Button>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link to={"/login"} className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
