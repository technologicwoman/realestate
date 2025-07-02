import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Bath, Bed, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price?: number;
    priceLabel: string;
    features: {
      bedrooms: number;
      bathrooms: number;
      area: number;
    };
    image: string;
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-64">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-1">{property.location}</p>
          
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.features.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.features.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4" />
              <span className="text-sm">{property.features.area}m²</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold">
            {property.priceLabel}
          </span>
          <Button variant="outline" asChild>
            <Link href={`/properties/${property.id}`}>Ver Detalles</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}