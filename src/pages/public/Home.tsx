import FAQ from "@/features/landing/components/FAQ/FAQ"
import Feature from "@/features/landing/components/Features/Features"
import Hero from "@/features/landing/components/Hero/Hero"
// import Hero from "@/components/layout/home/Hero"
import HowItWorks from "@/features/landing/HowItWorks/HowItWorks"
import { PricingCalculator } from "@/features/landing/PricingCalculator/PricingCalculator"
import PricingOverview from "@/features/landing/PricingOverview/PricingOverview"
import Testimonials from "@/features/landing/Testimonials/Testimonials"

const Home = () => {
  return (
    <div>
        <Hero/>
        <PricingOverview/>
        <PricingCalculator/>
        <HowItWorks/>
        <Feature/>
        <Testimonials/>
        <FAQ/>
      
    </div>
  )
}

export default Home
