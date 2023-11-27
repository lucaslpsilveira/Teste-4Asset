import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginationComponent {
  @Input() paginaAtual: number = 1;
  @Input() totalItens: number = 0;
  @Input() limitePorPagina: number = 10;

  @Output() paginaAlterada = new EventEmitter<number>();

  paginas: number[] = [];
  totalPaginas: number = 0;

  ngOnChanges(changes: SimpleChanges): void{
    if (changes) {
      this.calcularTotalPaginas();
      this.gerarPaginas();
    }
  }

  calcularTotalPaginas(): number {
    this.totalPaginas = Math.ceil(this.totalItens / this.limitePorPagina)
    return this.totalPaginas;
  }

  gerarPaginas(): void {
    this.paginas = [];
    for (let i = 1; i <= this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }
}
