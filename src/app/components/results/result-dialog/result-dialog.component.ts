import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlaceDetails } from 'src/app/interfaces/place-details.interface';

@Component({
  selector: 'app-result-dialog',
  template: `
    <div mat-dialog-content>
      <iframe
        scrolling="no" frameBorder="0"
        (load)="resetLoading()"
        [src]="data.view | safeUrl"
      ></iframe>
      <div class="iframe-placeholder" *ngIf="showLoader" >
        <mat-spinner
          color="primary"
          [diameter]="40"
        ></mat-spinner>
        {{ 'loading' | translate }}
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="dismiss()">
        {{ 'backButton' | translate }}
      </button>
      <button mat-raised-button cdkFocusInitial color="primary"
        *ngIf="checkHasWebsite()"
        (click)="goToWebsite()" >
        WEBSITE
      </button>
    </div>`,
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {

  public showLoader: boolean;
  public startedLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaceDetails
  ) {
    this.showLoader = true;
    this.startedLoading = false;
  }

  public dismiss(): void {
    this.dialogRef.close();
  }

  public resetLoading(): void {
    this.startedLoading ?
      this.showLoader = false :
      this.startedLoading = true;
  }

  public checkHasWebsite(): boolean {
    return this.data.contacts &&
      this.data.contacts.website &&
      this.data.contacts.website.length > 0;
  }

  public goToWebsite(): void {
    const win = window.open(
      this.data.contacts.website[0].value,
      '_blank'
    );
    win.focus();
  }

}
