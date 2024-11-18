export interface Review {
  text: string;
  rating: number;
  author: string;
  time: string;
}
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
  topReviews?: {
    positive: Review[];
    negative: Review[];
  };
}

export interface Location {
  latitude: number;
  longitude: number;
}