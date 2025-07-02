"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Search, MapPin } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectLabel
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define a simpler interface for the serialized zones
interface SerializedZone {
  id: number;
  displayString: string;
}

interface serializedPropertyTypes {
  id: number;
  name: string;
  displayName: string;
} 

interface HeroSearchProps {
  zones: SerializedZone[];
  propertyTypes: serializedPropertyTypes[]
}

export function HeroSearch({ zones, propertyTypes }: HeroSearchProps) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    type: "buy",  
    location: "",
    propertyType: "",
    priceRange: ""
  });
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [filteredZones, setFilteredZones] = useState<SerializedZone[]>(zones);

  // Filter zones when search text changes
  useEffect(() => {
    if (searchText) {
      const filtered = zones.filter((zone) =>
        zone.displayString.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredZones(filtered);
    } else {
      setFilteredZones(zones);
    }
  }, [searchText, zones]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchParams.type) params.set("type", searchParams.type);
    if (searchParams.location) params.set("location", searchParams.location);
    if (searchParams.propertyType && searchParams.propertyType !== "all") {
      params.set("propertyType", searchParams.propertyType);
    }
    if (searchParams.priceRange) params.set("priceRange", searchParams.priceRange);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto dark:bg-gray-900/95 rounded-lg shadow-lg p-6 gap-2">
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
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex w-full md:w-[30%]">
          <Select
            value={searchParams.propertyType}
            onValueChange={(value) => 
              setSearchParams(prev => ({ ...prev, propertyType: value }))
            }
          >
            <SelectTrigger className="w-full pl-10 border-[2px] bg-white/90 dark:bg-gray-800/50 text-muted-foreground">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <SelectValue placeholder="Tipo de Propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.displayName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Searchable Location Select */}
        <div className="relative flex w-full md:w-[70%]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                role="combobox" 
                aria-expanded={open}
                className="w-full justify-between pl-10 pr-4 py-2 h-10 border-[2px] rounded-md bg-white/90 dark:bg-gray-800/50 text-black text-left font-normal"
                onClick={() => setOpen(true)}
              >
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                {searchParams.location ? 
                  zones.find(zone => zone.id.toString() === searchParams.location)?.displayString : 
                  "Ubicación"}
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
                          setSearchParams(prev => ({ ...prev, location: zone.id.toString() }));
                          setSearchText(zone.displayString); // Set the search text to selected value
                          setOpen(false);
                        }}
                      >
                        {zone.displayString}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          <Button
            className="absolute border-0 rounded-l-none right-0 max-w-2xl md:mt-0"
            size="lg"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-5 w-5" />
            Buscar Propiedad
          </Button>
        </div>
      </div>
    </div>
  );
}