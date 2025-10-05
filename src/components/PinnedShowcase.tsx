import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productImg from "@/assets/product-1.jpg";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discover",
    description: "Explore endless possibilities with our intelligent platform designed to understand your unique needs.",
  },
  {
    title: "Create",
    description: "Build exceptional experiences with our powerful tools and intuitive interface.",
  },
  {
    title: "Scale",
    description: "Grow without limits as your success story unfolds with enterprise-grade infrastructure.",
  },
  {
    title: "Succeed",
    description: "Achieve remarkable results that transform your business and exceed expectations.",
  },
];

const PinnedShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    
    if (!section || !image) return;

    const ctx = gsap.context(() => {
      // Pin the image while text scrolls
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: image,
        pinSpacing: false,
      });

      // Animate each text section
      textRefs.current.forEach((textEl, index) => {
        if (!textEl) return;

        // Animate the number with more drama
        const numberEl = textEl.querySelector('.step-number');
        const titleEl = textEl.querySelector('.step-title');
        const descEl = textEl.querySelector('.step-desc');

        gsap.fromTo(
          numberEl,
          { 
            opacity: 0, 
            scale: 0.5,
            rotation: -15,
            x: -100 
          },
          {
            opacity: 0.2,
            scale: 1,
            rotation: 0,
            x: 0,
            scrollTrigger: {
              trigger: textEl,
              start: "top center+=200",
              end: "center center-=100",
              scrub: 2,
            },
          }
        );

        // Stagger title animation
        gsap.fromTo(
          titleEl,
          { 
            opacity: 0, 
            y: 80,
            x: -50,
            rotateX: 45
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            scrollTrigger: {
              trigger: textEl,
              start: "top center+=150",
              end: "center center-=50",
              scrub: 1.5,
            },
          }
        );

        // Description with delay
        gsap.fromTo(
          descEl,
          { 
            opacity: 0, 
            y: 60,
            blur: 10
          },
          {
            opacity: 1,
            y: 0,
            blur: 0,
            scrollTrigger: {
              trigger: textEl,
              start: "top center+=100",
              end: "center center",
              scrub: 1.5,
            },
          }
        );

        // Dynamic image transformations with more variation
        gsap.fromTo(
          image,
          { 
            scale: 1 + (index * 0.05),
            rotation: index * 1.5,
          },
          {
            scale: 1.2 + (index * 0.15),
            rotation: (index + 1) * 3,
            filter: `brightness(${1 + index * 0.1}) contrast(${1.1 + index * 0.05})`,
            scrollTrigger: {
              trigger: textEl,
              start: "top center+=100",
              end: "bottom center-=100",
              scrub: 2,
            },
          }
        );

        // Image position shift for parallax effect
        gsap.fromTo(
          image,
          { 
            y: index * 20,
            x: 0
          },
          {
            y: (index + 1) * 40,
            x: index % 2 === 0 ? 10 : -10,
            scrollTrigger: {
              trigger: textEl,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Pinned Image */}
          <div className="lg:sticky lg:top-24 h-screen flex items-center">
            <div ref={imageRef} className="relative w-full will-change-transform">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 animate-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-3xl"></div>
              <img
                src={productImg}
                alt="Showcase"
                className="relative rounded-3xl shadow-2xl w-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Scrolling Text */}
          <div className="space-y-[60vh] py-32">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className="min-h-[60vh] flex flex-col justify-center perspective-1000"
              >
                <div className="step-number text-8xl md:text-9xl font-bold text-gradient mb-8 will-change-transform">
                  0{index + 1}
                </div>
                <h3 className="step-title text-5xl md:text-7xl font-bold mb-8 will-change-transform">
                  {step.title}
                </h3>
                <p className="step-desc text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl will-change-transform">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedShowcase;
