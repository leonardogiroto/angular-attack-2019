import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../interfaces/place.interface';

@Component({
  selector: 'app-results',
  template: `
    <div id="Results" >
      <mat-card *ngFor="let result of results; let index = index" >
        <mat-card-header>
          <div mat-card-avatar >
            {{ index + 1 }}
          </div>
          <mat-card-title>{{ result.title }}</mat-card-title>
          <mat-card-subtitle>{{ 'distance' | translate }}: {{ getDistanceFormatted(result.distance) }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p [innerHtml]="result.vicinity" ></p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary"
            (click)="viewResultDetails.emit(result)" >
            {{ 'viewMoreButton' | translate }}
          </button>
        </mat-card-actions>
      </mat-card>
    </div>`,
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  @Input() results: Array<Place> = [];
  @Output() viewResultDetails: EventEmitter<Place> = new EventEmitter();

  public getDistanceFormatted(distanceInMeters: number): string {
    if (distanceInMeters < 1000)
      return distanceInMeters + 'm';

    const kilometers = distanceInMeters / 1000;
    return kilometers.toFixed(2) + 'km';
  }

}
