import { Component, OnInit, ViewChild } from '@angular/core';
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
  exclusao: boolean = false;

  modalPessoa: boolean = false;
  modoEdicao: boolean = false;
  pessoaSelecionada: Pessoa | null = null;

  excluirId: number = 0;

  @ViewChild('modalRef')
  modalRef!: MensagemModalComponent;

  constructor(
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  exibirMensagem(titulo: string, mensagem: string = '', excluir: boolean = false): void {
    this.tituloModal = titulo;
    this.mensagemModal = mensagem;
    this.showModal = true;
    this.exclusao = excluir;
  }

  fecharModalMensagem(){
    this.showModal = false;
    this.pessoaSelecionada = null;
    this.modoEdicao = false;
    this.excluirId = 0;
  }

  novaPessoa(){
    this.modalPessoa = true;
  }

  listarPessoas(): void {
    this.pessoaService.listarPessoas().subscribe((response) => {
      this.pessoas = response.results;
      this.page = response.page;
      this.limit = response.limit;
      this.count = response.page;
    });
  }

  fecharModalPessoa(){
    this.modalPessoa = false;
    this.listarPessoas();
  }

  confirmaExclusao(id: number){
    this.excluirId = id;
    const mensagem = 'O cadastro será excluido definitivamente. Você tem certeza que deseja continuar?'
    this.exibirMensagem('Excluir cadastro', mensagem, true);
  }

  excluir(){
    this.pessoaService.excluirPessoa(this.excluirId).subscribe(async (response) => {
      await this.fecharModalMensagem();
      await this.exibirMensagem('Cadastro Excluido com sucesso!');
      this.listarPessoas();
    },
    (error) => {
      this.exibirMensagem('Erro ao excluir pessoa!', error.error.message);
    });
  }

  editar(pessoa: Pessoa){
    this.pessoaSelecionada = pessoa;
    this.modoEdicao = true;
    this.modalPessoa = true;
  }

  formatarData(dataApi: string): string {
    const dataOriginal = new Date(dataApi);
    const dia = dataOriginal.getDate().toString().padStart(2, '0');
    const mes = (dataOriginal.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataOriginal.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}
