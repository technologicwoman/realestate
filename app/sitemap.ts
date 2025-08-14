import { WasiService } from '@/lib/services/WasiService';

// Define the MetadataRoute.Sitemap type
type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>;

export default async function sitemap(): Promise<Sitemap> {
  // Initialize WasiService
  const baseApiUrl = process.env.WASI_BASE_URL || 'https://api.wasi.co/v1';
  const clientId = process.env.WASI_CLIENT_ID || '';
  const token = process.env.WASI_TOKEN || '';
  const wasiService = new WasiService(baseApiUrl, clientId, token);

  // Get all properties and zones
  const properties = await wasiService.getPropertyByFilters({});
  const zones = await wasiService.getAllZones();

  // Base URL for the website
  const baseUrl = 'https://bbrealestate.com.pa';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dynamic property pages
  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}/${property.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Zone pages
  const zonePages = zones.map((zone) => ({
    url: `${baseUrl}/properties?zone=${zone.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...zonePages];
}