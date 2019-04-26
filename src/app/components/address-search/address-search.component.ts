import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HereMapsService } from 'src/app/shared/services/here-maps.service';
import { UserLocation } from 'src/app/interfaces/user-location.interface';
import { MatSnackBar } from '@angular/material';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-address-search',
  template: `
    <div id="Address" >
      <app-step
        [step]="1"
        [stepText]="'stepOne' | translate"
      ></app-step>
      <ng-container *ngIf="userLocation" >
        <p class="address-label" >
          {{ userLocation.Address.Label }}
        </p>
        <button
          mat-raised-button color="primary"
          (click)="clearAddress.emit()" >
          {{ 'changeAddressButton' | translate }}
        </button>
      </ng-container>
      <br><br>

      <div class="search-address" *ngIf="!userLocation" >
        <mat-form-field appearance="outline">
          <mat-label>{{ 'addressSearchPlaceHolder' | translate }}</mat-label>
          <input
            type="text" matInput
            [(ngModel)]="addressSearch"
            (ngModelChange)="updateSearch($event)"
          />
          <mat-hint>{{ 'addressSearchHint' | translate }}</mat-hint>
        </mat-form-field>

        <ul class="autoComplete" >
          <li *ngFor="let address of autocompleteAddresses" (click)="setUserAddress.emit(address.label)" >
            {{ address.label }}
          </li>
        </ul>
      </div>
    </div>`,
  styleUrls: ['./address-search.component.scss']
})
export class AddressSearchComponent implements OnInit {

  @Input() readonly userLocation: UserLocation;
  @Output() clearAddress = new EventEmitter();
  @Output() setUserAddress: EventEmitter<string> = new EventEmitter();

  public autocompleteAddresses = [];
  private _searchSubject: Subject<string> = new Subject();

  constructor(
    private _hereMapsService: HereMapsService,
    private _translationService: TranslationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._setSearchSubscription();
  }

  public updateSearch(searchTextValue: string) {
    this._searchSubject.next( searchTextValue );
  }

  private _setSearchSubscription(): void {
    this._searchSubject.pipe(
      debounceTime(400)
    ).subscribe((searchValue: string) => {
      this._getAutocompleteAddres( searchValue );
    });
  }

  private _getAutocompleteAddres(query: string): void {
    this._hereMapsService.getAutocompleteAddress(
      query
    ).subscribe((response) => {
      this.autocompleteAddresses = response.suggestions;
    }, (error) => {
      this._snackBar.open(
        this._translationService.getTranslation('fetchAddressError'), 'OK',
        { duration: 4000, verticalPosition: 'top' }
      );
      console.log(error);
    });
  }
}
