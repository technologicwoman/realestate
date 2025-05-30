"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyViewModel } from "@/lib/domain/models";

interface PropertyListProps {
  properties: PropertyViewModel[];
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function PropertyList({ properties, currentPage, totalPages, searchParams }: PropertyListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsObj = useSearchParams();

  // Function to handle pagination changes
  const handlePageChange = (newPage: number) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParamsObj.toString());
    
    // Update the page parameter
    params.set('page', newPage.toString());
    
    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {properties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No properties found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search filters</p>
        </div>
      ) : (
        <>
        <h1 className="text-3xl font-bold mb-8">Propiedades</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={{
                  id: property.id.toString(),
                  title: property.title,
                  location: property.location,
                  price: property.price,
                  features: {
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    area: property.area,
                  },
                  image: property.mainImage.url
                }} 
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || properties.length < 9}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}