'use client';

import PropertyList from '@/components/properties/PropertyList';

export default function Properties() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Saved Properties</h1>
      <PropertyList />
    </div>
  );
}