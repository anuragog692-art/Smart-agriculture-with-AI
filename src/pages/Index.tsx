import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AISolutionsSection from '@/components/AISolutionsSection';
import Architecture3DShowcase from '@/components/Architecture3DShowcase';
import HowItWorksSection from '@/components/HowItWorksSection';
import ProjectWorkspace from '@/components/ProjectWorkspace';
import ConstructionIntelligenceSection from '@/components/ConstructionIntelligenceSection';
import CostAndMaterialSection from '@/components/CostAndMaterialSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <Header />
      <main>
        {/* Section 1: Cinematic Hero Section */}
        <HeroSection />

        {/* Section 2: About AI POWER */}
        <AboutSection />

        {/* Section 3: AI-Powered Building Solutions */}
        <AISolutionsSection />

        {/* Section 4: Interactive 3D Architecture Showcase */}
        <Architecture3DShowcase />

        {/* Section 5: How AI Building Planning Works */}
        <HowItWorksSection />

        {/* Section 6: Interactive AI Project Workspace */}
        <ProjectWorkspace />

        {/* Section 7: Smart Construction Intelligence */}
        <ConstructionIntelligenceSection />

        {/* Section 8: Cost Estimation and Material Planning */}
        <CostAndMaterialSection />

        {/* Section 9: Project Portfolio */}
        <PortfolioSection />

        {/* Section 10: Why Choose AI POWER */}
        <WhyChooseSection />

        {/* Section 11: Testimonials */}
        <TestimonialsSection />

        {/* Section 12: Frequently Asked Questions */}
        <FAQSection />

        {/* Section 13: Premium Contact Section */}
        <ContactSection />
      </main>

      {/* Section 14: Professional Footer */}
      <Footer />
    </div>
  );
};

export default Index;
