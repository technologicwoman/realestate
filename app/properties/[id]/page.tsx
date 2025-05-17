import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyFeatures } from "@/components/properties/property-features";
import { AgentInfo } from "@/components/properties/agent-info";
import { ContactForm } from "@/components/properties/contact-form";

export default function PropertyDetail() {
  // This would typically come from a database
  const property = {
    title: "Casa The Woods Santa Maria",
    location: "Santa Maria Golf & Country Club, Panama",
    price: 1250000,
    features: {
      bedrooms: 4,
      bathrooms: 4.5,
      area: 450,
      parking: 2
    },
    description: "Luxurious house located in the exclusive Santa Maria Golf & Country Club. This beautiful property features modern architecture, high-end finishes, and stunning golf course views. The house offers spacious living areas, a gourmet kitchen, and a private garden perfect for entertaining.",
    amenities: [
      "Golf course view",
      "Private garden",
      "Gourmet kitchen",
      "Smart home system",
      "24/7 Security",
      "Swimming pool",
      "Home theater",
      "Wine cellar",
      "Gym"
    ],
    images: {
      main: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      thumbnails: [
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        "https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg",
        "https://images.pexels.com/photos/1396124/pexels-photo-1396124.jpeg",
        "https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg"
      ]
    },
    agent: {
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-primary">
          Properties
        </Link>
        <span>/</span>
        <span className="text-foreground">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <PropertyGallery
            mainImage={property.images.main}
            thumbnails={property.images.thumbnails}
          />

          {/* Property Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
              <PropertyFeatures {...property.features} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <div className="prose max-w-hidden">
                <p className="text-muted-foreground">{property.description}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Features & Amenities</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <div className="text-3xl font-bold mb-6">
              ${property.price.toLocaleString()}
            </div>
            
            {/* Agent Info */}
            <div className="mb-6">
              <AgentInfo {...property.agent} />
            </div>

            {/* Schedule Visit */}
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Schedule a Visit</h3>
              <ContactForm />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}