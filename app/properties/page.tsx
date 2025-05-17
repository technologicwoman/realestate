import { Suspense } from "react";
import { PropertyList } from "@/components/properties/property-list";
import { SearchFilters } from "@/components/properties/search-filters";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Ensure searchParams is awaited before use
  const params = await Promise.resolve(searchParams);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Properties</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SearchFilters />
        </div>
        
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading...</div>}>
            <PropertyList searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}