import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HereMapsService {

  constructor(private _httpClient: HttpClient) { }

  public getAddressByGeolocation(latitude: number, longitude: number): Observable<any> {
    return this._httpClient.get(
      environment.hereMaps.reverseGeocodeUrl + '?app_id=' +
      environment.hereMaps.appId + '&app_code=' +
      environment.hereMaps.appCode + '&mode=retrieveAddresses&prox=' +
      latitude + ',' + longitude
    );
  }

  public getAutocompleteAddress(query: string): Observable<any> {
    return this._httpClient.get(
      environment.hereMaps.autocompleteUrl + '?app_id=' +
      environment.hereMaps.appId + '&app_code=' +
      environment.hereMaps.appCode + '&query=' + query
    );
  }

  public getAddressByLabel(label: string): Observable<any> {
    return this._httpClient.get(
      environment.hereMaps.geocodeUrl + '?app_id=' +
      environment.hereMaps.appId + '&app_code=' +
      environment.hereMaps.appCode + '&searchtext=' + label
    );
  }

  public getResults(category: string, latitude: number, longitude: number): Observable<any> {
    return this._httpClient.get(
      environment.hereMaps.placesUrl + '?app_id=' +
      environment.hereMaps.appId + '&app_code=' +
      environment.hereMaps.appCode + '&at=' +
      latitude + ',' + longitude + '&cat=' +
      category + '&size=8'
    );
  }

  public getResultDetails(href: string): Observable<any> {
    return this._httpClient.get(href);
  }

}
