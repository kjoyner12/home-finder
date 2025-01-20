import { Property, PropertyFilter, PropertySort } from '@/types/property';

// This will be replaced with actual API calls later
const MOCK_DELAY = 500;

export class PropertyService {
  private static instance: PropertyService;
  private properties: Property[] = [];

  private constructor() {
    // Initialize with some mock data later
  }

  public static getInstance(): PropertyService {
    if (!PropertyService.instance) {
      PropertyService.instance = new PropertyService();
    }
    return PropertyService.instance;
  }

  async getProperties(
    filter?: PropertyFilter,
    sort?: PropertySort,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ properties: Property[]; total: number }> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    let filteredProperties = this.properties;

    if (filter) {
      filteredProperties = filteredProperties.filter(property => {
        let matches = true;
        
        if (filter.minPrice) matches = matches && property.price >= filter.minPrice;
        if (filter.maxPrice) matches = matches && property.price <= filter.maxPrice;
        if (filter.minBedrooms) matches = matches && property.bedrooms >= filter.minBedrooms;
        if (filter.minBathrooms) matches = matches && property.bathrooms >= filter.minBathrooms;
        if (filter.propertyType?.length) matches = matches && filter.propertyType.includes(property.propertyType);
        if (filter.status?.length) matches = matches && filter.status.includes(property.status);
        if (filter.userStatus?.length) matches = matches && filter.userStatus.includes(property.userStatus);
        if (filter.minSquareFootage) matches = matches && property.squareFootage >= filter.minSquareFootage;
        if (filter.maxSquareFootage) matches = matches && property.squareFootage <= filter.maxSquareFootage;
        
        return matches;
      });
    }

    if (sort) {
      filteredProperties.sort((a, b) => {
        let aValue: any = a[sort.field as keyof Property];
        let bValue: any = b[sort.field as keyof Property];
        
        if (sort.field.includes('.')) {
          const [obj, key] = sort.field.split('.');
          aValue = (a as any)[obj][key];
          bValue = (b as any)[obj][key];
        }
        
        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const start = (page - 1) * pageSize;
    const paginatedProperties = filteredProperties.slice(start, start + pageSize);

    return {
      properties: paginatedProperties,
      total: filteredProperties.length
    };
  }

  async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return this.properties.find(p => p.id === id) || null;
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Property not found');
    
    this.properties[index] = {
      ...this.properties[index],
      ...updates
    };
    
    return this.properties[index];
  }

  async updateUserPropertyStatus(
    id: string,
    status: Property['userStatus'],
    notes?: string
  ): Promise<Property> {
    return this.updateProperty(id, {
      userStatus: status,
      userNotes: notes || undefined
    });
  }

  async addViewingRecord(
    id: string,
    date: string,
    notes: string
  ): Promise<Property> {
    const property = await this.getPropertyById(id);
    if (!property) throw new Error('Property not found');
    
    const viewingHistory = property.viewingHistory || [];
    
    return this.updateProperty(id, {
      viewingHistory: [...viewingHistory, { date, notes }]
    });
  }
}

export const propertyService = PropertyService.getInstance();