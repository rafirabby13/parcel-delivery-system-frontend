import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { SectionHeader } from '@/components/shared/sections/SectionHeader'

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Small Business Owner",
        company: "Handmade Haven",
        content: "The real-time tracking is a game changer for my customers. I used to get 10 emails a day asking 'where is my package?'. Now I get zero. Highly recommended!",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        name: "Rahim Ahmed",
        role: "Logistics Manager",
        company: "TechRetail BD",
        content: "We shifted 100% of our inter-district deliveries to this platform. The API integration was seamless, and the bulk pricing saved us about 20% in Q1.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        name: "Emily Chen",
        role: "Frequent Sender",
        company: "Personal",
        content: "I sent a fragile laptop to my brother in Sylhet. The 'Premium' packaging option was worth every penny. It arrived without a scratch the next morning.",
        rating: 4,
        image: "https://i.pravatar.cc/150?u=a04258114e29026302d"
    }
]

const Testimonials = () => {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-6">
                <SectionHeader
                    badge="Testimonials"
                    title="Trusted by"
                    highlight="Thousands"
                    description="Don't just take our word for it. Here is what our partners and customers have to say."
                    className="text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <Card key={idx} className="bg-card border-none shadow-lg relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Quote size={80} className="text-primary" />
                            </div>
                            
                            <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                <Avatar className="h-12 w-12 border-2 border-primary/20">
                                    <AvatarImage src={item.image} alt={item.name} />
                                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-bold text-sm">{item.name}</h4>
                                    <p className="text-xs text-muted-foreground">{item.role}, {item.company}</p>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={16} 
                                            className={`${i < item.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground italic leading-relaxed">
                                    "{item.content}"
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials