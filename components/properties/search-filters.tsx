"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import WaterMark from "@/app/assets/images/WaterMark.png";
import { PropertyType } from "@/lib/types";

export function SearchFilters({
  zones,
}: {
  zones: { id: number; displayString: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "all",
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || "2000000",
    bedrooms: searchParams.get("bedrooms") || "all",
    bathrooms: searchParams.get("bathrooms") || "all",
    minArea: searchParams.get("minArea") || "0",
    maxArea: searchParams.get("maxArea") || "1000",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      }
    });
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative space-y-6 p-6 rounded-lg border">
      <Image
        src={WaterMark}
        alt="Luxury Panama Real Estate"
        fill
        className="object-cover -z-10"
        />
      <div className="space-y-2">
        <Label>Property Type</Label>
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="office">Office</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <Select
          value={filters.bedrooms}
          onValueChange={(value) => handleFilterChange("bedrooms", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}+ Beds
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Bathrooms</Label>
        <Select
          value={filters.bathrooms}
          onValueChange={(value) => handleFilterChange("bathrooms", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {[1, 2, 3, 4].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}+ Baths
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Area (m²)</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min Area"
            value={filters.minArea}
            onChange={(e) => handleFilterChange("minArea", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Area"
            value={filters.maxArea}
            onChange={(e) => handleFilterChange("maxArea", e.target.value)}
          />
        </div>
      </div>

      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );
}