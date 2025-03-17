"use client";

import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  address: string;
  height?: string;
}

// Define Google Maps types
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
    mapsApiLoaded: boolean;
    mapsApiLoading: boolean;
    mapsCallbacks: (() => void)[];
  }
}

// Create a function to load the Google Maps API once
const loadGoogleMapsApi = () => {
  if (typeof window === 'undefined') return;
  
  // If already loaded, do nothing
  if (window.google && window.google.maps) {
    window.mapsApiLoaded = true;
    return;
  }
  
  // If already loading, do nothing
  if (window.mapsApiLoading) return;
  
  // Set loading flag
  window.mapsApiLoading = true;
  
  // Initialize callbacks array if it doesn't exist
  if (!window.mapsCallbacks) {
    window.mapsCallbacks = [];
  }
  
  // Create a global callback function
  window.initMap = () => {
    window.mapsApiLoaded = true;
    window.mapsApiLoading = false;
    
    // Call all callbacks
    window.mapsCallbacks.forEach(callback => callback());
    window.mapsCallbacks = [];
  };
  
  // Load the script
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  if (!apiKey) {
    console.error('Google Maps API key is missing. Please add it to your .env.local file.');
    return;
  }
  
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

export default function GoogleMap({ address, height = '400px' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Initialize the map when the API is loaded
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;
      setMapLoaded(true);
      
      // Use Geocoding to convert address to coordinates
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (
        results: google.maps.GeocoderResult[] | null, 
        status: google.maps.GeocoderStatus
      ) => {
        if (status === "OK" && results && results[0] && mapRef.current) {
          const location = results[0].geometry.location;
          
          const map = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 15,
          });
          
          new window.google.maps.Marker({
            map,
            position: location,
            title: address,
          });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
          
          // Fallback to hardcoded coordinates for Jiangyin, Jiangsu
          if (mapRef.current) {
            const fallbackLocation = { lat: 31.9086, lng: 120.2842 };
            const map = new window.google.maps.Map(mapRef.current, {
              center: fallbackLocation,
              zoom: 15,
            });
            
            new window.google.maps.Marker({
              map,
              position: fallbackLocation,
              title: address,
            });
          }
        }
      });
    };
    
    // If API is already loaded, initialize map immediately
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      initializeMap();
      return;
    }
    
    // If API is loading, add callback
    if (typeof window !== 'undefined') {
      if (!window.mapsCallbacks) {
        window.mapsCallbacks = [];
      }
      
      window.mapsCallbacks.push(initializeMap);
      
      // Start loading the API if not already loading
      loadGoogleMapsApi();
    }
    
    return () => {
      // Clean up callback if component unmounts before API loads
      if (typeof window !== 'undefined' && window.mapsCallbacks) {
        window.mapsCallbacks = window.mapsCallbacks.filter(callback => callback !== initializeMap);
      }
    };
  }, [address]);
  
  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height, 
        borderRadius: '0.375rem',
        overflow: 'hidden'
      }}
      className="shadow-md"
    >
      {!mapLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
    </div>
  );
} 