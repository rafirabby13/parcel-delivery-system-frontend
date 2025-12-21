
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeader } from '@/components/shared/SectionHeader'

const faqs = [
    {
        question: "How do I track my shipment?",
        answer: "You can track your shipment using the tracking ID provided in your booking confirmation email or SMS. Simply enter the ID in the tracking box on our homepage."
    },
    {
        question: "Is there insurance for valuable items?",
        answer: "Yes, we offer insurance coverage for premium and express shipments. The coverage value depends on the declared value of the package at the time of booking."
    },
    {
        question: "What items are prohibited?",
        answer: "We do not transport hazardous materials, illegal substances, live animals, or perishable food items without special packaging. Please check our terms for a full list."
    },
    {
        question: "Can I change the delivery address after booking?",
        answer: "Yes, you can request a change within 2 hours of booking. Once the driver has picked up the package, address changes may incur a small rerouting fee."
    }
]

const FAQ = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container max-w-4xl mx-auto px-6">
                <SectionHeader
                    badge="FAQ"
                    title="Common"
                    highlight="Questions"
                    description="Everything you need to know about shipping with us."
                    className="text-center mb-12"
                />

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

export default FAQ