import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialComponentsModule } from './material-components.module';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ResultsComponent } from './components/results/results.component';
import { FormsModule } from '@angular/forms';
import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { StepComponent } from './components/step/step.component';
import { AddressSearchComponent } from './components/address-search/address-search.component';

import * as Sentry from '@sentry/browser';
import { environment } from 'src/environments/environment';
import { GreetingsComponent } from './components/greetings/greetings.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResultDialogComponent } from './components/results/result-dialog/result-dialog.component';

if (environment.production) {
  Sentry.init({
    dsn: 'https://73384f3bca5b4585b797d2749c500704@sentry.io/1427545'
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

  handleError(error) {
    if (error instanceof HttpErrorResponse) { // Server Error
      if (!navigator.onLine)
        return alert('Sem conexão com a internet');

      Sentry.captureException((error as any).originalError || error);
      console.error(error);

      return alert('Error trying to connect the server. Please, try again later');

    } else { // Client Error
      Sentry.captureException((error as any).originalError || error);
      console.error(error);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectComponent,
    GreetingsComponent,
    ResultsComponent,
    StepComponent,
    AddressSearchComponent,
    FooterComponent,
    ResultDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    ResultDialogComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
