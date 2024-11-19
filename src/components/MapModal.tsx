import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { initPlacesService } from '../services/places';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  origin: google.maps.LatLngLiteral;
  destination: string;
}

export function MapModal({ isOpen, onClose, origin, destination }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    const initMap = async () => {
      await initPlacesService();
      if (!mapRef.current) return;
      // Create a map instance
      const map = new google.maps.Map(mapRef.current, {
        center: origin,
        zoom: 14,
        mapTypeControl: false,
      });

      // Initialize directions service and renderer
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: false,
        preserveViewport: false,
      });

      const request: google.maps.DirectionsRequest = {
        origin,
        destination: { placeId: destination },
        travelMode: google.maps.TravelMode.WALKING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);

          // Fit the map to the route bounds
          if (result.routes[0]?.bounds) {
            map.fitBounds(result.routes[0].bounds);
          }
        }
      });

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      mapInstanceRef.current = null;
    };
  }, [isOpen, origin, destination]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Walking Directions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div ref={mapRef} className="w-full h-[600px]" />
      </div>
    </div>
  );
}