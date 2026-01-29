import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Package, Truck, Award, Shield, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Estoque Local",
    description: "Produtos prontos para pronta entrega em nosso centro de distribuição",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Logística eficiente para todo o Brasil com rastreamento completo",
  },
  {
    icon: Award,
    title: "Marcas Exclusivas",
    description: "Acesso a fragrâncias e cosméticos de marcas premium internacionais",
  },
  {
    icon: Shield,
    title: "Garantia de Origem",
    description: "Produtos 100% originais com nota fiscal e garantia de procedência",
  },
];

export function B2BSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="revendedor" className="py-20 bg-dark-gradient" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium mb-6">
              Exclusivo para Lojistas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Tenha acesso ao nosso catálogo completo e{" "}
              <span className="text-primary">condições especiais</span> de atacado.
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Seja um revendedor autorizado da Eros Distribuidora e leve as melhores 
              marcas de perfumaria e cosméticos para o seu negócio. Oferecemos suporte 
              comercial dedicado e as melhores condições do mercado.
            </p>
            <Button 
              size="lg"
              onClick={() => scrollToSection("#contato")}
              className="bg-primary hover:bg-eros-red-dark text-primary-foreground shadow-button"
            >
              Cadastre seu CNPJ
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Right - Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
