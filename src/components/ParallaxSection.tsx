import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import featureBg from "@/assets/feature-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${featureBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-bold mb-6">
          <span className="text-gradient">Innovation</span>
          <br />
          Meets Excellence
        </h2>
        <p className="text-xl md:text-3xl text-muted-foreground">
          Where cutting-edge technology transforms ambitious visions into reality
        </p>
      </div>
    </section>
  );
};

export default ParallaxSection;
