import { Component, Output, EventEmitter, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-language-select',
  template: `
    <div id="LanguageSelect" >
      <div class="content" >
        <p>
          Please, select your language<br>
          Por favor, selecione seu idioma<br>
          Por favor, seleccione su idioma
        </p>
        <div class="options" >
          <div class="option english" (click)="setLanguage('english')" >
            English
          </div>
          <div class="option portuguese" (click)="setLanguage('portuguese')" >
            Português
          </div>
          <div class="option spanish" (click)="setLanguage('spanish')" >
            Español
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {

  @Output() selectedLanguage = new EventEmitter();

  constructor(
    private _translationService: TranslationService
  ) { }

  public async setLanguage(language: string): Promise<void> {
    await this._translationService.changeSelectedLanguage( language );
    this.selectedLanguage.emit();
    localStorage.setItem('selectedLanguage', language);
  }

}
