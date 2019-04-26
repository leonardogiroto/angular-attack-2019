import { Injectable } from '@angular/core';
import { PlaceCategory } from 'src/app/interfaces/place-category.interface';
import { allCategories } from 'src/assets/categories';

@Injectable()
export class PlacesService {

  public getFilteredCategories(filters): Array<PlaceCategory> {
    let categories = allCategories;
    if (filters.how && filters.how !== 'Whatever')
      categories = this._applyHowFilters(categories, filters.how);

    if (filters.when && filters.when !== 'Whatever')
      categories = this._applyWhenFilters(categories, filters.when);

    if (filters.with && filters.with !== 'Whatever')
      categories = this._applyWithFilters(categories, filters.with);
    return categories;
  }

  private _applyHowFilters(categories: Array<PlaceCategory>, filter: string): Array<PlaceCategory> {
    let excluded = [];
    switch (filter) {
      case 'Home':
        excluded = [
          'restaurant,food-drink', 'snacks-fast-food', 'coffee-tea,coffee',
          'going-out,dance-night-club', 'theatre-music-culture',
          'casino', 'sights-museums,landmark-attraction,museum',
          'camping', 'shopping,mall', 'bookshop', 'library',
          'natural-geographical', 'bar-pub', 'cinema',
          'landmark-attraction', 'sports-facility-venue',
          'amusement-holiday-park', 'mountain-hill',
          'hospital-health-care-facility,hospital',
          'natural-geographical,mountain-hill',
          '_sunset', '_picnic'
        ];
        return categories.filter(cat => !excluded.includes(cat.id));
      case 'Outside':
        excluded = [
          'restaurant,food-drink,snacks-fast-food',
          'invite-friends', '_host-party',
          '_watch-new-movie', '_watch-movie-marathon',
          '_view-old-pictures', '_cook-something-different',
          '_play-videogames', '_solve-jigsaw-puzzle', '_donate'
        ];
        return categories.filter(cat => !excluded.includes(cat.id));
      default:
        return categories;
    }
  }

  private _applyWhenFilters(categories: Array<PlaceCategory>, filter: string): Array<PlaceCategory> {
    let excluded = [];
    switch (filter) {
      case 'Morning':
        excluded = [
          'going-out,dance-night-club', 'bar-pub', 'cinema', '_sunset', '_host-party'
        ];
        return categories.filter(cat => !excluded.includes(cat.id));
      case 'Night':
        excluded = [
          'sights-museums,landmark-attraction,museum',
          'natural-geographical', 'mountain-hill',
          'hospital-health-care-facility,hospital',
          '_sunset', '_picnic'
        ];
        return categories.filter(cat => !excluded.includes(cat.id));
      case 'Afternoon':
      default:
        return categories;
    }
  }

  private _applyWithFilters(categories: Array<PlaceCategory>, filter: string): Array<PlaceCategory> {
    let excluded = [];
    switch (filter) {
      case 'Alone':
        excluded = [ '_picnic' ];
        return categories.filter(cat => !excluded.includes(cat.id));
      case 'Friends':
        excluded = [ '_donate' ];
        return categories.filter(cat => !excluded.includes(cat.id));
      case 'Family':
        excluded = [
          'going-out,dance-night-club', '_host-party',
          'casino', 'invite-friends', 'bar-pub',
        ];
        return categories.filter(cat => !excluded.includes(cat.id));
      default:
        return categories;
    }
  }

}
