import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import {

    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import z from "zod"
import { Dot } from "lucide-react"
import { useSendOTPMutation, useVerifyOTPMutation } from "@/redux/feature/auth/auth.api"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const VerifyUser = () => {
    const location = useLocation()
    const [email] = useState(location.state)
    const [timer, setTimer] = useState(120)

    const [confirmed, setconfimred] = useState(false)
    const navigate = useNavigate()

    const [sendOTP] = useSendOTPMutation()
    const [verifyOTP] = useVerifyOTPMutation()

    //! needed for development
    // useEffect(() => {
    //     if (!email) {
    //         navigate("/")
    //     }
    // }, [])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const handleSendOTP = async () => {
        toast.success("OTP is sending....")
        setTimer(120)
        try {
            setconfimred(true)
            const res = await sendOTP({ email: email })
            // console.log(res)
            if (res?.data?.success) {
                toast.success("OTP sent....")

            }

        } catch (error) {
            console.log(error)
        }
    }
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(data)
        const userInfo = {
            email,
            otp: data.pin
        }

        try {
            const res = await verifyOTP(userInfo).unwrap()
            // console.log(res)
            if (res?.success) {
                toast.success("OTP Verified")
                navigate("/login")

            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const timeId = setInterval(() => {
            if (email && confirmed) {
                setTimer(prev => prev > 0 ? prev - 1 : 0)
            }

        }, 1000);

        return () => clearInterval(timeId)
    }, [email, confirmed])


    return (
        <div className="max-w-sm mx-auto my-40">
            {
                confirmed ? <Card>
                    <CardHeader>
                        <CardTitle>Verify Your Email</CardTitle>
                        <CardDescription>
                            We’ve sent a 6-digit verification code to {email}. Please enter it below.
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>One-Time Password</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={1} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <Dot />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={4} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>

                                                </InputOTP>
                                            </FormControl>

                                            <FormDescription>
                                                {
                                                    timer > 0 ? <div>Resend OTP in {timer}</div> :
                                                        <Button variant={"link"} type="button" onClick={handleSendOTP} disabled={timer !== 0}>Resend OTP</Button>
                                                }
                                            </FormDescription>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button form="otp-form" type="submit" >Verify</Button>
                    </CardFooter>

                </Card> : <Card>
                    <CardHeader>
                        <CardTitle>Verify Your Email</CardTitle>
                        <CardDescription>
                            We will sent a 6-digit verification code to {email}.
                        </CardDescription>
                        {/* <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                    <CardFooter className="w-full">
                        <Button onClick={handleSendOTP} form="otp-form" className="w-full" type="submit" >Confirm</Button>
                    </CardFooter>

                </Card>
            }

        </div>
    )
}

export default VerifyUser
