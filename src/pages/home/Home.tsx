import FAQ from "@/components/layout/home/FAQ"
import Feature from "@/components/layout/home/Features"
// import Hero from "@/components/layout/home/Hero"
import Hero2 from "@/components/layout/home/Hero2"
import HowItWorks from "@/components/layout/home/HowItWorks"
import { PricingCalculator } from "@/components/layout/home/PricingCalculator"
import PricingOverview from "@/components/layout/home/PricingOverview"
import Testimonials from "@/components/layout/home/Testimonials"

const Home = () => {
  return (
    <div>
        <Hero2/>
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
