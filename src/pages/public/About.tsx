
import { motion } from "framer-motion"
import { Card,  CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Package,
  Shield,
  Zap,
  MapPin,
  Users,
  CheckCircle,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react"
import { SectionHeader } from "@/components/shared/sections/SectionHeader"

// --- Data ---
const stats = [
  { label: "Parcels Delivered", value: "15K+", icon: <Package className="w-6 h-6" /> },
  { label: "Cities Covered", value: "64", icon: <MapPin className="w-6 h-6" /> },
  { label: "Happy Customers", value: "8.5K+", icon: <Users className="w-6 h-6" /> },
  { label: "Success Rate", value: "99.8%", icon: <CheckCircle className="w-6 h-6" /> },
]

const values = [
  {
    title: "Speed",
    desc: "Same-day delivery options for urgent needs.",
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    className: "md:col-span-2",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Security",
    desc: "Real-time tracking and insured packages.",
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    className: "md:col-span-1",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Global Reach",
    desc: "Connecting you to the world.",
    icon: <Globe className="w-8 h-8 text-emerald-500" />,
    className: "md:col-span-1",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Reliability",
    desc: "We deliver on time, every time.",
    icon: <Clock className="w-8 h-8 text-purple-500" />,
    className: "md:col-span-2",
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

const teamMembers = [
  { name: "Aminul Islam", role: "CEO & Founder", initials: "AI", imageUrl: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", linkedinUrl: "https://www.linkedin.com/in/aminul-islam" },
  { name: "Fatima Rahman", role: "CTO", initials: "FR", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", linkedinUrl: "https://www.linkedin.com/in/fatima-rahman" },
  { name: "Karim Ahmed", role: "Head of Operations", initials: "KA", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", linkedinUrl: "https://www.linkedin.com/in/karim-ahmed" },
  { name: "Nasreen Begum", role: "Customer Success", initials: "NB", imageUrl: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", linkedinUrl: "https://www.linkedin.com/in/nasreen-begum" },
]

// --- Animations ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}


const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* SECTION 1: HERO BANNER */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1548695607-9c73430ba065?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" /> */}
        </div>


      </section>

      {/* SECTION 2: STATS BAND */}
      <div className="bg-primary text-primary-foreground py-12 relative z-20 -mt-8 mx-4 md:mx-12 rounded-2xl shadow-xl">

        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary-foreground/20">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="flex justify-center mb-2 opacity-80">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium opacity-80 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        {/* Hero Content */}
        <div className="container mx-auto relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <SectionHeader
              title="Who We Are"
              highlight="Moving the World"
              description="Learn more about our mission, values, and the team driving our success."
              className=" mb-4"

            />

          </motion.div>
        </div>
        {/* SECTION 3: OUR STORY (Split Layout) */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                More than just a <span className="text-primary">delivery company</span>.
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Founded in 2020, we started with a simple mission: to make shipping as easy as sending a text message. What began as a small courier service in Dhaka has grown into a nationwide logistics network.
                </p>
                <p>
                  We believe that every parcel tells a story—a gift for a loved one, a critical document for a business deal, or the first product sold by an entrepreneur. We take pride in being the bridge that connects these stories.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                      User
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold">Trusted by 500+ Businesses</p>
                  <p className="text-sm text-muted-foreground">Join the revolution</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Abstract decorative graphic */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Warehouse operations"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 shadow-lg">
                  <div className="bg-green-100 text-green-600 p-2 rounded-full">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Growth Year over Year</p>
                    <p className="text-xl font-bold">+125% Expansion</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: MISSION & VALUES (Bento Grid) */}
        <section className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Driven by Values</h2>
            <p className="text-muted-foreground">The core principles that guide every delivery we make.</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((item, i) => (
              <motion.div key={i} className={item.className}>
                <Card className="h-40 border-border/50 bg-secondary/20 overflow-hidden relative">
                  {/* Background Image */}
                  <div
                    className="h-40 w-full object-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.img})` }}
                    role="img"
                    aria-label={item.title}
                  >
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                      <CardTitle className="text-xl font-bold text-center">{item.title}</CardTitle>
                    </div>
                  </div>

                  
                </Card>
              </motion.div>


            ))}
          </motion.div>
        </section>

        {/* SECTION 5: TEAM */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-muted-foreground max-w-md">Meet the experts behind the logistics.</p>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Container: Handles aspect ratio, rounding, and overflow clipping */}
                <div className="relative overflow-hidden rounded-2xl bg-muted mb-4 aspect-[3/4] group">

                  {/* NEW: Background Image Div */}
                  {/* We use a div instead of img, set it to fill the parent, and apply the background styles */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${member.imageUrl})` }}
                    role="img" // Accessibility: Tell screen readers this is an image
                    aria-label={`${member.name}, ${member.role}`}
                  />

                  {/* Fallback Gradient Placeholder */}
                  <div className="absolute inset-0 hidden bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-4xl font-bold text-gray-300 dark:text-gray-600">
                    {member.initials}
                  </div>

                  {/* Hover Overlay */}
                  {/* Added z-10 to ensure the overlay sits on top of the background image */}
                  <div className="absolute inset-0 z-10 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {member.linkedinUrl ? (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Connect on LinkedIn
                        </a>
                      ) : (
                        <p className="font-medium">Connect on LinkedIn</p>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* SECTION 6: CTA BANNER */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Ready to ship smarter?
          </motion.h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of businesses who trust us with their deliveries. Get started today and experience the difference.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-full">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default About