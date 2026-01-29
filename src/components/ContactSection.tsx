import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { buildCnpjData, type CnpjData } from "@/lib/cnpj";

const steps = [
  { number: 1, title: "Digite o CNPJ" },
  { number: 2, title: "Dados confirmados" },
  { number: 3, title: "Seu contato" },
];

type Stage = "cnpj" | "details" | "contact" | "done";

const stageOrder: Record<Stage, number> = {
  cnpj: 1,
  details: 2,
  contact: 3,
  done: 3,
};

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stage, setStage] = useState<Stage>("cnpj");
  const [cnpj, setCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [company, setCompany] = useState<CnpjData | null>(null);
  const [contact, setContact] = useState({ phone: "", email: "" });

  const resetFlow = () => {
    setStage("cnpj");
    setCnpj("");
    setCompany(null);
    setContact({ phone: "", email: "" });
    setErrorMessage("");
  };

  const handleLookup = async () => {
    const digitsOnly = cnpj.replace(/\D/g, "");
    if (digitsOnly.length !== 14) {
      setErrorMessage("Informe os 14 dígitos do CNPJ.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`https://api.opencnpj.org/${digitsOnly}`);
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message = body?.message ?? "CNPJ não encontrado.";
        throw new Error(message);
      }

      const data = await response.json();
      setCompany(buildCnpjData(data));
      setStage("details");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível buscar o CNPJ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contact.phone.trim() || !contact.email.trim()) {
      setErrorMessage("Informe telefone e e-mail para continuar.");
      return;
    }

    setErrorMessage("");
    toast.success("Recebemos seus dados e em breve entraremos em contato.");
    setStage("done");
  };

  return (
    <section id="contato" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Entre em <span className="text-primary">contato</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Preencha o formulário abaixo e nossa equipe comercial entrará em 
            contato para apresentar nossas condições especiais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-muted/50 rounded-xl p-8">
              <h3 className="font-serif text-2xl text-foreground mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Telefone</p>
                    <p className="text-muted-foreground">(47) 3037-4250</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">E-mail</p>
                    <p className="text-muted-foreground">comercial@erosdistribuidora.com.br</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Endereço</p>
                    <p className="text-muted-foreground">
                      Rua Caiçara, 116, Sala 01 - Garcia<br />
                      Blumenau - SC, CEP 89020-410
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Static Catalog Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-xl p-8 shadow-card">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => {
                  const stepNumber = stageOrder[stage];
                  const isActive = stepNumber >= step.number;
                  const isComplete = stepNumber > step.number;
                  return (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isComplete ? <Check className="w-5 h-5" /> : step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-12 md:w-20 h-1 mx-2 ${
                            isComplete ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {stage !== "done" && (
                <h4 className="font-medium text-foreground mb-6">
                  {steps[Math.min(stageOrder[stage], steps.length) - 1].title}
                </h4>
              )}

              {errorMessage && (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {stage === "cnpj" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      CNPJ
                    </label>
                    <Input
                      name="cnpj"
                      value={cnpj}
                      onChange={(event) => setCnpj(event.target.value)}
                      placeholder="00.000.000/0000-00"
                      className="bg-background"
                    />
                  </div>
                  <Button
                    size="lg"
                    onClick={handleLookup}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-eros-red-dark text-primary-foreground w-full"
                  >
                    {isLoading ? "Consultando..." : "Confirmar CNPJ"}
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>
              )}

              {stage === "details" && company && (
                <div className="space-y-5 rounded-2xl border border-muted bg-muted/50 p-5">
                  <h4 className="text-lg font-semibold text-foreground">Dados encontrados</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Razão social", company.razao_social],
                      ["Situação cadastral", company.situacao_cadastral],
                      ["CNAE principal", company.cnae_principal],
                      ["Logradouro", company.logradouro],
                      ["Número", company.numero],
                      ["Município", company.municipio],
                      ["Porte da empresa", company.porte_empresa],
                      ["Sócio / Sócios", company.nome_socio],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-1 text-sm">
                        <p className="font-medium text-foreground">{label}</p>
                        <p className="text-foreground/70">{value || "-"}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="w-full justify-center bg-primary hover:bg-eros-red-dark text-primary-foreground"
                      onClick={() => setStage("contact")}
                    >
                      Confirmar e enviar contato
                    </Button>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="w-full border border-foreground bg-foreground/5 text-foreground hover:bg-foreground/10"
                      onClick={() => {
                        setStage("cnpj");
                        setCompany(null);
                      }}
                    >
                      Alterar CNPJ
                    </Button>
                  </div>
                </div>
              )}

              {stage === "contact" && (
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Telefone
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={contact.phone}
                      onChange={(event) =>
                        setContact((prev) => ({ ...prev, phone: event.target.value }))
                      }
                      placeholder="(00) 00000-0000"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      E-mail
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={contact.email}
                      onChange={(event) =>
                        setContact((prev) => ({ ...prev, email: event.target.value }))
                      }
                      placeholder="nome@empresa.com.br"
                      className="bg-background"
                    />
                  </div>
                  <p className="text-sm text-foreground/80">Alguma dúvida antes de aplicar?</p>
                  <div className="flex justify-between mt-8">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setStage("details")}
                    >
                      Voltar
                    </Button>
                    <Button
                      size="lg"
                      type="submit"
                      className="bg-primary hover:bg-eros-red-dark text-primary-foreground"
                    >
                      Confirmar e enviar
                    </Button>
                  </div>
                </form>
              )}

              {stage === "done" && (
                <div className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
                  <p className="text-lg font-semibold text-foreground">Tudo certo!</p>
                  <p className="text-sm text-foreground/80">
                    Recebemos suas informações e em breve nosso time entrará em contato com um catálogo
                    dedicado à sua empresa.
                  </p>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full border border-foreground bg-foreground/5 text-foreground hover:bg-foreground/10"
                    onClick={resetFlow}
                  >
                    Fazer nova consulta
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
