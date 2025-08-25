import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Package,
    TruckIcon,
    Clock,
    Shield,
    ArrowRight,
    CheckCircle
} from "lucide-react"
import { Link } from "react-router"
import { motion, useTime, useTransform } from "framer-motion"


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
        width: 40,
        height: 40,
        // backgroundColor: "#9911ff",
        backgroundColor: "#11296b",
        borderRadius: 5,
        rotate: useTransform(() => rotate.get() * 2), // 2x speed
    }
    const layer: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    }

    const boxContainer: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        flexWrap: "wrap",
    }
    return (
        <section className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16  grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT SIDE: Content */}
                <div className="text-center lg:text-left space-y-6">
                    {/* Badge */}
                    <Badge className="inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-xl text-sm shadow-md">
                        <TruckIcon size={16} />
                        Trusted by 50K+ customers
                    </Badge>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
                            {/* <TypingEffect text="Fast, Reliable & Secure"/> */}
                           Fast, Reliable & Secure
                        </span>
                        <br />
                        Parcel Delivery Across Bangladesh
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg sm:text-xl text-secondary dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                        From pickup to doorstep, send parcels nationwide with real-time tracking,
                        same-day delivery, and total peace of mind.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                        <Button
                            asChild
                            size="lg"
                            className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-primary/70 to-primary hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transition-all"
                        >
                            <Link to="/dashboard/sender/create-parcel" className="flex items-center gap-2 justify-center">
                                <Package size={20} />
                                Book a Parcel
                                <ArrowRight size={18} />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                            <Link to="/track-parcel" className="flex items-center gap-2 justify-center">
                                <TruckIcon size={20} />
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
                <div className="hidden lg:flex justify-center items-center relative">
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
                </div>
            </div>
        </section>
    )
}

const Feature = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
        {icon}
        <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
)

export default Hero2
