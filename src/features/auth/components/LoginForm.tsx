/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import img from "../../../assets/images/login.jpg"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router"
import { useLoginMutation } from "@/features/auth/api/auth.api"
import { toast } from "sonner"
import { useId, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Loader } from "@/components/shared/feedback/Loader"

const formSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const id = useId()
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation(undefined)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // --- NEW: Helper function to set values ---
    const autoFill = (email: string, pass: string) => {
        form.setValue("email", email)
        form.setValue("password", pass)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await login(values).unwrap()
            if (res?.success) {
                toast.success("logged in successfully")
                navigate("/")
            }
        } catch (error: any) {
            if (error?.data?.message === "Not verified , please verify first") {
                navigate("/verify", { state: values?.email })
            }
            toast.error(error?.data?.message)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your account
                                </p>
                            </div>

                            {/* --- NEW: Auto Fill Buttons --- */}
                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="text-xs h-8"
                                    onClick={() => autoFill("super.admin.13@gmail.com", "Super13")}
                                >
                                    Admin
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="text-xs h-8"
                                    onClick={() => autoFill("rafiahmedrabby282@gmail.com", "Rafi12345??")}
                                >
                                    Sender
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="text-xs h-8"
                                    onClick={() => autoFill("rabby.sdp.13@gmail.com", "Rafi12345??")}
                                >
                                    Receiver
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="text-xs h-8"
                                    onClick={() => autoFill("rafii13@gmail.com", "Rafi12345??")}
                                >
                                    Deliveryman
                                </Button>
                            </div>
                            {/* ----------------------------- */}

                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="login-form">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Your email here.." {...field} />
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
                                </form>
                            </Form>
                            <Button type="submit" className="w-full" form="login-form">
                                Login
                            </Button>
                         
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to={"/register"} className="underline underline-offset-4">
                                    {isLoading ? <Loader /> : "Sign up"}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted relative hidden md:block border-l-2 ">
                        <img
                            src={img}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
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