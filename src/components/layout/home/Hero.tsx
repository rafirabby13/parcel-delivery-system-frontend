
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

const Hero = () => {
    return (
        <section className="relative  bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 py-20">
                    
                    {/* Badge */}
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium border-0">
                        <TruckIcon size={16} className="mr-2" />
                        #1 Parcel Delivery Service in Bangladesh
                    </Badge>

                    {/* Main Heading */}
                    <div className="space-y-4 max-w-4xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Fast & Reliable
                            </span>
                            <br />
                            <span className="text-gray-900 dark:text-white">
                                Parcel Delivery
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Across Bangladesh
                            </span>
                        </h1>
                        
                        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Send parcels anywhere in Bangladesh with our secure, fast, and affordable delivery service. 
                            Track your package in real-time from pickup to delivery.
                        </p>
                    </div>

                    {/* Key Features Pills */}
                    <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
                        <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                            <Clock size={16} className="text-blue-500 mr-2" />
                            <span className="text-sm font-medium">Same Day Delivery</span>
                        </div>
                        <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                            <Shield size={16} className="text-green-500 mr-2" />
                            <span className="text-sm font-medium">100% Secure</span>
                        </div>
                        <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                            <CheckCircle size={16} className="text-purple-500 mr-2" />
                            <span className="text-sm font-medium">Real-time Tracking</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                        <Button 
                            asChild
                            className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            <Link to="/dashboard/sender/create-parcel" className="flex items-center justify-center gap-2">
                                <Package size={20} />
                                Book a Parcel
                                <ArrowRight size={16} />
                            </Link>
                        </Button>

                        <Button 
                            asChild
                            variant="outline"
                            className="flex-1 h-14 text-lg font-semibold bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Link to="/track-parcel" className="flex items-center justify-center gap-2">
                                <TruckIcon size={20} />
                                Track Parcel
                            </Link>
                        </Button>
                    </div>

                    

                

                   
                </div>
            </div>
        </section>
    )
}

export default Hero