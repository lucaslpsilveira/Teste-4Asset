import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent  } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MensagemModalComponent } from './modais/mensagem/mensagem.component';

@NgModule({
  declarations: [
    AppComponent,
    MensagemModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
