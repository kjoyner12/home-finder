export type PropertyStatus = 'interested' | 'viewed' | 'contacted' | 'passed';

export interface Property {
    id: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    squareFeet: number;
    acreage: number;
    status: PropertyStatus;
    notes: string;
    dateAdded: string;
    pricePerSqFt: number;
}

export interface PropertyFormData extends Omit<Property, 'id' | 'dateAdded' | 'pricePerSqFt'> {}

export interface PropertyFilters {
    status: string;
    minPrice: number;
    maxPrice: number;
    minBeds: number;
    minBaths: number;
    minSqft: number;
    maxPricePerSqft: number;
}

export const initialFilters: PropertyFilters = {
    status: 'all',
    minPrice: 0,
    maxPrice: Infinity,
    minBeds: 0,
    minBaths: 0,
    minSqft: 0,
    maxPricePerSqft: Infinity,
};

export const calculatePricePerSqFt = (price: number, squareFeet: number): number => {
    return squareFeet > 0 ? Number((price / squareFeet).toFixed(2)) : 0;
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(num);
};