export interface Pessoa {
  id: number;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListaPessoasResponse {
  results: Pessoa[];
  page: number;
  limit: number;
  count: number;
}

export interface PessoaApiResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
}

export interface errorResponse {
  code: number,
  message: string
}
