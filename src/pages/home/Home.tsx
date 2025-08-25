import Feature from "@/components/layout/home/Features"
// import Hero from "@/components/layout/home/Hero"
import Hero2 from "@/components/layout/home/Hero2"
import HowItWorks from "@/components/layout/home/HowItWorks"
import PricingOverview from "@/components/layout/home/PricingOverview"

const Home = () => {
  return (
    <div>
        <Hero2/>
        {/* <Hero/> */}
        <PricingOverview/>
        <HowItWorks/>
        <Feature/>
      
    </div>
  )
}

export default Home
