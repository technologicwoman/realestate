import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Search, MapPin, DollarSign } from "lucide-react";
import { HeroSearch } from "@/components/properties/hero-search";
import { PropertyCard } from "@/components/properties/property-card";

import { WasiService } from "../lib/services";
import { PropertyViewModel, PropertyTypeViewModel } from "../lib/domain/models";
import { testimonials } from "@/lib/static/config/BBConfig";
import { getAllowedPropertyTypes } from "@/lib/static/config/PropertyConfig";


import WaterMark from "@/app/assets/images/WaterMark.png";
import HeroBg from "@/app/assets/images/HeroBg.jpg";

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
  propertyTypes = getAllowedPropertyTypes();

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-[0.25rem]">
            Descubre la propiedad con la que siempre soñaste en Panamá
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Vive en las zonas más exclusivas y encuentra el espacio perfecto para tu estilo de vida.
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
               <PropertyCard 
                  key={feauredProperty.id} 
                  property={{
                    id: feauredProperty.id.toString(),
                    title: feauredProperty.title,
                    location: feauredProperty.location,
                    priceLabel: feauredProperty.priceLabel,
                    features: {
                      bedrooms: feauredProperty.bedrooms,
                      bathrooms: feauredProperty.bathrooms,
                      area: feauredProperty.area,
                    },
                    image: feauredProperty.mainImage.url,
                    slug: feauredProperty.slug || ''
                  }}
                />
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
          <h2 className="text-3xl font-bold text-center mb-12">¿Por Qué Elegir B&B Real Estate?</h2>
          <p className="text-center text-lg mb-8 max-w-2xl mx-auto">
          Expertos en bienes raíces para inversionistas exigentes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Trayectoria comprobada en el mercado panameño",
                description: "Con más de 8 años gestionando compraventas, alquileres y administración de propiedades, conocemos el mercado y sus oportunidades. Pero sobre todo, sabemos cómo maximizar el valor de cada inversión."
              },
              {
                title: "Propiedades seleccionadas con visión estratégica",
                description: "Trabajamos con proyectos de alta demanda, rentabilidad comprobada y respaldo legal claro. Cada opción que ofrecemos ha pasado por un proceso riguroso de análisis y curaduría."
              },
              {
                title: "Atención personalizada, con enfoque profesional",
                description: "Nuestro equipo multidisciplinario brinda un servicio confidencial, cercano y eficaz. No vendemos por vender: construimos relaciones duraderas con quienes valoran invertir con inteligencia."
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

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Opiniones de Nuestros Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((review, i) => (
              <Card key={i} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`h-5 w-5 ${
                          starIndex < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="prose prose-sm pt-2 border-t">
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}