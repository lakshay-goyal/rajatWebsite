import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500000, suffix: "+", label: "Active Users", duration: 2 },
  { value: 99.9, suffix: "%", label: "Uptime", duration: 2, decimals: 1 },
  { value: 150, suffix: "+", label: "Countries", duration: 1.5 },
  { value: 10, suffix: "x", label: "Faster", duration: 1 },
];

const AnimatedStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center+=100",
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to(
              {},
              {
                duration: stat.duration,
                onUpdate: function () {
                  const progress = this.progress();
                  const currentValue = progress * stat.value;
                  setAnimatedValues((prev) => {
                    const newValues = [...prev];
                    newValues[index] = currentValue;
                    return newValues;
                  });
                },
              }
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Trusted <span className="text-gradient">Worldwide</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="text-5xl md:text-7xl font-bold text-gradient mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.decimals
                  ? animatedValues[index].toFixed(stat.decimals)
                  : Math.floor(animatedValues[index]).toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
