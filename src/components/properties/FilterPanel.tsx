'use client';

import React from 'react';
import { X } from 'lucide-react';
import { PropertyFilters, initialFilters } from '@/types/property';

interface FilterPanelProps {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange, onClose }) => {
  const handleChange = (key: keyof PropertyFilters, value: string | number) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onChange(initialFilters);
  };

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={resetFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price
          </label>
          <input
            type="number"
            value={filters.maxPrice === Infinity ? '' : filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : Infinity)}
            className="w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Beds
          </label>
          <input
            type="number"
            value={filters.minBeds}
            onChange={(e) => handleChange('minBeds', Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Baths
          </label>
          <input
            type="number"
            value={filters.minBaths}
            onChange={(e) => handleChange('minBaths', Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Square Feet
          </label>
          <input
            type="number"
            value={filters.minSqft}
            onChange={(e) => handleChange('minSqft', Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price per Sq Ft
          </label>
          <input
            type="number"
            value={filters.maxPricePerSqft === Infinity ? '' : filters.maxPricePerSqft}
            onChange={(e) => handleChange('maxPricePerSqft', e.target.value ? Number(e.target.value) : Infinity)}
            className="w-full rounded-md border border-gray-300 p-2"
            min="0"
            step="10"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;