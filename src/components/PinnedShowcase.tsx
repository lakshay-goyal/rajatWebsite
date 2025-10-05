"use client";
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
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const ctx = gsap.context(() => {
      /** 🎬 Background gradient scroll animation */
      gsap.to(section, {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      /** 📌 Pin image */
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: image,
        pinSpacing: false,
        anticipatePin: 1,
      });

      /** ✨ Each step animation */
      textRefs.current.forEach((textEl, index) => {
        if (!textEl) return;

        const numberEl = textEl.querySelector(".step-number");
        const titleEl = textEl.querySelector(".step-title");
        const descEl = textEl.querySelector(".step-desc");

        /** Timeline for smooth sequential animations */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top center+=150",
            end: "bottom center",
            scrub: 2,
          },
        });

        tl.fromTo(
          numberEl,
          { opacity: 0, y: 100, scale: 0.5, rotateX: 45 },
          { opacity: 0.2, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: "power2.out" }
        )
          .fromTo(
            titleEl,
            { opacity: 0, y: 80, skewY: 10 },
            { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            descEl,
            { opacity: 0, y: 60, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
            "-=0.5"
          );
      });

      /** 🌀 Single progress-driven image transform for smoothness */
      if (image && stepsContainerRef.current) {
        gsap.set(image, { willChange: "transform, filter", force3D: true });
        const quickY = gsap.quickTo(image, "y", { duration: 0.25, ease: "power1.out" });
        const quickScale = gsap.quickTo(image, "scale", { duration: 0.25, ease: "power1.out" });
        const quickRot = gsap.quickTo(image, "rotation", { duration: 0.25, ease: "power1.out" });

        const stepCount = textRefs.current.length || 1;
        ScrollTrigger.create({
          trigger: stepsContainerRef.current,
          start: "top top+=100",
          end: "bottom bottom-=100",
          scrub: false,
          onUpdate: (self) => {
            const p = self.progress;
            const y = p * stepCount * 40; // match per-step offset
            const scale = 1.1 + p * 0.25;
            const rotation = gsap.utils.mapRange(0, 1, -3, 3, p);
            const brightness = 1 + p * 0.45;
            const contrast = 1.05 + p * 0.3;
            quickY(y);
            quickScale(scale);
            quickRot(rotation);
            gsap.set(image, { filter: `brightness(${brightness}) contrast(${contrast})` });
          },
        });
      }

      /** Floating / glowing animation on image for liveliness */
      gsap.to(image, {
        scale: 1.02,
        yoyo: true,
        repeat: -1,
        duration: 4,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[linear-gradient(120deg,#0f172a,#1e293b,#0f172a)] bg-[length:200%_200%] transition-all duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 📸 Pinned Image */}
          <div className="lg:sticky lg:top-24 h-screen flex items-center justify-center">
            <div
              ref={imageRef}
              className="relative w-[80%] max-w-lg will-change-transform perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 blur-3xl opacity-30"></div>
              <img
                src={productImg}
                alt="Showcase"
                className="relative rounded-3xl shadow-2xl w-full object-cover transition-all duration-700"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* 📝 Scrolling Text */}
          <div ref={stepsContainerRef} className="space-y-[60vh] py-32">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className="min-h-[60vh] flex flex-col justify-center perspective-1000"
              >
                <div className="step-number text-8xl md:text-9xl font-extrabold text-gradient mb-8 opacity-30">
                  0{index + 1}
                </div>
                <h3 className="step-title text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                  {step.title}
                </h3>
                <p className="step-desc text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
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
