import React from 'react';
import { MapPin } from 'lucide-react';
import type { Location } from '../types';

interface Props {
  location: Location | null;
  onManualLocation: (lat: number, lng: number) => void;
}

export function LocationInput({ location, onManualLocation }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = parseFloat(formData.get('latitude') as string);
    const lng = parseFloat(formData.get('longitude') as string);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      onManualLocation(lat, lng);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <MapPin className="w-5 h-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">Location</h2>
      </div>
      
      {location && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">Current coordinates:</p>
          <p className="font-mono">
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="latitude"
              id="latitude"
              placeholder="e.g. 40.7128"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="longitude"
              id="longitude"
              placeholder="e.g. -74.0060"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Location
        </button>
      </form>
    </div>
  );
}