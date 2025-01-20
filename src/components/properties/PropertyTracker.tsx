"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Home, DollarSign, Ruler, Bed, Bath, ClipboardList, Edit, Trash2, Trees } from "lucide-react";

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
  none: "bg-gray-500"
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Saved Properties</CardTitle>
        <div className="flex space-x-2">
          <Input
            placeholder="Search addresses..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lotSize-desc">Lot Size: High to Low</SelectItem>
              <SelectItem value="lotSize-asc">Lot Size: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="pricePerSqFt-desc">$/SqFt: High to Low</SelectItem>
              <SelectItem value="pricePerSqFt-asc">$/SqFt: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add Property</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{property.address}</h3>
                  <div className="flex gap-4 mt-1">
                    <p className="text-lg font-bold">
                      ${property.price.toLocaleString()}
                    </p>
                    <p className="text-lg">
                      ${calculatePricePerSqFt(property.price, property.squareFootage)}/sqft
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 items-center">
                  <Badge className={statusColors[property.status]}>
                    {property.status}
                  </Badge>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="font-semibold">
                  {property.lotSize.toFixed(2)} acres
                </Badge>
                <Badge variant="secondary">
                  {property.squareFootage.toLocaleString()} sqft
                </Badge>
                <Badge variant="secondary">
                  {property.bedrooms} bed
                </Badge>
                <Badge variant="secondary">
                  {property.bathrooms} bath
                </Badge>
              </div>
              {property.notes && (
                <p className="mt-2 text-sm text-gray-600">{property.notes}</p>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}