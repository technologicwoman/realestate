import { Bath, Bed, Car, Maximize2 } from "lucide-react";

interface PropertyFeaturesProps {
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
}

export function PropertyFeatures({ bedrooms, bathrooms, area, parking }: PropertyFeaturesProps) {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex items-center">
        <Bed className="h-5 w-5 mr-2" />
        <span>{bedrooms} Recámaras</span>
      </div>
      <div className="flex items-center">
        <Bath className="h-5 w-5 mr-2" />
        <span>{bathrooms} Baños</span>
      </div>
      <div className="flex items-center">
        <Maximize2 className="h-5 w-5 mr-2" />
        <span>{area} m²</span>
      </div>
      <div className="flex items-center">
        <Car className="h-5 w-5 mr-2" />
        <span>{parking} Estacionamientos</span>
      </div>
    </div>
  );
}