import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyFeatures } from "@/components/properties/property-features";
import { AgentInfo } from "@/components/properties/agent-info";
import { ContactForm } from "@/components/properties/contact-form";

import { WasiService } from "@/lib/services";
import { PropertyViewModel } from "@/lib/domain/models";

import WaterMarkYellow from "@/app/assets/images/WaterMarkYellow.png";


export default async function PropertyDetail({ params }: { params: Promise<{ id: string }>  }) {
  // This would typically come from a database
  // Get property ID from route params
  const { id } = await params;
  const propertyId = parseInt(id);
  
  // Create WasiService instance
  const WASI_BASE_URL = process.env.WASI_BASE_URL || 'https://api.wasi.co/v1';
  const WASI_CLIENT_ID = process.env.WASI_CLIENT_ID || '';
  const WASI_TOKEN = process.env.WASI_TOKEN || '';
  const wasiService = new WasiService(WASI_BASE_URL, WASI_CLIENT_ID, WASI_TOKEN);

  // Fetch property details
  let property: PropertyViewModel | null = await wasiService.getPropertyById(propertyId);
  if (!property) {
    return notFound();
  }
  
  const gallery = property.gallery || {};
  let thumbnails = Object.values(gallery).map((image) => ({
    id: image.id,
    url: image.url,
    url_original: image.url_original,
    description: image.description
  }));
  
  let principalFeatures = {
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    parking: property.garages
  };

  let agentInfo = { 
    name: property.agency,
    role: "Real Estate",
    image: WaterMarkYellow
  };


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-primary">
          Propiedades
        </Link>
        <span>/</span>
        <span className="text-foreground">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <PropertyGallery
            mainImage={property?.mainImage.url_original}
            thumbnails={thumbnails}
          />

          {/* Property Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
              <PropertyFeatures {...principalFeatures} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Descripcion</h2>
              <div className="prose max-w-hidden" dangerouslySetInnerHTML={{ __html: property.description }}>
            
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Caracteristicas y Amenidades</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.values(property.features).map((featureType, i) => (
                  Object.values(featureType).map((feature: any, j) => (
                    <li key={`${i}-${j}`} className="flex items-center">
                      <div className="h-2 w-2 bg-primary rounded-full mr-2" />
                      {feature.nombre}
                    </li>
                  ))
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <div className="text-3xl font-bold mb-6">
              {property.priceLabel}
            </div>
            
            {/* Agent Info */}
            <div className="mb-6">
              <AgentInfo {...agentInfo} />
            </div>

            {/* Schedule Visit */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Comunicate con nosotros</h3>
              <ContactForm />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}