import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export function OTP() {
    return (
        <InputOTP maxLength={6}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPGroup>
                <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
                <InputOTPSlot index={2} />
            </InputOTPGroup>
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
    )
}
