import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslationService {

  public languageChanged$ = new EventEmitter<string>();

  private _selectedLanguage: string;
  private _translationsJson;

  constructor(private _httpClient: HttpClient) {
    this.changeSelectedLanguage( 'english' );
  }

  public getSelectedLanguage(): string {
    return this._selectedLanguage;
  }

  public async changeSelectedLanguage(language: string): Promise<void> {
    this._selectedLanguage = language;
    this._translationsJson = await this._getJSON( language );
    this.languageChanged$.next( language );
  }

  public getTranslation(translationKey: string): string {
    if (!this._translationsJson || !this._translationsJson[translationKey])
      return '';
    return this._translationsJson[translationKey];
  }

  private _getJSON(language: string): Promise<any> {
    return this._httpClient.get('./assets/translations/' + language + '.json').toPromise();
  }

}
