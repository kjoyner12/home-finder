'use client';

import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';
import { Plus, SlidersHorizontal } from 'lucide-react';

// Sample data - will be replaced with actual data storage later
const sampleProperties: Property[] = [
  {
    id: '1',
    address: '123 Main St, Anytown, USA',
    price: 450000,
    beds: 4,
    baths: 2.5,
    squareFeet: 2400,
    acreage: 0.25,
    status: 'interested',
    notes: 'Great neighborhood, needs some updating',
    dateAdded: '2025-01-20',
    pricePerSqFt: 187.50
  },
  {
    id: '2',
    address: '456 Oak Ave, Somewhere, USA',
    price: 525000,
    beds: 3,
    baths: 2,
    squareFeet: 2100,
    acreage: 0.15,
    status: 'viewed',
    notes: 'Recently renovated, beautiful backyard',
    dateAdded: '2025-01-19',
    pricePerSqFt: 250
  }
];

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [sortBy, setSortBy] = useState<string>('dateAdded');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleEdit = (id: string) => {
    // Will implement edit functionality later
    console.log('Edit property:', id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(prop => prop.id !== id));
    }
  };

  const handleAddNew = () => {
    // Will implement add functionality later
    console.log('Add new property');
  };

  const filteredProperties = properties.filter(prop => 
    filterStatus === 'all' ? true : prop.status === filterStatus
  );

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'pricePerSqFt':
        return b.pricePerSqFt - a.pricePerSqFt;
      case 'squareFeet':
        return b.squareFeet - a.squareFeet;
      case 'dateAdded':
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="all">All Status</option>
            <option value="interested">Interested</option>
            <option value="viewed">Viewed</option>
            <option value="contacted">Contacted</option>
            <option value="passed">Passed</option>
          </select>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            >
              <option value="dateAdded">Date Added</option>
              <option value="price">Price</option>
              <option value="pricePerSqFt">Price per Sq Ft</option>
              <option value="squareFeet">Square Feet</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Property
        </button>
      </div>

      {sortedProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties found</p>
          <button
            onClick={handleAddNew}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Add your first property
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;