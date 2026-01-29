import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Marcas", href: "#marcas" },
  { label: "Categorias", href: "#categorias" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Seja um Revendedor", href: "#revendedor" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <p className="text-secondary-foreground/70 mb-6 max-w-md">
              Eros Distribuidora de Perfumes e Cosméticos Ltda. Importadora e 
              distribuidora de fragrâncias e cosméticos premium, conectando 
              lojistas às melhores marcas do mundo desde 2011.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/erosdistribuidorasc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-secondary-foreground/70">
                  Rua Caiçara, 116, Sala 01<br />
                  Garcia, Blumenau - SC
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/70">(47) 3037-4250</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-secondary-foreground/70">comercial@erosdistribuidora.com.br</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Eros Distribuidora de Perfumes e Cosméticos Ltda. 
              Todos os direitos reservados.
            </p>
            <p className="text-secondary-foreground/50 text-sm">
              CNPJ: 14.452.541/0001-65
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
