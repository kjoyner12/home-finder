'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { X } from 'lucide-react';
import { Property, PropertyFormData, calculatePricePerSqFt } from '@/types/property';

interface PropertyFormProps {
  property?: Property;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const initialFormData: PropertyFormData = {
  address: '',
  price: 0,
  beds: 0,
  baths: 0,
  squareFeet: 0,
  acreage: 0,
  status: 'interested',
  notes: '',
};

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSave, onCancel }) => {
  const [formData, setFormData] = useState<PropertyFormData>(
    property ? {
      address: property.address,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      squareFeet: property.squareFeet,
      acreage: property.acreage,
      status: property.status,
      notes: property.notes,
    } : initialFormData
  );
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.beds < 0) {
      newErrors.beds = 'Beds cannot be negative';
    }

    if (formData.baths < 0) {
      newErrors.baths = 'Baths cannot be negative';
    }

    if (formData.squareFeet <= 0) {
      newErrors.squareFeet = 'Square footage must be greater than 0';
    }

    if (formData.acreage < 0) {
      newErrors.acreage = 'Acreage cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const propertyData: Property = {
        id: property?.id || uuidv4(),
        ...formData,
        dateAdded: property?.dateAdded || new Date().toISOString().split('T')[0],
        pricePerSqFt: calculatePricePerSqFt(formData.price, formData.squareFeet)
      };

      onSave(propertyData);
    } catch (error) {
      console.error('Error saving property:', error);
      setErrors({ submit: 'Failed to save property. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Price & Square Footage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="1000"
                  className={`w-full pl-8 rounded-md border ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  } p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Square Feet
              </label>
              <input
                type="number"
                name="squareFeet"
                value={formData.squareFeet}
                onChange={handleInputChange}
                min="0"
                step="1"
                className={`w-full rounded-md border ${
                  errors.squareFeet ? 'border-red-500' : 'border-gray-300'
                } p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.squareFeet && (
                <p className="mt-1 text-sm text-red-500">{errors.squareFeet}</p>
              )}
            </div>
          </div>

          {/* Beds, Baths, & Acreage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beds
              </label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
                min="0"
                step="1"
                className={`w-full rounded-md border ${
                  errors.beds ? 'border-red-500' : 'border-gray-300'
                } p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.beds && (
                <p className="mt-1 text-sm text-red-500">{errors.beds}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Baths
              </label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleInputChange}
                min="0"
                step="0.5"
                className={`w-full rounded-md border ${
                  errors.baths ? 'border-red-500' : 'border-gray-300'
                } p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.baths && (
                <p className="mt-1 text-sm text-red-500">{errors.baths}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Acreage
              </label>
              <input
                type="number"
                name="acreage"
                value={formData.acreage}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full rounded-md border ${
                  errors.acreage ? 'border-red-500' : 'border-gray-300'
                } p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.acreage && (
                <p className="mt-1 text-sm text-red-500">{errors.acreage}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="interested">Interested</option>
              <option value="viewed">Viewed</option>
              <option value="contacted">Contacted</option>
              <option value="passed">Passed</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;