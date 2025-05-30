import { Suspense } from "react";
import { PropertyList } from "@/components/properties/property-list";
import { SearchFilters } from "@/components/properties/search-filters";
import { WasiService } from "@/lib/services";
import { PropertyViewModel } from "@/lib/domain/models";

// Items per page for pagination
const ITEMS_PER_PAGE = 9;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Ensure searchParams is awaited before use
  const params = await Promise.resolve(searchParams);
  
  // Extract pagination from URL params or use defaults
  const currentPage = params.page ? Number(params.page) : 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  
  // Create WasiService instance for server-side operations
  const WASI_BASE_URL = process.env.WASI_BASE_URL || 'https://api.wasi.co/v1';
  const WASI_CLIENT_ID = process.env.WASI_CLIENT_ID || '';
  const WASI_TOKEN = process.env.WASI_TOKEN || '';
  const wasiService = new WasiService(WASI_BASE_URL, WASI_CLIENT_ID, WASI_TOKEN);

  // We'll fetch zones for filters
  const zones = await wasiService.getAllZones();
  
  // Convert zone classes to plain objects for client component
  const serializedZones = zones.map(zone => ({
    id: zone.id,
    displayString: zone.getString(),
  }));

  // Create filter params with pagination
  const filterParams = {
    ...params,
    skip: skip,
    take: ITEMS_PER_PAGE
  };
  
  // Fetch properties with filters on the server
  let properties: PropertyViewModel[] = [];
  try {
    properties = await wasiService.getPropertyByFilters(filterParams);
  } catch (error) {
    console.error("Error fetching properties:", error);
    // We'll handle the empty array in the client component
  }

  // For simplicity, we're estimating total properties based on the current results
  const hasMore = properties.length === ITEMS_PER_PAGE;
  const totalProperties = hasMore ? 
    (currentPage * ITEMS_PER_PAGE) + ITEMS_PER_PAGE : 
    (currentPage * ITEMS_PER_PAGE);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalProperties / ITEMS_PER_PAGE));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Búsqueda Avanzada</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SearchFilters zones={serializedZones} />
        </div>
        
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>}>
            <PropertyList 
              properties={properties} 
              currentPage={currentPage} 
              totalPages={totalPages}
              searchParams={params}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}