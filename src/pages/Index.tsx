import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InteractiveAgriCards from "@/components/InteractiveAgriCards";
import WeatherSection from "@/components/WeatherSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header />
      <main>
        <HeroSection />
        <InteractiveAgriCards />
        <WeatherSection />
        <FeaturesSection />
        <WhyChooseSection />
        <WhatsAppCTA />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
