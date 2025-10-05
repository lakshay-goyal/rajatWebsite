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

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;
    
    if (!section || !scroll) return;

    const scrollWidth = scroll.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scroll, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (galleryItems.length - 1), duration: 0.4, ease: "power1.out" },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-16">
        <h2 className="text-6xl md:text-7xl font-bold text-gradient leading-none">Our Values</h2>
      </div>

      <div ref={scrollRef} className="flex h-full items-center pl-[260px]">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={`gallery-item-${index} relative overflow-hidden flex-shrink-0 w-[80vw] md:w-[50vw] h-[70vh] mx-8 rounded-3xl shadow-2xl`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 h-full w-full p-12 flex items-end">
              <h3 className="text-5xl md:text-7xl font-bold text-white">
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
