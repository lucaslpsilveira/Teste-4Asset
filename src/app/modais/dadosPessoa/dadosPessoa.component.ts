import { Component, EventEmitter, OnInit,  Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() pessoa: Pessoa | null = null;

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

  ngOnChanges(changes: SimpleChanges): void{
    if('pessoa' in changes){
      if(this.modoEdicao){
        console.log('edicao', this.modoEdicao);
        this.preencherFormulario();
      }
    }
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
    if(this.pessoa !== null){
      console.log('pessoa not null');
      this.pessoaForm.patchValue({
        name: this.pessoa.name,
        email: this.pessoa.email,
        phone: this.pessoa.phone,
        birthDate: this.converteData(this.pessoa.birthDate)
      });
    }
  }

  converteData(data: string){
    const dataObj = new Date(data);

    const ano = dataObj.getFullYear();
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataObj.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  submitForm(): void {
    if (this.pessoaForm.valid) {
      const dadosFormulario = this.pessoaForm.value;
      if (this.modoEdicao && this.pessoa) {
        this.editar(this.pessoa.id, dadosFormulario);
      } else {
        this.salvar(dadosFormulario);
      }
      this.pessoaForm.reset();
      this.modoEdicao = false;
    }
  }

  editar(id: number, dadosFormulario: Pessoa){
    this.pessoaService.editarPessoa(id, dadosFormulario).subscribe(
      (response: PessoaApiResponse) => {
        this.fecharModal();
        this.mensagem.emit({titulo: 'Cadastro editado com sucesso!'})
      },
      (error) => {
        this.pessoa = null;
        this.fecharModal();
        this.mensagem.emit({titulo: 'Erro ao editar cadastro da pessoa!', mensagem: error.error.message } )
      }
    );
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
