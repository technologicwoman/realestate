"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Search, MapPin, DollarSign } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    type: "buy",
    location: "",
    propertyType: "",
    priceRange: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchParams.type) params.set("type", searchParams.type);
    if (searchParams.location) params.set("location", searchParams.location);
    if (searchParams.propertyType) params.set("propertyType", searchParams.propertyType);
    if (searchParams.priceRange) params.set("priceRange", searchParams.priceRange);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/95 dark:bg-gray-900/95 rounded-lg shadow-lg p-6 backdrop-blur-xs">
      {/* Buy/Rent Toggle */}
      <div className="flex flex-col md:flex-row justify-center md:gap-4 mb-6">
        <Button 
          size="lg" 
          variant={searchParams.type === "buy" ? "default" : "outline"}
          className={searchParams.type !== "buy" ? "bg-white/50 text-foreground dark:bg-gray-800/50" : ""}
          onClick={() => setSearchParams(prev => ({ ...prev, type: "buy" }))}
        >
          Buy Property
        </Button>
        <Button 
          size="lg" 
          variant={searchParams.type === "rent" ? "default" : "outline"}
          className={searchParams.type !== "rent" ? "bg-white/50 text-foreground dark:bg-gray-800/50" : ""}
          onClick={() => setSearchParams(prev => ({ ...prev, type: "rent" }))}
        >
          Rent Property
        </Button>
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white/50 dark:bg-gray-800/50 text-foreground"
            value={searchParams.location}
            onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <select 
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white/50 dark:bg-gray-800/50 text-muted-foreground"
            value={searchParams.propertyType}
            onChange={(e) => setSearchParams(prev => ({ ...prev, propertyType: e.target.value }))}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <select 
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white/50 dark:bg-gray-800/50 text-muted-foreground"
            value={searchParams.priceRange}
            onChange={(e) => setSearchParams(prev => ({ ...prev, priceRange: e.target.value }))}
          >
            <option value="">Price Range</option>
            <option value="0-200000">$0 - $200,000</option>
            <option value="200000-500000">$200,000 - $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>
      </div>
      <Button className="w-full mt-4" size="lg" onClick={handleSearch}>
        <Search className="mr-2 h-5 w-5" /> Search Properties
      </Button>
    </div>
  );
}