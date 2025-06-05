import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { notFound } from "next/navigation";

import { WasiService } from "@/lib/services";

import HeroBg from "@/app/assets/images/HeroBg.png";

// Create a client component for the slider
import PropertiesSlider from "@/components/properties/properties-slider";

export default async function ZonePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const zoneId = parseInt(id);
  
  if (isNaN(zoneId)) {
    return notFound();
  }

  // WasiService instance
  const WASI_BASE_URL = process.env.WASI_BASE_URL || 'https://api.wasi.co/v1';
  const WASI_CLIENT_ID = process.env.WASI_CLIENT_ID || '';
  const WASI_TOKEN = process.env.WASI_TOKEN || '';
  const wasiService = new WasiService(WASI_BASE_URL, WASI_CLIENT_ID, WASI_TOKEN);

  // Get all zones
  const zones = await wasiService.getAllZones();
  
  // Find the specific zone
  const zone = zones.find(z => z.id === zoneId);

  if (!zone) {
    return notFound();
  }

  // Get the zone information from the OutstandingZones config
  const outstandingZones = wasiService.getOutstandingZones(zones);
  const outstandingZone = outstandingZones.find(z => z.id === zoneId);

  // Fetch properties in this zone
  const properties = await wasiService.getPropertyByFilters({
    location: zoneId.toString()
  });

  // Serialize properties for client component
  const serializedProperties = properties.map(prop => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    bathrooms: prop.bathrooms,
    bedrooms: prop.bedrooms,
    area: prop.area,
    priceLabel: prop.priceLabel,
    mainImage: {
      url: prop.mainImage.url
    }
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
          src={HeroBg}
          alt={`Propiedades en ${zone.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {zone.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {zone.getString()}
          </p>
        </div>
      </section>

      {/* Zone Description */}
      {outstandingZone && outstandingZone.description && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4">Sobre esta zona</h2>
              <p className="text-lg text-muted-foreground">{outstandingZone.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Properties in Zone */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
              Propiedades en {zone.name}
          </h2>
          
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                No hay propiedades disponibles en esta zona actualmente.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/properties">Ver todas las propiedades</Link>
              </Button>
            </div>
          ) : (
            <PropertiesSlider properties={serializedProperties} />
          )}
          
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/properties">Ver todas las propiedades</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}