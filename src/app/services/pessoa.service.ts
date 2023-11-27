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

  listarPessoas(): Observable<ListaPessoasResponse> {
    return this.http.get<ListaPessoasResponse>(`${this.apiUrl}/persons`);
  }

  cadastrarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/persons`, pessoa);
  }

  editarPessoa(id: number, pessoa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/persons/${id}`, pessoa);
  }

  excluirPessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/persons/${id}`);
  }
}
