import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/hero-bg.jpg";
import featureBg from "@/assets/feature-bg.jpg";
import product1 from "@/assets/product-1.jpg";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { title: "Innovation", image: heroBg },
  { title: "Design", image: featureBg },
  { title: "Performance", image: product1 },
  { title: "Scalability", image: heroBg },
  { title: "Security", image: featureBg },
  { title: "Excellence", image: product1 },
];

const HorizontalGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    const heading = headingRef.current;

    if (!section || !scroll) return;

    // Calculate total scroll distance
    const scrollWidth = scroll.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Pin the entire section, but keep heading fixed on top
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (galleryItems.length - 1),
            duration: { min: 0.2, max: 0.7 },
            ease: "power1.out",
          },
        },
      });

      // Animate the gallery horizontally
      tl.to(scroll, {
        x: () => -scrollWidth,
        ease: "none",
      });

      // Optional: Fade out heading slightly during scroll (or keep it static)
      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 1, y: 0 },
          { opacity: 0.9, y: -10, ease: "power1.out" },
          0
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Fixed heading at top */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 px-4 md:px-8">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight"
        >
          Our Values
        </h2>
      </div>

      {/* Scrollable gallery container */}
      <div
        ref={scrollRef}
        className="flex h-full items-center whitespace-nowrap"
      >
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] mx-4 sm:mx-6 md:mx-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 h-full w-full p-6 sm:p-8 md:p-10 flex items-end">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalGallery;