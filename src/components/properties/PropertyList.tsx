'use client';

import React, { useState, useEffect } from 'react';
import { Property, PropertyFilters, initialFilters } from '@/types/property';
import PropertyCard from './PropertyCard';
import PropertyForm from './PropertyForm';
import FilterPanel from './FilterPanel';
import { Plus, SlidersHorizontal } from 'lucide-react';

const sortOptions = [
  { value: 'dateAdded', label: 'Date Added' },
  { value: 'price', label: 'Price' },
  { value: 'pricePerSqFt', label: 'Price per Sq Ft' },
  { value: 'squareFeet', label: 'Square Feet' },
  { value: 'acreage', label: 'Acreage' },
  { value: 'beds', label: 'Beds' }
];

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Load properties from localStorage on mount
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    }
  }, []);

  // Save properties to localStorage when updated
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const handleEdit = (id: string) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setEditingProperty(property);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(prop => prop.id !== id));
    }
  };

  const handleSaveProperty = (property: Property) => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? property : p));
    } else {
      setProperties([property, ...properties]);
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const applyFilters = (property: Property): boolean => {
    return (
      (filters.status === 'all' || property.status === filters.status) &&
      property.price >= filters.minPrice &&
      (filters.maxPrice === Infinity || property.price <= filters.maxPrice) &&
      property.beds >= filters.minBeds &&
      property.baths >= filters.minBaths &&
      property.squareFeet >= filters.minSqft &&
      (filters.maxPricePerSqft === Infinity || property.pricePerSqFt <= filters.maxPricePerSqft)
    );
  };

  const filteredProperties = properties.filter(applyFilters);

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price':
      case 'pricePerSqFt':
      case 'squareFeet':
      case 'acreage':
      case 'beds':
        return b[sortBy] - a[sortBy];
      case 'dateAdded':
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters {filters.status !== 'all' && '(1)'}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border p-2"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Property
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSave={handleSaveProperty}
          onCancel={() => {
            setShowForm(false);
            setEditingProperty(null);
          }}
        />
      )}

      {/* Properties Grid */}
      {sortedProperties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No properties found</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-600 hover:text-blue-800"
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
              onEdit={() => handleEdit(property.id)}
              onDelete={() => handleDelete(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;