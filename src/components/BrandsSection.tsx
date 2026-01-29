import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  "Dolce & Gabbana",
  "Carolina Herrera",
  "Paco Rabanne",
  "Jean Paul Gaultier",
  "Valentino",
  "Versace",
  "Hugo Boss",
  "Montblanc",
  "Calvin Klein",
  "Lancôme",
  "Givenchy",
  "Armani",
];

export function BrandsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="marcas" className="py-20 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Marcas que representamos com{" "}
            <span className="text-primary">exclusividade</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com as marcas mais renomadas do mercado internacional de 
            perfumaria e cosméticos.
          </p>
        </motion.div>

        {/* Brands Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...brands, ...brands].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: (index % brands.length) * 0.05 }}
                className="flex-shrink-0 mx-8"
              >
                <div className="w-48 h-24 bg-background rounded-lg shadow-card flex items-center justify-center px-6 hover:shadow-card-hover transition-shadow duration-300">
                  <span className="font-serif text-lg text-foreground/80 text-center">
                    {brand}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
