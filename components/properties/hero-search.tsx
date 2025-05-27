"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Search, MapPin, DollarSign } from "lucide-react";

// Define a simpler interface for the serialized zones
interface SerializedZone {
  id: number;
  displayString: string;
}

interface HeroSearchProps {
  zones: SerializedZone[];
}

export function HeroSearch({ zones }: HeroSearchProps) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    type: "buy",
    location: "",
    propertyType: "",
    priceRange: ""
  });
  const [searchText, setSearchText] = useState("");
  const [filteredZones, setFilteredZones] = useState<SerializedZone[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchText.length >= 2) {
      const filtered = zones.filter((zone) =>
        zone.displayString.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredZones(filtered);
      setShowDropdown(true);
    } else {
      setFilteredZones([]);
      setShowDropdown(false);
    }
  }, [searchText, zones]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchParams.type) params.set("type", searchParams.type);
    if (searchParams.location) params.set("location", searchParams.location);
    if (searchParams.propertyType) params.set("propertyType", searchParams.propertyType);
    if (searchParams.priceRange) params.set("priceRange", searchParams.priceRange);

    router.push(`/properties?${params.toString()}`);
  };

  const selectZone = (zone: SerializedZone) => {
    setSearchText(zone.displayString);
    setSearchParams((prev) => ({ ...prev, location: zone.id.toString() }));
    setShowDropdown(false);
  };

  return (
    <div className="max-w-4xl mx-auto dark:bg-gray-900/95 rounded-lg shadow-lg p-6">
      {/* Buy/Rent Toggle */}
      <div className="flex flex-col md:flex-row justify-center md:gap-4 mb-6">
        <Button
          size="lg"
          variant={searchParams.type === "buy" ? "default" : "outline"}
          className={
            searchParams.type !== "buy"
              ? "bg-white/90 text-foreground dark:bg-gray-800/50"
              : ""
          }
          onClick={() => setSearchParams((prev) => ({ ...prev, type: "buy" }))}
        >
          Venta
        </Button>
        <Button
          size="lg"
          variant={searchParams.type === "rent" ? "default" : "outline"}
          className={
            searchParams.type !== "rent"
              ? "bg-white/90 text-foreground dark:bg-gray-800/50"
              : ""
          }
          onClick={() => setSearchParams((prev) => ({ ...prev, type: "rent" }))}
        >
          Alquiler
        </Button>
        <Button
          size="lg"
          variant={searchParams.type === "project" ? "default" : "outline"}
          className={
            searchParams.type !== "project"
              ? "bg-white/90 text-foreground dark:bg-gray-800/50"
              : ""
          }
          onClick={() => setSearchParams((prev) => ({ ...prev, type: "project" }))}
        >
          Proyecto
        </Button>
      </div>

      {/* Search Filters */}
      <div className="flex flex-col">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 border-[2px] rounded-md bg-white/90 dark:bg-gray-800/50 text-foreground"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              if (searchText.length >= 2) {
                setShowDropdown(true);
              }
            }}
            onBlur={() => {
              // Delay hiding dropdown to allow for click on items
              setTimeout(() => setShowDropdown(false), 200);
            }}
          />
          <Button
            className="absolute border-0 rounded-l-none right-0 max-w-2xl md:mt-0"
            size="lg"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-5 w-5" />
          </Button>

          {/* Dropdown for filtered zones */}
          {showDropdown && filteredZones.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredZones.map((zone) => (
                <div
                  key={zone.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-left text-foreground"
                  onClick={() => selectZone(zone)}
                >
                  {zone.displayString}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="relative">
          <Building2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <select 
            className="pl-10 pr-4 py-2 border rounded-md bg-white/50 dark:bg-gray-800/50 text-muted-foreground scroll-y"
            value={searchParams.propertyType}
            onChange={(e) => setSearchParams(prev => ({ ...prev, propertyType: e.target.value }))}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
          </select>
        </div> */}
       
        {/* <div className="relative">
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
        </div> */}
      </div>
    </div>
  );
}