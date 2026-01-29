import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { buildCnpjData, type CnpjData } from "@/lib/cnpj";

type Stage = "initial" | "data" | "contact" | "done";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<Stage>("initial");
  const [cnpj, setCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [company, setCompany] = useState<CnpjData | null>(null);
  const [contact, setContact] = useState({ phone: "", email: "" });
  const [exitTriggered, setExitTriggered] = useState(false);

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (exitTriggered || visible) return;
      const fromElement = event.relatedTarget;
      if (fromElement) return;
      if (event.clientY <= 0 || event.clientX <= 0 || event.clientX >= window.innerWidth - 1) {
        setVisible(true);
        setExitTriggered(true);
      }
    };

    const handleVisibility = () => {
      if (document.hidden && !visible && !exitTriggered) {
        setVisible(true);
        setExitTriggered(true);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [exitTriggered, visible]);

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
      setStage("data");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível buscar o CNPJ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contact.email || !contact.phone) {
      setErrorMessage("Informe telefone e e-mail para continuar.");
      return;
    }
    setErrorMessage("");
    setStage("done");
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setVisible(false)}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-white p-6 text-base text-foreground shadow-2xl">
        <button
          className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/10 px-3 py-1 text-sm"
          onClick={() => setVisible(false)}
          type="button"
          aria-label="Fechar popup"
        >
          Fechar
        </button>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Lojista exclusivo
          </p>
          <h3 className="text-2xl font-semibold text-foreground">
            Você é lojista e quer receber um catálogo especial?
          </h3>
          <p className="text-base text-foreground/80">
            Preencha os dados abaixo e, em breve, nosso time entrará em contato com um material
            exclusivo para sua empresa.
          </p>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 space-y-6">
          {stage === "initial" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground/80" htmlFor="cnpjInput">
                CNPJ
              </label>
              <input
                id="cnpjInput"
                type="text"
                inputMode="numeric"
                value={cnpj}
                onChange={(event) => setCnpj(event.target.value)}
                placeholder="00.000.000/0000-00"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:border-primary focus:outline-none"
              />
              <Button
                size="lg"
                onClick={handleLookup}
                disabled={isLoading}
                className="w-full justify-center"
              >
                {isLoading ? "Consultando..." : "Confirmar CNPJ"}
              </Button>
            </div>
          )}

          {stage === "data" && company && (
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
              <Button
                size="lg"
                variant="ghost"
                className="w-full border border-foreground bg-foreground/5 text-foreground hover:bg-foreground/10"
                onClick={() => setStage("contact")}
              >
                Confirmar e enviar contato
              </Button>
            </div>
          )}

          {stage === "contact" && (
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground/80" htmlFor="phone">
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={contact.phone}
                  onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="nome@empresa.com.br"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:border-primary focus:outline-none"
                />
              </div>
              <p className="text-sm text-foreground/80">Alguma dúvida antes de aplicar?</p>
              <Button size="lg" className="w-full justify-center" type="submit">
                Confirmar e enviar
              </Button>
            </form>
          )}

          {stage === "done" && (
            <div className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
              <p className="text-lg font-semibold text-foreground">Tudo certo!</p>
              <p className="text-sm text-foreground/80">
                Recebemos suas informações e em breve nosso time entrará em contato com o catálogo
                dedicado à sua empresa.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
