import React from 'react';
import { Star, X } from 'lucide-react';
import type { Restaurant } from '../types';

interface Props {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewsModal({ restaurant, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Reviews for {restaurant.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <span className="text-2xl font-bold ml-2">{restaurant.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-2">({restaurant.reviews} reviews)</span>
          </div>
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${restaurant.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            View All Reviews on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}