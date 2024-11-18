import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY, SEARCH_RADIUS, RESULTS_COUNT } from '../config';
import type { Location, Restaurant } from '../types';

let placesService: google.maps.places.PlacesService | null = null;

export async function initPlacesService() {
  if (placesService) return placesService;

  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['places', 'geometry']
  });

  await loader.load();
  
  // Create a dummy map (required for PlacesService)
  const mapDiv = document.createElement('div');
  const map = new google.maps.Map(mapDiv, {
    center: { lat: 0, lng: 0 },
    zoom: 1
  });

  placesService = new google.maps.places.PlacesService(map);
  return placesService;
}

export async function searchNearbyRestaurants(location: Location): Promise<Restaurant[]> {
  const service = await initPlacesService();
  const userLatLng = new google.maps.LatLng(location.latitude, location.longitude);

  return new Promise((resolve, reject) => {
    const request: google.maps.places.PlaceSearchRequest = {
      location: userLatLng,
      radius: SEARCH_RADIUS,
      type: 'restaurant',
      openNow: true,
    };

    service.nearbySearch(request, async (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        reject(new Error('Failed to fetch restaurants'));
        return;
      }

      const detailedRestaurants = await Promise.all(
        results!.slice(0, RESULTS_COUNT).map(place => getRestaurantDetails(place, userLatLng))
      );

      resolve(detailedRestaurants.filter((r): r is Restaurant => r !== null));
    });
  });
}

async function getRestaurantDetails(
  place: google.maps.places.PlaceResult,
  userLatLng: google.maps.LatLng
): Promise<Restaurant | null> {
  if (!place.place_id || !place.geometry?.location) return null;

  const service = await initPlacesService();

  return new Promise((resolve) => {
    service.getDetails(
      {
        placeId: place.place_id!,
        fields: ['name', 'rating', 'user_ratings_total', 'formatted_address', 'price_level', 'photos', 'types']
      },
      (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !result) {
          resolve(null);
          return;
        }

        const photoUrl = result.photos?.[0]?.getUrl({ maxWidth: 400 }) || 
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4';

        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          place.geometry!.location!,
          userLatLng
        );

        const restaurant: Restaurant = {
          id: place.place_id!,
          name: result.name!,
          rating: result.rating || 0,
          reviews: result.user_ratings_total || 0,
          distance,
          imageUrl: photoUrl,
          cuisine: getCuisineType(result.types || []),
          priceLevel: result.price_level || 1,
          address: result.formatted_address || '',
          isOpen: true // We already filtered for open restaurants in the initial search
        };

        resolve(restaurant);
      }
    );
  });
}

function getCuisineType(types: string[]): string {
  const cuisineTypes = types.filter(type => 
    !['restaurant', 'food', 'point_of_interest', 'establishment'].includes(type)
  );
  
  return cuisineTypes
    .map(type => type.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    )
    .join(' • ') || 'Restaurant';
}