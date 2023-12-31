import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mensagem-modal',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemModalComponent {
  @Input() titulo: string = 'Modal Titulo';
  @Input() mensagem: string = '';
  @Input() showModal: boolean = false;
  @Input() exclusao: boolean = false;
  @Output() fechar = new EventEmitter<void>()
  @Output() excluir = new EventEmitter<void>()

  fecharModal() {
    this.fechar.emit();
  }

  excluirPessoa() {
    this.excluir.emit();
  }
}
