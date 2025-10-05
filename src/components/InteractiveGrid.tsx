import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Palette, Database, Cloud, Lock, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: Code, title: "Development", color: "from-purple-600 to-purple-400" },
  { icon: Palette, title: "Design", color: "from-blue-600 to-blue-400" },
  { icon: Database, title: "Data", color: "from-cyan-600 to-cyan-400" },
  { icon: Cloud, title: "Cloud", color: "from-teal-600 to-teal-400" },
  { icon: Lock, title: "Security", color: "from-green-600 to-green-400" },
  { icon: Zap, title: "Performance", color: "from-indigo-600 to-indigo-400" },
];

const InteractiveGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".grid-item");

      items.forEach((item: any, index) => {
        gsap.fromTo(
          item,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );

        // Hover animation
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Full-Stack <span className="text-gradient">Capabilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end solutions covering every aspect of your digital needs
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="grid-item aspect-square rounded-3xl bg-gradient-to-br cursor-pointer relative overflow-hidden group"
                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                  <Icon className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-center">{capability.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveGrid;
