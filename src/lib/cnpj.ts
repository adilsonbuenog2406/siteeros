type CnpjData = {
  razao_social: string;
  situacao_cadastral: string;
  cnae_principal: string;
  logradouro: string;
  numero: string;
  municipio: string;
  porte_empresa: string;
  nome_socio: string;
};

const safeString = (value: unknown) => {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number") {
    return value.toString();
  }
  return "";
};

const pickValue = (source: Record<string, unknown>, keys: string[]) => {
  return (
    keys
      .map((key) => source[key])
      .find((value) =>
        typeof value === "string" ? value.trim().length > 0 : typeof value === "number",
      ) ?? ""
  );
};

export const buildCnpjData = (payload: Record<string, unknown>): CnpjData => {
  const qsaList = Array.isArray(payload.QSA) ? payload.QSA : undefined;
  const socioNames =
    qsaList && qsaList.length
      ? (qsaList as Array<Record<string, unknown>>)
          .map((socio) => safeString(pickValue(socio, ["nome_socio", "nomeSocio"])))
          .filter(Boolean)
          .join(", ")
      : safeString(pickValue(payload, ["nome_socio", "nomeSocio"]));

  return {
    razao_social: safeString(pickValue(payload, ["razao_social", "razaoSocial"])) || "-",
    situacao_cadastral:
      safeString(pickValue(payload, ["situacao_cadastral", "situacaoCadastral"])) || "-",
    cnae_principal: safeString(pickValue(payload, ["cnae_principal", "cnaePrincipal"])) || "-",
    logradouro: safeString(pickValue(payload, ["logradouro"])) || "-",
    numero: safeString(pickValue(payload, ["numero"])) || "-",
    municipio: safeString(pickValue(payload, ["municipio"])) || "-",
    porte_empresa: safeString(pickValue(payload, ["porte_empresa", "porteEmpresa"])) || "-",
    nome_socio: socioNames || "-",
  };
};

export type { CnpjData };
