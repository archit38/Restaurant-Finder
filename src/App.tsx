import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { RestaurantCard } from './components/RestaurantCard';
import { LocationInput } from './components/LocationInput';
import { useLocation } from './hooks/useLocation';
import { useRestaurants } from './hooks/useRestaurants';

function App() {
  const { location, error: locationError, updateLocation } = useLocation();
  const { restaurants, loading, error: restaurantsError } = useRestaurants(location);

  if (locationError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Error</h2>
          <p className="text-gray-600">{locationError}</p>
        </div>
      </div>
    );
  }

  const filteredRestaurants = restaurants.filter(restaurant => restaurant.reviews > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Nearby Restaurants</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LocationInput 
          location={location}
          onManualLocation={(lat, lng) => updateLocation(lat, lng)}
        />

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : restaurantsError ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600">{restaurantsError}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant}
                userLocation={location!}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;