import React from 'react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onDelete }) => {
  const statusColors = {
    interested: 'bg-blue-100 text-blue-800',
    viewed: 'bg-purple-100 text-purple-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    passed: 'bg-gray-100 text-gray-800'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{property.address}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[property.status]}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(property.price)}</p>
            <p className="text-sm text-gray-500">{formatCurrency(property.pricePerSqFt)}/sqft</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{formatNumber(property.squareFeet)} sqft</p>
            <p className="text-sm text-gray-500">{formatNumber(property.acreage)} acres</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-lg font-semibold">{property.beds}</p>
            <p className="text-sm text-gray-500">Beds</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{property.baths}</p>
            <p className="text-sm text-gray-500">Baths</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{formatNumber(property.squareFeet / property.beds)}</p>
            <p className="text-sm text-gray-500">Sqft/Bed</p>
          </div>
        </div>

        {property.notes && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">{property.notes}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onEdit(property.id)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;