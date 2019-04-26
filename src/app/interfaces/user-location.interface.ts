export interface UserLocation {
  LocationId: string;
  Address: LocationAddress;
  DisplayPosition: LocationPosition;
}

export interface LocationAddress {
  City: string;
  Country: string;
  District: string;
  HouseNumber: string;
  Label: string;
  PostalCode: string;
  State: string;
  Street: string;
}

export interface LocationPosition {
  Latitude: number;
  Longitude: number;
}
