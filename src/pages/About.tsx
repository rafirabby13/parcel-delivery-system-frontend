
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Shield,
  Zap,
  MapPin,
  Users,
  CheckCircle,
} from "lucide-react"

const stats = [
  { label: "Parcels Delivered", value: "15,000+", icon: <Package size={24} /> },
  { label: "Cities Covered", value: "64", icon: <MapPin size={24} /> },
  { label: "Happy Customers", value: "8,500+", icon: <Users size={24} /> },
  { label: "Success Rate", value: "99.8%", icon: <CheckCircle size={24} /> },
]

const teamMembers = [
  { name: "Aminul Islam", role: "CEO & Founder", avatar: "AI" },
  { name: "Fatima Rahman", role: "CTO", avatar: "FR" },
  { name: "Karim Ahmed", role: "Head of Operations", avatar: "KA" },
  { name: "Nasreen Begum", role: "Customer Success", avatar: "NB" },
]

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-primary">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative bg-gradient-to-br from-white via-blue-50 to-purple-50 ">
        <div className="max-w-5xl mx-auto text-center px-6">
          <Badge className="bg-white/20 text-white px-4 py-2 mb-6 border-0">
            About Us
          </Badge>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Delivering Trust,{" "}
            <span >One Parcel at a Time</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-lg  max-w-2xl mx-auto"
          >
            Bangladesh's fastest-growing delivery service. We make shipping
            reliable, affordable, and seamless for businesses and individuals.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Mission & Vision */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          {[ 
            {
              icon: <Shield className="text-blue-600 w-12 h-12 mb-6" />,
              title: "Our Mission",
              desc: "Revolutionize parcel delivery with secure, fast, and affordable solutions that connect Bangladesh end-to-end.",
              bg: "from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20",
            },
            {
              icon: <Zap className="text-purple-600 w-12 h-12 mb-6" />,
              title: "Our Vision",
              desc: "Become Bangladesh’s most trusted delivery platform, powered by innovation and world-class customer service.",
              bg: "from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/20",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card
                className={`bg-gradient-to-br ${item.bg} border-0 shadow-lg hover:shadow-2xl transition duration-300`}
              >
                <CardContent className="p-8">
                  {item.icon}
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-100 dark:bg-gray-800 rounded-3xl mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Numbers that reflect our commitment
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="bg-blue-600/10 dark:bg-blue-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experienced leaders driving innovation in logistics
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl hover:scale-[1.03] transition duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-primary to-primary/70 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {member.avatar}
                    </div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-purple-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
          
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default About
