import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { TranslationPipe } from './pipes/translation/translation.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HereMapsService } from './services/here-maps.service';
import { PlacesService } from './services/places.service';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';

@NgModule({
  declarations: [
    TranslationPipe,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    TranslationPipe,
    SafeUrlPipe
  ],
  providers: [
    TranslationService,
    HereMapsService,
    PlacesService
  ]
})
export class SharedModule { }
