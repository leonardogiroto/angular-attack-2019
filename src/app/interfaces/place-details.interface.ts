import { PlaceCategory } from './place-category.interface';

export interface PlaceDetails {
  name: string;
  placeId: string;
  view: string;
  location: PlaceLocation;
  contacts: PlaceContacts;
  categories: Array<PlaceCategory>;
  icon: string;
  extended: PlaceExtendedInfo;
}

export interface PlaceLocation {
  address: PlaceAddress;
}

export interface PlaceAddress {
  text: string;
  house: string;
  street: string;
  postalCode: string;
  district: string;
  city: string;
  state: string;
  country: string;
  countryCode: string;
}

export interface PlaceContacts {
  phone: Array<PlaceContact>;
  website: Array<PlaceContact>;
}

export interface PlaceContact {
  value: string;
  label: string;
}

export interface PlaceExtendedInfo {
  openingHours: OpeningHours;
}

export interface OpeningHours {
  text: string;
  label: string;
  isOpen: boolean;
}
