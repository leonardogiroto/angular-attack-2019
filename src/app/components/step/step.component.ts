import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  template: `
    <div class="step" >
      <div class="number" >
        {{ step }}
      </div> {{ stepText }}
    </div>`,
  styleUrls: ['./step.component.scss']
})
export class StepComponent {

  @Input() step: number;
  @Input() stepText: string;

}
