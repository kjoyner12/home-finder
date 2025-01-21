'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Property } from '@/types/property';
import 'leaflet/dist/leaflet.css';

// Extend Property type to include location
interface PropertyWithLocation extends Property {
  location?: {
    lat: number;
    lng: number;
  };
}

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
  const [center, setCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Center of USA
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    // Load properties from localStorage
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      const parsedProperties = JSON.parse(savedProperties);
      
      // Here you would normally geocode the addresses to get coordinates
      // For now, we'll add some dummy coordinates
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-[calc(100vh-12rem)] w-full">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map(property => (
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
                  <p className="mt-2 text-sm text-gray-600">{property.status}</p>
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