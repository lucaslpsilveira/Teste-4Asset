import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent  } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MensagemModalComponent } from './modais/mensagem/mensagem.component';
import { DadosPessoaModalComponent } from './modais/dadosPessoa/dadosPessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    MensagemModalComponent,
    DadosPessoaModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
