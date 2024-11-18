import { useState, useEffect } from 'react';
import type { Restaurant, Location } from '../types';
import { searchNearbyRestaurants } from '../services/places';

export function useRestaurants(location: Location | null) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!location) return;

    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError('');
        
        const results = await searchNearbyRestaurants(location);
        
        // Sort by weighted rating (rating * log(reviews))
        const sortedRestaurants = results.sort((a, b) => {
          const scoreA = a.rating * Math.log10(a.reviews);
          const scoreB = b.rating * Math.log10(b.reviews);
          return scoreB - scoreA;
        });
        
        setRestaurants(sortedRestaurants);
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [location]);

  return { restaurants, loading, error };
}