import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Building2, Target } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-20 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-secondary rounded-2xl p-8 md:p-12 text-secondary-foreground">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl">Eros Distribuidora</h3>
                  <p className="text-secondary-foreground/70">Desde 2011</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Localização</p>
                    <p className="text-secondary-foreground/70 text-sm">
                      Rua Caiçara, 116, Sala 01 - Garcia<br />
                      Blumenau - SC, Brasil
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Nossa Missão</p>
                    <p className="text-secondary-foreground/70 text-sm">
                      Levar as melhores fragrâncias e cosméticos do mundo para 
                      lojistas de todo o Brasil, com excelência e compromisso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Há mais de uma década construindo{" "}
              <span className="text-primary">parcerias de sucesso</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                A Eros Distribuidora nasceu em 2011 em Blumenau, Santa Catarina, 
                com o objetivo de conectar lojistas brasileiros às marcas mais 
                renomadas de perfumaria e cosméticos do mercado internacional.
              </p>
              <p>
                Ao longo dos anos, construímos uma reputação sólida baseada na 
                qualidade dos produtos, na excelência do atendimento e na 
                confiabilidade de nossas entregas. Hoje, atendemos milhares de 
                pontos de venda em todo o território nacional.
              </p>
              <p>
                Nossa equipe é formada por profissionais apaixonados pelo mercado 
                de beleza, sempre prontos para oferecer suporte especializado e 
                encontrar as melhores soluções para o seu negócio.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
