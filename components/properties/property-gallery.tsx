"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';

interface Thumbnail {
  url_original: string;
}

interface PropertyGalleryProps {
  mainImage: string;
  thumbnails: Thumbnail[];
}

export function PropertyGallery({ mainImage, thumbnails }: PropertyGalleryProps) {
  const images = [mainImage, ...thumbnails.map((t) => t.url_original)];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps' 
  });

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  // When a thumbnail is selected, also scroll carousel to that position
  const onThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  return (
    <>
      <div
        key={currentIndex}
        className="relative h-[500px] mb-8 rounded-lg overflow-hidden"
      >
        <Image
          src={images[currentIndex]}
          alt={`Property Image ${currentIndex + 1}`}
          fill
          className="object-cover animate-fade-left animate-once"
          priority
        />

        {/* Action buttons
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Share2 className="h-5 w-5" />
          </Button>
        </div> */}

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {currentIndex < images.length - 1 && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Thumbnail Slider */}
      <div className="relative mb-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className={`flex-[0_0_calc(25%-12px)] min-w-0 relative aspect-video rounded-lg overflow-hidden cursor-pointer ${
                  currentIndex === i ? "ring-4 ring-primary" : ""
                }`}
                onClick={() => onThumbnailClick(i)}
              >
                <Image
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Thumbnail navigation controls */}
        <Button 
          size="icon" 
          variant="secondary"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          size="icon" 
          variant="secondary"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}