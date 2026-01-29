import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroPerfumes from "@/assets/hero-perfumes.jpg";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroPerfumes} 
          alt="Perfumes e cosméticos de luxo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-eros-black/90 via-eros-black/70 to-eros-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium mb-6">
              Desde 2011 distribuindo excelência
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Conectando sua loja às melhores{" "}
            <span className="text-primary">fragrâncias</span> e{" "}
            <span className="text-primary">cosméticos</span> do mundo.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl"
          >
            Importadora e distribuidora exclusiva em Blumenau/SC, entregando 
            excelência e sofisticação para todo o Brasil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg"
              onClick={() => scrollToSection("#revendedor")}
              className="bg-primary hover:bg-eros-red-dark text-primary-foreground shadow-button text-base px-8"
            >
              Quero ser um parceiro
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="ghost"
              onClick={() => scrollToSection("#marcas")}
              className="border border-black bg-black text-white hover:bg-white/10 hover:text-white text-base px-8"
            >
              Conheça nossas marcas
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
