import { Component, EventEmitter, OnInit,  Input, Output } from '@angular/core';
import { Pessoa } from '../../services/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      dataNascimento: ['']
    });
  }

  preencherFormulario(): void {
    this.pessoaForm.patchValue({
      nome: this.pessoa.name,
      email: this.pessoa.email,
      telefone: this.pessoa.phone,
      dataNascimento: this.pessoa.birthDate
    });
  }

  submitForm(): void {
    if (this.pessoaForm.valid) {
      const dadosFormulario = this.pessoaForm.value;
      if (this.modoEdicao) {
        // this.editar({ ...this.pessoa, ...dadosFormulario });
      } else {
        // this.salvar(dadosFormulario);
      }
      this.pessoaForm.reset();
      this.modoEdicao = false;
    }
  }

  editar(){

  }

  salvar(){

  }

  fecharModal() {
    this.fechar.emit();
  }
}
