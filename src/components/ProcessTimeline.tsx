import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Rocket, Target, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const process = [
  {
    icon: Lightbulb,
    title: "Ideation",
    description: "Transform your vision into actionable strategies with our expert team.",
  },
  {
    icon: Rocket,
    title: "Development",
    description: "Build robust solutions using cutting-edge technology and best practices.",
  },
  {
    icon: Target,
    title: "Launch",
    description: "Deploy with confidence knowing every detail has been perfected.",
  },
  {
    icon: Trophy,
    title: "Growth",
    description: "Scale seamlessly as your business reaches new heights of success.",
  },
];

const ProcessTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the connecting line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // Animate each item
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              end: "top center",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-subtle relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-primary -translate-x-1/2 hidden md:block"
          />

          <div className="space-y-24">
            {process.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`flex items-center gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-center md:text-inherit`}>
                    <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                    <p className="text-lg text-muted-foreground">{step.description}</p>
                  </div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-2xl glow">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
