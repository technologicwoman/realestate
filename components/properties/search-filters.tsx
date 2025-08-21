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
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin } from "lucide-react";
import Image from "next/image";
import WaterMark from "@/app/assets/images/WaterMark.png";
import { PropertyTypeViewModel } from "@/lib/domain/models";

export function SearchFilters({
  zones, propertyTypes
}: {
  zones: { id: number; displayString: string }[], propertyTypes: PropertyTypeViewModel[];
}) {    
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    transactionType: searchParams.get("transactionType") || "all",
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "all",
    min_price: searchParams.get("min_price") || "0",
    max_price: searchParams.get("max_price") || "2000000",
    min_bedrooms: searchParams.get("min_bedrooms") || "all",
    bathrooms: searchParams.get("bathrooms") || "all",
  });

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredZones, setFilteredZones] = useState(zones);

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
      <div className="space-y-2">
        <Select
          value={filters.transactionType}
          onValueChange={(value) => handleFilterChange("transactionType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
          {["rent", "buy", "project"].map((type) => ( // CHANGE for constant sell, buy or project
            <SelectItem key={type} value={type}>
              {type === "rent" ? "Alquilar" : type === "buy" ? "Comprar" : "Proyecto"}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Ubicación</Label>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                role="combobox" 
                aria-expanded={open}
                className="w-full justify-between pr-4 py-2 h-10 border-[2px] rounded-md bg-white/90 dark:bg-gray-800/50 text-black text-left font-normal"
                onClick={() => setOpen(true)}
              >
                <span className="truncate">
                  {filters.location ? 
                    zones.find(zone => zone.id.toString() === filters.location)?.displayString : 
                    "Ubicación"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
              <Command>
                <CommandInput 
                  placeholder="Buscar ubicación..." 
                  value={searchText}
                  onValueChange={setSearchText}
                  className="h-9 text-base"
                  autoFocus
                />
                <CommandList className="max-h-[300px] overflow-auto">
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup>
                    {filteredZones.map((zone) => (
                      <CommandItem
                        key={zone.id}
                        value={zone.displayString}
                        className="cursor-pointer py-2"
                        onSelect={() => {
                          setFilters(prev => ({ ...prev, location: zone.id.toString() }));
                          setSearchText(zone.displayString);
                          setOpen(false);
                        }}
                      >
                        <div className="w-full break-words">
                          {zone.displayString}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
      </div>

      <div className="space-y-2">
        <Label>Tipo de Propiedad</Label>
        <Select
          value={filters.propertyType}
          onValueChange={(value) => handleFilterChange("propertyType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Propiedad" />
          </SelectTrigger>
          <SelectContent>
          {propertyTypes.map((type) => (
            <SelectItem key={type.id} value={type.id.toString()}>
              {type.displayName}
            </SelectItem>
          ))}
            <SelectItem value="all">Todas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rango de Precio</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Precio Mínimo"
            value={filters.min_price}
            onChange={(e) => handleFilterChange("min_price", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Precio Máximo"
            value={filters.max_price}
            onChange={(e) => handleFilterChange("max_price", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Recámaras</Label>
        <div className="flex rounded-lg overflow-hidden border border-input">
          <Button
            type="button"
            variant={filters.min_bedrooms === "all" ? "default" : "ghost"}
            className={`rounded-none h-10 flex-1 ${filters.min_bedrooms === "all" ? "" : "bg-background hover:bg-muted text-foreground"}`}
            onClick={() => handleFilterChange("min_bedrooms", "all")}
          >
            Todos
          </Button>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Button
              key={num}
              type="button"
              variant={filters.min_bedrooms === num.toString() ? "default" : "ghost"}
              className={`rounded-none h-10 flex-1 ${filters.min_bedrooms === num.toString() ? "" : "bg-background hover:bg-muted text-foreground"}`}
              onClick={() => handleFilterChange("min_bedrooms", num.toString())}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Baños</Label>
        <div className="flex rounded-lg overflow-hidden border border-input">
          <Button
            type="button"
            variant={filters.bathrooms === "all" ? "default" : "ghost"}
            className={`rounded-none h-10 flex-1 ${filters.bathrooms === "all" ? "" : "bg-background hover:bg-muted text-foreground"}`}
            onClick={() => handleFilterChange("bathrooms", "all")}
          >
            Todos
          </Button>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Button
              key={num}
              type="button"
              variant={filters.bathrooms === num.toString() ? "default" : "ghost"}
              className={`rounded-none h-10 flex-1 ${filters.bathrooms === num.toString() ? "" : "bg-background hover:bg-muted text-foreground"}`}
              onClick={() => handleFilterChange("bathrooms", num.toString())}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      <Button className="w-full" onClick={applyFilters}>
        Aplicar Filtros
      </Button>
    </div>
  );
}