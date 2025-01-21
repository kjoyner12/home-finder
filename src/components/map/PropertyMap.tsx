'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng } from 'leaflet';
import { Property, PropertyStatus } from '@/types/property';
import { SlidersHorizontal, Locate, Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface PropertyWithLocation extends Property {
  location?: {
    lat: number;
    lng: number;
  };
}

interface FilterOptions {
  status: PropertyStatus | 'all';
  minPrice: number;
  maxPrice: number;
}

const initialFilters: FilterOptions = {
  status: 'all',
  minPrice: 0,
  maxPrice: Infinity,
};

// Custom marker icon
const customIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PropertyMap = () => {
  const [properties, setProperties] = useState<PropertyWithLocation[]>([]);
  const [center, setCenter] = useState({ lat: 39.8283, lng: -98.5795 });
  const [zoom, setZoom] = useState(4);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [mapRef, setMapRef] = useState<any>(null);

  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      const parsedProperties = JSON.parse(savedProperties);
      const propertiesWithLocation = parsedProperties.map((prop: Property) => ({
        ...prop,
        location: {
          lat: center.lat + (Math.random() - 0.5) * 10,
          lng: center.lng + (Math.random() - 0.5) * 10
        }
      }));
      setProperties(propertiesWithLocation);
    }
  }, []);

  const filteredProperties = properties.filter(property => {
    return (
      (filters.status === 'all' || property.status === filters.status) &&
      property.price >= filters.minPrice &&
      (filters.maxPrice === Infinity || property.price <= filters.maxPrice)
    );
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const fitBounds = useCallback(() => {
    if (mapRef && filteredProperties.length > 0) {
      const bounds = new LatLngBounds([]);
      filteredProperties.forEach(property => {
        if (property.location) {
          bounds.extend(new LatLng(property.location.lat, property.location.lng));
        }
      });
      mapRef.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [mapRef, filteredProperties]);

  return (
    <div className="relative h-[calc(100vh-12rem)]">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
          title="Toggle Filters"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </button>
        <button
          onClick={fitBounds}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
          title="Fit to Properties"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          onClick={() => mapRef?.setView(center, zoom)}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
          title="Reset View"
        >
          <Locate className="h-5 w-5" />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-md shadow-md max-w-sm">
          <h3 className="font-semibold mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as PropertyStatus | 'all' }))}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="all">All Status</option>
                <option value="interested">Interested</option>
                <option value="viewed">Viewed</option>
                <option value="contacted">Contacted</option>
                <option value="passed">Passed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                className="w-full rounded-md border border-gray-300 p-2"
                min="0"
                step="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  maxPrice: e.target.value ? Number(e.target.value) : Infinity 
                }))}
                className="w-full rounded-md border border-gray-300 p-2"
                min="0"
                step="10000"
              />
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full rounded-lg"
        zoomControl={false}
        ref={setMapRef}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredProperties.map(property => (
          property.location && (
            <Marker
              key={property.id}
              position={[property.location.lat, property.location.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-2">{property.address}</h3>
                  <p className="text-lg font-bold mb-2">{formatCurrency(property.price)}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Beds: {property.beds}</p>
                    <p>Baths: {property.baths}</p>
                    <p>Sqft: {property.squareFeet.toLocaleString()}</p>
                    <p>Acres: {property.acreage}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600">{property.status}</span>
                    <span className="text-sm text-gray-600">${Math.round(property.pricePerSqFt)}/sqft</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;