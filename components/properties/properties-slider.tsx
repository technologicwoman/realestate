'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Property = {
  id: number;
  title: string;
  location: string;
  bathrooms: number;
  bedrooms: number;
  area: number;
  priceLabel: string;
  mainImage: {
    url: string;
  };
  slug?: string; // Optional slug for routing
};

type PropertiesSliderProps = {
  properties: Property[];
};

export default function PropertiesSlider({ properties }: PropertiesSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false
    },
    [AutoPlay({ delay: 3000, stopOnInteraction: true })]
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4"
            >
              <div className="h-full">
                <PropertyCard 
                  property={{
                    id: property.id.toString(),
                    title: property.title,
                    location: property.location,
                    priceLabel: property.priceLabel,
                    features: {
                      bedrooms: property.bedrooms,
                      bathrooms: property.bathrooms,
                      area: property.area,
                    },
                    image: property.mainImage.url,
                    slug: property.slug || ''
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button 
        onClick={scrollPrev} 
        size="icon" 
        variant="outline" 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button 
        onClick={scrollNext} 
        size="icon" 
        variant="outline" 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}