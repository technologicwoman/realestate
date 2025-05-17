import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Search, MapPin, DollarSign } from "lucide-react";
import { HeroSearch } from "@/components/properties/hero-search";

export default function Home() {
  return (
    <>
      {/* Hero Section with Integrated Search */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/1681453/pexels-photo-1681453.jpeg"
          alt="Luxury Panama Real Estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Home in Panama
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover premium properties in the most sought-after locations across Panama
          </p>
          
          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={`https://images.pexels.com/photos/32387${i}/pexels-photo-32387${i}.jpeg`}
                    alt={`Featured Property ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Luxury Apartment in Costa del Este</h3>
                  <p className="text-muted-foreground mb-4">
                    3 Beds • 2 Baths • 150m²
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">$450,000</span>
                    <Button variant="outline" asChild>
                      <Link href="/properties/1">View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BB Real Estate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Local Knowledge",
                description: "Over 15 years of experience in the Panama real estate market"
              },
              {
                title: "Premium Properties",
                description: "Carefully curated selection of the finest properties in Panama"
              },
              {
                title: "Personalized Service",
                description: "Dedicated agents providing tailored solutions for your needs"
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