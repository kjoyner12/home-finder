import { useState, useEffect, useCallback } from 'react';
import { Property, PropertyFilter, PropertySort } from '@/types/property';
import { propertyService } from '@/services/api/propertyService';

interface UsePropertiesOptions {
  initialFilter?: PropertyFilter;
  initialSort?: PropertySort;
  pageSize?: number;
}

export function useProperties({
  initialFilter,
  initialSort,
  pageSize = 10
}: UsePropertiesOptions = {}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<PropertyFilter | undefined>(initialFilter);
  const [sort, setSort] = useState<PropertySort | undefined>(initialSort);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await propertyService.getProperties(
        filter,
        sort,
        page,
        pageSize
      );
      
      setProperties(result.properties);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
    } finally {
      setLoading(false);
    }
  }, [filter, sort, page, pageSize]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updatePropertyStatus = useCallback(async (
    propertyId: string,
    status: Property['userStatus'],
    notes?: string
  ) => {
    try {
      await propertyService.updateUserPropertyStatus(propertyId, status, notes);
      fetchProperties();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update property status'));
    }
  }, [fetchProperties]);

  const addViewing = useCallback(async (
    propertyId: string,
    date: string,
    notes: string
  ) => {
    try {
      await propertyService.addViewingRecord(propertyId, date, notes);
      fetchProperties();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add viewing record'));
    }
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    filter,
    setFilter,
    sort,
    setSort,
    page,
    setPage,
    total,
    pageSize,
    updatePropertyStatus,
    addViewing,
    refresh: fetchProperties
  };
}