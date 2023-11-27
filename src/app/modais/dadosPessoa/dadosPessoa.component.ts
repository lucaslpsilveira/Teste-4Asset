import { Component, EventEmitter, OnInit,  Input, Output } from '@angular/core';
import { Pessoa, PessoaApiResponse, errorResponse } from '../../services/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-dados-pessoa-modal',
  templateUrl: './dadosPessoa.component.html',
  styleUrls: ['./dadosPessoa.component.css']
})
export class DadosPessoaModalComponent implements OnInit {
  @Input() titulo: string = 'Criar novo cadastro';
  @Input() showModal: boolean = false;
  @Input() modoEdicao: boolean = false; // false -> 'Adicionar', true ->'Editar'';
  @Input() pessoa!: Pessoa;

  pessoaForm: FormGroup = this.fb.group({});

  @Output() fechar = new EventEmitter<void>()
  @Output() mensagem = new EventEmitter<{titulo: string, mensagem?: string }>()

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.pessoaForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  preencherFormulario(): void {
    this.pessoaForm.patchValue({
      name: this.pessoa.name,
      email: this.pessoa.email,
      phone: this.pessoa.phone,
      birthDate: this.pessoa.birthDate
    });
  }

  submitForm(): void {
    if (this.pessoaForm.valid) {
      const dadosFormulario = this.pessoaForm.value;
      if (this.modoEdicao) {
        // this.editar({ ...this.pessoa, ...dadosFormulario });
      } else {
        this.salvar(dadosFormulario);
      }
      this.pessoaForm.reset();
      this.modoEdicao = false;
    }
  }

  editar(){

  }

  salvar(dadosFormulario: Pessoa){
    console.log(dadosFormulario);
    this.pessoaService.cadastrarPessoa(dadosFormulario).subscribe(
      (response: PessoaApiResponse) => {
        this.fecharModal();
        this.mensagem.emit({titulo: 'Cadastro criado com sucesso!'})
      },
      (error) => {
        this.fecharModal();
        this.mensagem.emit({titulo: 'Erro ao cadastrar pessoa!', mensagem: error.error.message } )
      }
    );
  }

  fecharModal() {
    this.fechar.emit();
  }
}
