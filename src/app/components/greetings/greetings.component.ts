import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greetings',
  template: `
    <div id="Greetings" >
      <img [src]="getImgSrcByLanguage(language)" />
      <p class="description"
        [innerHtml]="'pageDescription' | translate" >
      </p>
    </div>`,
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent {

  @Input() language: string;

  public getImgSrcByLanguage(language: string): string {
    switch (language) {
      case 'portuguese':
        return './assets/logo-pt.png';
      case 'spanish':
        return './assets/logo-es.png';
      case 'english':
      default:
        return './assets/logo-en.png';
    }
  }

}
