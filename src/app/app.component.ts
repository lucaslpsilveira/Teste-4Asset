import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PessoaService } from './services/pessoa.service';
import { Pessoa } from './services/interfaces';
import { MensagemModalComponent } from './modais/mensagem/mensagem.component';

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

  tituloModal: string = "";
  mensagemModal: string = "";
  showModal: boolean = false;

  @ViewChild('modalRef')
  modalRef!: MensagemModalComponent;

  constructor(
    private pessoaService: PessoaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarPessoas();
    this.exibirMensagem('Teste desenvolv', 'teste mensagem');
  }

  exibirMensagem(titulo: string, mensagem: string = ''): void {
    this.tituloModal = titulo;
    this.mensagemModal = mensagem;
    this.showModal = true;
  }

  fecharModal(){
    this.showModal = false;
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
