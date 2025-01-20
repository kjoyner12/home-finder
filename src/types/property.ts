export interface Property {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  listingDate: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family';
  status: 'active' | 'pending' | 'sold';
  features: string[];
  description: string;
  
  // User-specific fields
  userNotes?: string;
  userRating?: number;
  viewingHistory?: {
    date: string;
    notes: string;
  }[];
  userStatus: 'saved' | 'interested' | 'viewed' | 'contacted' | 'rejected';
  
  // Historical data
  priceHistory?: {
    date: string;
    price: number;
    event: 'listed' | 'price_change' | 'sold';
  }[];
  
  // Media
  images?: string[];
  virtualTour?: string;
}

export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  propertyType?: Property['propertyType'][];
  status?: Property['status'][];
  userStatus?: Property['userStatus'][];
  minSquareFootage?: number;
  maxSquareFootage?: number;
}

export interface PropertySort {
  field: keyof Property | 'address.city' | 'address.state';
  direction: 'asc' | 'desc';
}