"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// This would typically come from your API
const ITEMS_PER_PAGE = 9;

interface PropertyListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function PropertyList({ searchParams }: PropertyListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // This is mock data - replace with actual API call
  const properties = Array.from({ length: 20 }, (_, i) => ({
    id: `prop-${i + 1}`,
    title: `Luxury Property ${i + 1}`,
    location: "Costa del Este, Panama",
    price: 450000 + (i * 50000),
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
    },
    image: `https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg`
  }));

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}