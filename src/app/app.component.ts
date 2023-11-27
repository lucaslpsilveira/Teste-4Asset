import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PessoaService } from './services/pessoa.service';
import { Pessoa } from './services/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'teste-4asset';
  pessoas: Pessoa[] = [];
  page: number | undefined;
  limit: number | undefined;
  count: number | undefined;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(): void {
    this.pessoaService.listarPessoas().subscribe((response) => {
      this.pessoas = response.results;
      this.page = response.page;
      this.limit = response.limit;
      this.count = response.page;
    });
  }
}
