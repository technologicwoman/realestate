"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";

interface PropertyGalleryProps {
  mainImage: string;
  thumbnails: string[];
}

export function PropertyGallery({ mainImage, thumbnails }: PropertyGalleryProps) {
  return (
    <>
      <div className="relative h-[500px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={mainImage}
          alt="Property Main Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {thumbnails.map((thumbnail, i) => (
          <div key={i} className="relative aspect-video rounded-lg overflow-hidden cursor-pointer">
            <Image
              src={thumbnail}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover hover:opacity-80 transition-opacity"
            />
          </div>
        ))}
      </div>
    </>
  );
}