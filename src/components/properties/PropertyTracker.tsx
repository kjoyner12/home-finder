"use client";

import React, { useState } from "react";
import { Home, DollarSign, Ruler, Edit, Trash2 } from "lucide-react";

interface Property {
  id: string;
  address: string;
  price: number;
  squareFootage: number;
  lotSize: number;
  bedrooms: number;
  bathrooms: number;
  status: "viewed" | "interested" | "contacted" | "none";
  notes: string;
}

const statusColors = {
  viewed: "bg-blue-500",
  interested: "bg-green-500",
  contacted: "bg-yellow-500",
  none: "bg-gray-400"
};

export function PropertyTracker() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("lotSize-desc");

  const calculatePricePerSqFt = (price: number, sqFt: number): number => {
    if (!sqFt) return 0;
    return Math.round(price / sqFt);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter(prop => prop.id !== id));
  };

  const filteredProperties = properties.filter(prop => 
    prop.address.toLowerCase().includes(searchText.toLowerCase()) &&
    (statusFilter === "all" || prop.status === statusFilter)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-6">Saved Properties</h1>
        
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search addresses..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border rounded-lg flex-1"
          />
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg w-48"
          >
            <option value="all">All Statuses</option>
            <option value="viewed">Viewed</option>
            <option value="interested">Interested</option>
            <option value="contacted">Contacted</option>
            <option value="none">None</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg w-56"
          >
            <option value="lotSize-desc">Lot Size: High to Low</option>
            <option value="lotSize-asc">Lot Size: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="pricePerSqFt-desc">$/SqFt: High to Low</option>
            <option value="pricePerSqFt-asc">$/SqFt: Low to High</option>
          </select>

          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Property
          </button>
        </div>

        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{property.address}</h3>
                  <div className="flex gap-4 mt-2">
                    <p className="text-xl font-bold">
                      ${property.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      ${calculatePricePerSqFt(property.price, property.squareFootage)}/sqft
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`${statusColors[property.status]} text-white px-3 py-1 rounded-full text-sm`}>
                    {property.status}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {property.lotSize.toFixed(2)} acres
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {property.squareFootage.toLocaleString()} sqft
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {property.bedrooms} bed
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {property.bathrooms} bath
                </span>
              </div>

              {property.notes && (
                <p className="mt-3 text-gray-600 text-sm">{property.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}