import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HorizontalGallery from "@/components/HorizontalGallery";
import AnimatedStats from "@/components/AnimatedStats";
import Showcase from "@/components/Showcase";
import ProcessTimeline from "@/components/ProcessTimeline";
import InteractiveGrid from "@/components/InteractiveGrid";
import ParallaxSection from "@/components/ParallaxSection";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HorizontalGallery />
      <AnimatedStats />
      <Showcase />
      <ProcessTimeline />~
      <InteractiveGrid />
      <ParallaxSection />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
