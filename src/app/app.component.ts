import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Place } from './interfaces/place.interface';
import { UserLocation } from './interfaces/user-location.interface';
import { HereMapsService } from './shared/services/here-maps.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslationService } from './shared/services/translation.service';
import { PlacesService } from './shared/services/places.service';
import { PlaceCategory } from './interfaces/place-category.interface';
import { ResultDialogComponent } from './components/results/result-dialog/result-dialog.component';

declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public languageSet: boolean;
  public currentLanguage: string;

  public addressSearch: string = '';
  public userLocation: UserLocation;

  public filters = {
    'how': undefined,
    'when': undefined,
    'with': undefined
  };

  public loadingResults: boolean = false;
  public results: Array<Place> = [];
  public categories: Array<PlaceCategory> = [];
  public chosenCategory: PlaceCategory;

  private platform: any;

  @ViewChild('map')
  public mapElement: ElementRef;

  constructor(
    private _hereMapsService: HereMapsService,
    private _translationService: TranslationService,
    private _placesService: PlacesService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {
    this._initLanguage();
  }

  ngOnInit() {
    this._setUserLocation();
  }

  public selectedLanguage(): void {
    this.languageSet = true;
    this.currentLanguage = this._translationService.getSelectedLanguage();
  }

  public setUserAddress(label: string) {
    this._getAddressByLabel(label);
  }

  public loadResults(): void {
    if (!this.userLocation) {
      this._snackBar.open(
        this._translationService.getTranslation('requiredAddressError'), 'OK',
        { duration: 4000, verticalPosition: 'top' }
      );
      return;
    } else if (!this.categories || this.categories.length === 0)
      return;

    this.loadingResults = true;
    this.results = [];
    this.chosenCategory = this._getRandomCategory( this.categories );

    if (!this.chosenCategory.id.includes('_')) {
      this._hereMapsService.getResults(
        this.chosenCategory.id,
        this.userLocation.DisplayPosition.Latitude,
        this.userLocation.DisplayPosition.Longitude
      ).subscribe((response) => {
        this.results = response.results.items;
        this.loadingResults = false;

        if (this.results && this.results.length > 0) {
          setTimeout(() =>
            this._loadMap( this.userLocation, this.results )
          );
        }
      }, (error) => {
        this.loadingResults = false;
        console.log(error);
      });
    } else
      this.loadingResults = false;
  }

  private _getRandomCategory(categories: Array<PlaceCategory>): PlaceCategory {
    const randomIndex = Math.floor(
      Math.random() * this.categories.length
    );
    const newCategory = this.categories[ randomIndex ];
    if (this.chosenCategory && newCategory.id === this.chosenCategory.id)
      return this._getRandomCategory(categories);
    return newCategory;
  }

  public viewResultDetails(place: Place): void {
    this._hereMapsService.getResultDetails(
      place.href
    ).subscribe((response) => {

      this._dialog.open(ResultDialogComponent, {
        'width': '90%',
        'maxWidth': '100vw',
        'maxHeight': '100vh',
        'data': response
      });

    }, (error) => {
      this._snackBar.open(
        this._translationService.getTranslation('viewMoreError'), 'OK',
        { duration: 4000, verticalPosition: 'top' }
      );
      console.log(error);
    });
  }

  public loadCategories(filters): void {
    this.categories = this._placesService.getFilteredCategories( filters );
  }

  private _getAddressByLabel(label: string) {
    this._hereMapsService.getAddressByLabel(
      label
    ).subscribe((response) => {
      this.userLocation = response.Response.View[0].Result[0].Location;
      this.loadCategories( this.filters );
      this.results = [];
      this.chosenCategory = null;
    }, (error) => {
      this._snackBar.open(
        this._translationService.getTranslation('fetchAddressError'), 'OK',
        { duration: 4000, verticalPosition: 'top' }
      );
      console.log(error);
    });
  }

  private _setUserLocation(): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this._hereMapsService.getAddressByGeolocation(
          position.coords.latitude, position.coords.longitude
        ).subscribe((response) => {
          this.userLocation = response.Response.View[0].Result[0].Location;
          this.loadCategories( this.filters );
        }, () => { });
      });
    }
  }

  private _loadMap(location: UserLocation, results: Array<Place>): void {
    const resultsMap = document.getElementById('ResultsMap');
    if (resultsMap)
      resultsMap.innerHTML = '';

    this.platform = new H.service.Platform({
      'app_id': environment.hereMaps.appId,
      'app_code': environment.hereMaps.appCode,
      useHTTPS: true
    });

    results = this._orderResults( results );
    const markers = this._getMapMarkers( results );
    const maxDistance = Math.max(...results.map(r => r.distance));

    const defaultLayers = this.platform.createDefaultLayers();
    const map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map, {
        'zoom': this._getMapZoom( maxDistance ),
        'center': {
          'lat': location.DisplayPosition.Latitude,
          'lng': location.DisplayPosition.Longitude
        }
      }
    );
    if (markers && markers.length > 0)
      map.addObjects(markers);

    window.addEventListener('resize', () => {
      map.getViewPort().resize();
    });
  }

  private _orderResults(results: Array<Place>): Array<Place> {
    return results.sort((a, b) => {
      if (a.distance < b.distance)
        return -1;
      if (a.distance > b.distance)
        return 1;
      return 0;
    });
  }

  private _getMapMarkers(results: Array<Place>) {
    const markers = [];

    results.forEach((result, index: number) => {
      const svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#673ab7" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">' + (index + 1) + '</text></svg>';
      const icon = new H.map.Icon(svgMarkup);
      const marker = new H.map.Marker({
        'lat': result.position[0], lng: result.position[1]
      }, { icon });
      markers.push(marker);
    });

    return markers;
  }

  private _getMapZoom(maxDistance: number): number {
    if (maxDistance < 1000)
      return 15;
    else if (maxDistance < 2000)
      return 14;
    return 13;
  }

  private async _initLanguage(): Promise<void> {
    const language = localStorage.getItem('selectedLanguage');
    this.currentLanguage = language;
    if (language) {
      await this._translationService.changeSelectedLanguage( language );
      this.languageSet = true;
    } else {
      this.languageSet = false;
    }
  }

}
