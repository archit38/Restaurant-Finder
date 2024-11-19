import { useState } from 'react';
import { Star, MapPin, DollarSign, Navigation2 } from 'lucide-react';
import type { Restaurant } from '../types';
import { ReviewsModal } from './ReviewsModal';
import { MapModal } from './MapModal';

interface Props {
  restaurant: Restaurant;
  userLocation: { latitude: number; longitude: number };
}

export function RestaurantCard({ restaurant, userLocation }: Props) {
  const [showReviews, setShowReviews] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const renderPriceLevel = (level: number) => {
    return Array(level)
      .fill(0)
      .map((_, i) => (
        <DollarSign
          key={i}
          className="w-4 h-4 text-green-600 inline-block"
        />
      ));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl">
        <div className="relative h-48">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
            {(restaurant.distance / 1000).toFixed(1)} km
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
            <button 
              onClick={() => setShowReviews(true)}
              className="flex items-center hover:bg-gray-100 rounded-full px-2 py-1"
            >
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-semibold">{restaurant.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({restaurant.reviews})</span>
            </button>
          </div>
          <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{restaurant.address}</span>
          </div>
          <div className="flex justify-between items-center">
            <div>{renderPriceLevel(restaurant.priceLevel)}</div>
            <button
              onClick={() => setShowMap(true)}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Navigation2 className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Walking Directions</span>
            </button>
          </div>
        </div>
      </div>
      <ReviewsModal
        restaurant={restaurant}
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
      />
      <MapModal
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        origin={{ lat: userLocation.latitude, lng: userLocation.longitude }}
        destination={restaurant.id}
      />
    </>
  );
}