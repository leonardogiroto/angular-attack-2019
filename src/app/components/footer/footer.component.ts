import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div id="Footer" >
      <p>
        {{ 'footerMessage' | translate }}
        <a target="_blank" href="https://www.linkedin.com/in/leonardo-giroto-aa8ba879" >Leonardo Giroto</a>,
        <a target="_blank" href="https://www.linkedin.com/in/erich-lizaki" >Erich Lizaki</a> &
        <a target="_blank" href="https://www.linkedin.com/in/mauriciopsgv" >Maurício Pedro</a> :)
      </p>
    </div>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent { }
