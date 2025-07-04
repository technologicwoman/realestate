import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Search, MapPin, DollarSign } from "lucide-react";
import { HeroSearch } from "@/components/properties/hero-search";

import { WasiService } from "../lib/services";
import { PropertyViewModel, PropertyTypeViewModel } from "../lib/domain/models";
import { OutstandingZones } from "../lib/static/config/ZonesConfig";

import WaterMark from "@/app/assets/images/WaterMark.png";
import HeroBg from "@/app/assets/images/HeroBg.png";

export default async function Home() {
  // This is the main page of the application
  // It serves as the landing page for users to explore properties
  
  // WasiService instance
  const WASI_BASE_URL = process.env.WASI_BASE_URL || 'https://api.wasi.co/v1';
  const WASI_CLIENT_ID = process.env.WASI_CLIENT_ID || '';
  const WASI_TOKEN = process.env.WASI_TOKEN || '';
  // Create service instance
  const wasiService = new WasiService(WASI_BASE_URL, WASI_CLIENT_ID, WASI_TOKEN);

  // Fetch properties or any other data you need here
  let featuredProperties: PropertyViewModel[] = [];
  featuredProperties = await wasiService.getOutstandingProperties();

  // Fetch all zones for the search
  let zones = await wasiService.getAllZones();

  // Get outstanding zones for the search
  const outstandingZones = wasiService.getOutstandingZones(zones);

  // Fetch property types
  let propertyTypes: PropertyTypeViewModel[] = [];
  propertyTypes = await wasiService.getPropertyTypes();

  // Convert zone classes to plain objects for client component
  const serializedZones = zones.map(zone => ({
    id: zone.id,
    displayString: zone.getString(),
  }));
  
  // Convert property types to plain objects for client component
  const serializedPropertyTypes = propertyTypes.map(type => ({
    id: type.id,
    name: type.name,
    displayName: type.displayName
  }));
  

  return (
    <>
      {/* Hero Section with Integrated Search */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <Image
          src={HeroBg}
          alt="Bienes Raíces de Lujo en Panamá"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu hogar soñado en Panamá
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Descubre propiedades premium en las ubicaciones más buscadas de Panamá
          </p>
  
          <HeroSearch zones={serializedZones} propertyTypes={serializedPropertyTypes} />
        </div>
      </section>

      {/* Outstanding Zones Section */}
      <section className="relative py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Zonas Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {outstandingZones.map((zone) => (
              <Link 
                key={zone.id} 
                href={`/zones/${zone.id}`} 
                className="relative block h-[250px] overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Zone image background */}
                <div className="absolute inset-0">
                  <Image 
                    src={zone.imageUrl || "/assets/zones/placeholder.png"}
                    alt={zone.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Zone name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{zone.name}</h3>
                  <p className="text-sm opacity-90">{zone.city_name}, {zone.country_name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="relative py-16">
        <div className="relative container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Propiedades Destacadas</h2>
          {/* For mobile: repeated watermark using background image */}
          <div
            className="absolute inset-0 -z-10 bg-repeat bg-auto md:hidden"
            style={{ backgroundImage: `url(${WaterMark.src})`, backgroundSize: "contain" }}
          />
          {/* For larger screens: use Image with fill */}
          <Image
            src={WaterMark}
            alt="Bienes Raíces de Lujo en Panamá"
            fill
            className="object-cover -z-10 hidden md:block"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((feauredProperty) => (
              <Card key={feauredProperty.id} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={feauredProperty.mainImage.url}
                    alt={`Propiedad Destacada ${feauredProperty.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feauredProperty.title}</h3>
                  <MapPin className="h-5 w-5 text-icon" />
                  <span className="text-sm text-muted-foreground">
                    {feauredProperty.location}
                  </span>
                  <p className="text-muted-foreground mb-4">
                    {feauredProperty.bathrooms} Baños • {feauredProperty.bedrooms} Hab • {feauredProperty.area}m² 
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">{feauredProperty.priceLabel}</span>
                    <Button variant="outline" asChild>
                      <Link href={`/properties/${feauredProperty.id}?title=${feauredProperty.title}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/properties">Ver más propiedades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about-us" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por Qué Elegir B&B Real Estate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Conocimiento Local Experto",
                description: "Más de 15 años de experiencia en el mercado inmobiliario de Panamá"
              },
              {
                title: "Propiedades Premium",
                description: "Selección cuidadosamente curada de las mejores propiedades en Panamá"
              },
              {
                title: "Servicio Personalizado",
                description: "Agentes dedicados que ofrecen soluciones adaptadas a tus necesidades"
              }
            ].map((item, i) => (
              <Card key={i} className="text-center p-6">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}