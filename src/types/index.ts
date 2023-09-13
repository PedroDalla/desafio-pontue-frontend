export interface ICredentials {
  email: string;
  access_token: string;
  aluno_id: string;
  expires_at: string;
  token_type: string;
}

export interface IRedacaoFromUser {
  created_at: string;
  id: string;
  numero: number;
}

export interface IRedacao {
  id: string;
  aluno: {
    id: string;
    nome_completo: string;
  };
  numero: number;
  created_at: string;
  urls: {
    id: string;
    redacao_id: string;
    correcao_id: null | string;
    url: string;
    anotacoes: unknown;
    comentarios: unknown;
  }[];
}
