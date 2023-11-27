import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaPessoasResponse, Pessoa } from './interfaces';

@Injectable({
  providedIn: 'root',
})

export class PessoaService {
  private apiUrl = 'https://dev-api-plt.4asset.net.br/exam/v1';

  constructor(private http: HttpClient) {}

  listarPessoas(pagina: number, limite: number): Observable<ListaPessoasResponse> {
    return this.http.get<ListaPessoasResponse>(`${this.apiUrl}/persons?limit=${limite}&page=${pagina}`);
  }

  cadastrarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/persons`, pessoa);
  }

  editarPessoa(id: number, pessoa: Pessoa): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/persons/${id}`, pessoa);
  }

  excluirPessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/persons/${id}`);
  }
}
