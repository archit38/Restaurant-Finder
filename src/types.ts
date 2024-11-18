export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: number;
  imageUrl: string;
  cuisine: string;
  priceLevel: number;
  address: string;
  isOpen: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
}