import { PlaceCategory } from './place-category.interface';

export interface Place {
  alternativeNames: Array<AlternativeName>;
  averageRating: number;
  category: PlaceCategory;
  distance: number;
  href: string;
  icon: string;
  id: string;
  position: Array<number>;
  title: string;
  type: string;
  vicinity: string;
}

export interface AlternativeName {
  language: string;
  name: string;
}
