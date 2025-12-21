import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Package,
    TruckIcon,
    Clock,
    Shield,
    CheckCircle
} from "lucide-react"
import { Link } from "react-router"
import { motion, useTime, useTransform } from "framer-motion"
import Typewriter from 'typewriter-effect';


import img from "../../../assets/images/scooter-1027350_1280-removebg-preview (1).png"

const Hero2 = () => {
    const time = useTime()
    const rotate = useTransform(
        time,
        [0, 4000], // time in milliseconds
        [0, 360], // rotation in degrees
        { clamp: false }
    )
    const tinyBox = {
        width: 32,
        height: 32,
        backgroundColor: "#11296b",
        borderRadius: 6,
        rotate: useTransform(() => rotate.get() * 1.5),
    }

    return (
        <section
                        // style={{ clipPath: "polygon(0 0%, 100% 0%, 100% 79%, 0% 100%)" }}
            className="relative z-10 bg-gradient-to-tl from-chart-2/10 via-muted/90 to-chart-4/10 dark:from-background dark:via-muted/95 dark:to-card "
        >
            <div className="absolute top-24 right-[17%] w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
            {/* Bottom Left Blob */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
            <div className="container mx-auto   py-8   grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT SIDE: Content */}
                <div className="text-center lg:text-left space-y-3">
                    {/* Badge */}
                    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm shadow-sm border border-b-primary bg-primary/3 text-primary">
                        <TruckIcon size={14} className="text-primary" />
                        <span className="font-semibold">Trusted by 50K+ customers</span>
                    </Badge>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl  font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
                        24/7
                        Parcel Delivery
                        <br /> Across Bangladesh
                        <br />
                        <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text ">

                            <Typewriter
                                options={{
                                    strings: ["& Fast.", "& Reliable.", "& Secure."],
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                    deleteSpeed: 30,
                                }}

                            />
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg sm:text-xl dark:text-gray-300  max-w-xl mx-auto lg:mx-0">
                        From pickup to doorstep, send parcels nationwide with real-time tracking,
                        same-day delivery, and total peace of mind.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0 pt-2">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 text-base font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                        >
                            <Link to="/dashboard/sender/create-parcel">
                                <Package className="mr-2 h-5 w-5" />
                                Book a Parcel
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            // FIX: Added bg-white/60 to make it pop against background
                            className="h-12 px-8 text-base font-semibold border-2 border-gray-200 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-gray-300 transition-all"
                        >
                            <Link to="/track-parcel">
                                <TruckIcon className="mr-2 h-5 w-5" />
                                Track Parcel
                            </Link>
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
                        <Feature icon={<Clock size={16} className="text-blue-500" />} label="Same Day Delivery" />
                        <Feature icon={<Shield size={16} className="text-green-500" />} label="Secure & Insured" />
                        <Feature icon={<CheckCircle size={16} className="text-purple-500" />} label="Live Tracking" />
                    </div>
                </div>

                {/* RIGHT SIDE: Illustration / Image */}
                {/* <div className="hidden lg:flex justify-center items-center relative">
                    <div style={{ ...layer, filter: "blur(4px)" }}>
                        <div style={{ ...boxContainer, width: 500, gap: 80 }}>
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                            <motion.div style={tinyBox} />
                        </div>
                    </div>
                    <img
                        src={img}
                        alt="Parcel Delivery"
                        className="w-full max-w-2xl drop-shadow-2xl shadow-amber-600"
                    />
                </div> */}
                <div className="hidden lg:flex justify-center items-center relative min-h-[500px]">
                    {/* Background Particles Layer */}
                    <div className="absolute inset-0 flex justify-center items-center blur-[2px] opacity-30 pointer-events-none">
                        <div className="flex flex-wrap justify-center gap-12 w-[500px]">
                            {/* CLEANER CODE: Generating particles dynamically */}
                            {Array.from({ length: 42 }).map((_, i) => (
                                <motion.div key={i} style={tinyBox} />
                            ))}
                        </div>
                    </div>

                    {/* Main Image */}
                    <img
                        src={img}
                        alt="Parcel Delivery Scooter"
                        className="relative z-10 w-full max-w-[600px] drop-shadow-2xl transition-transform hover:scale-[1.02] duration-500"
                    />
                </div>

            </div>
        </section >
    )
}

const Feature = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
        {icon}
        <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
)

export default Hero2
