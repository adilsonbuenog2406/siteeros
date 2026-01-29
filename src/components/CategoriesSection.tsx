import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, UserRound, Sparkles, Scissors, Gift } from "lucide-react";

const categories = [
  {
    icon: User,
    title: "Perfumaria Masculina",
    description: "Fragrâncias sofisticadas para homens exigentes",
    color: "bg-secondary",
  },
  {
    icon: UserRound,
    title: "Perfumaria Feminina",
    description: "Aromas únicos que expressam personalidade",
    color: "bg-primary",
  },
  {
    icon: Sparkles,
    title: "Cosméticos e Skincare",
    description: "Cuidados para uma pele radiante e saudável",
    color: "bg-secondary",
  },
  {
    icon: Scissors,
    title: "Cuidados Capilares",
    description: "Produtos profissionais para cabelos impecáveis",
    color: "bg-primary",
  },
  {
    icon: Gift,
    title: "Kits e Presentes",
    description: "Combinações perfeitas para momentos especiais",
    color: "bg-secondary",
  },
];

export function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="categorias" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Nossas <span className="text-primary">Categorias</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nosso portfólio completo de produtos importados de alta qualidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            >
              <div className="p-8">
                <div className={`w-14 h-14 ${category.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
