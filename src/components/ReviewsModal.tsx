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
  console.log(restaurant);
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

          {restaurant.topReviews && (
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Top Reviews</h3>
                {restaurant.topReviews.positive.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                    <div className="flex items-center mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            } fill-current`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{review.author}</span>
                    </div>
                    <p className="text-sm">{review.text}</p>
                    <span className="text-xs text-gray-500">{review.time}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Critical Reviews</h3>
                {restaurant.topReviews.negative.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                    <div className="flex items-center mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            } fill-current`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{review.author}</span>
                    </div>
                    <p className="text-sm">{review.text}</p>
                    <span className="text-xs text-gray-500">{review.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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