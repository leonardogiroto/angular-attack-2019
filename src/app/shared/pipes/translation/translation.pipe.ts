import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Pipe({
  name: 'translate',
  pure: false
})

export class TranslationPipe implements PipeTransform {

  constructor(
    private _translationService: TranslationService
  ) { }

  public transform(translationKey: string): string {
    if (!translationKey || translationKey.trim() === '')
      return '';

    const value = this._translationService.getTranslation(
      translationKey
    );
    return value;
  }

}
