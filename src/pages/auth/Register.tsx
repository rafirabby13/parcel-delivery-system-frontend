import { RegisterForm } from "@/features/auth/components/RegisterForm"


const Register = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 border-4">
          <div className="w-full max-w-sm  md:max-w-7xl mx-auto ">
            <RegisterForm/>
          </div>
        </div>
  )
}

export default Register
