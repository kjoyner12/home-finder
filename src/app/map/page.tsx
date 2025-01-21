'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('@/components/map/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[calc(100vh-12rem)] w-full flex items-center justify-center bg-gray-50 rounded-lg">
      <p>Loading map...</p>
    </div>
  ),
});

export default function Map() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Property Map</h1>
      <PropertyMap />
    </div>
  );
}