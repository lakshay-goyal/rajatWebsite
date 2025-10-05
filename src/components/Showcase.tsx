import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productImg from "@/assets/product-1.jpg";
import featureBg from "@/assets/feature-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="section-padding relative overflow-hidden"
      style={{
        backgroundImage: `url(${featureBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/90"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 animate-glow"></div>
            <img
              src={productImg}
              alt="Product showcase"
              className="relative rounded-2xl shadow-2xl animate-float"
            />
          </div>

          <div ref={textRef} className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold">
              Built for the
              <br />
              <span className="text-gradient">Modern World</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience unparalleled performance and elegance. Our platform combines
              sophisticated design with powerful functionality to deliver results that
              exceed expectations.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">10x</div>
                <div className="text-muted-foreground">Faster</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">500K+</div>
                <div className="text-muted-foreground">Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
