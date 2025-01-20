export interface Property {
    id: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    squareFeet: number;
    acreage: number;
    status: 'interested' | 'viewed' | 'contacted' | 'passed';
    notes: string;
    dateAdded: string;
    // Calculated fields
    pricePerSqFt: number;
}

export interface PropertyFormData extends Omit<Property, 'id' | 'dateAdded' | 'pricePerSqFt'> {
    // Form data doesn't need ID (generated), dateAdded (auto), or pricePerSqFt (calculated)
}

export const calculatePricePerSqFt = (price: number, squareFeet: number): number => {
    return squareFeet > 0 ? Number((price / squareFeet).toFixed(2)) : 0;
};