import { ICity, ILocation, IProperty, IRegion, IZone } from "../domain/interfaces";
import { PropertyViewModel, PropertyMapper, ZoneViewModel, ZoneMapper, LocationViewModel, LocationMapper, CityViewModel, CityMapper } from "../domain/models";
import { fetchWithErrorHandling } from "./common";


export class WasiService {
    private baseUrl: string;
    private clientId: string;
    private token: string;
  
    constructor(baseUrl: string, clientId: string, token  : string) {
      this.baseUrl = baseUrl;
      this.clientId = clientId;
      this.token = token;
    }
  
    getPanamaID(): number {
      const panamaID = 124;
      return panamaID;
    }
  
    async getRegions(): Promise<IRegion[]> {
      const url = `${this.baseUrl}/location/regions-from-country/${this.getPanamaID()}`;
      const response = await fetchWithErrorHandling<IRegion[]>(url, {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_company: this.clientId,
          wasi_token: this.token
        })
      });
      return response;
    }
  
    async getCities(): Promise<CityViewModel[]> {
      const url = `${this.baseUrl}/location/cities-with-property`;
      const response = await fetchWithErrorHandling<ICity[]>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_company: this.clientId,
          wasi_token: this.token
        })
      });
      // Map the response to CityViewModel
      const cities: CityViewModel[] = Object.values(response).map((city: ICity) => {
        return CityMapper.toViewModel(city);
      });
      
      return cities;
    }
  
    async getLocations(city: CityViewModel): Promise<LocationViewModel[]> {
      const url = `${this.baseUrl}/location/locations-from-city/${city.id}`;
      const response = await fetchWithErrorHandling<ILocation[]>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_company: this.clientId,
          wasi_token: this.token
        })
      });
      // Map the response to LocationViewModel
      const locations: LocationViewModel[] = Object.values(response).map((location: ILocation) => {
        return LocationMapper.toViewModel(location, city);
      });
      
      return locations;
    }
  
    async getZones(city?: CityViewModel, location?: LocationViewModel): Promise<ZoneViewModel[]> {
      const endpoint = location ? `zones-from-location/${location.id}` :  `zones-from-city/${city?.id}`;
      const url = `${this.baseUrl}/location/${endpoint}`;
      const response = await fetchWithErrorHandling<IZone[]>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_company: this.clientId,
          wasi_token: this.token
        })
      });

      // Map the response to ZoneViewModel
      const zones: ZoneViewModel[] = Object.values(response).map((zone: IZone) => {
        return ZoneMapper.toViewModel(zone, location, city);
      });

      return zones;
    }
  
    async getOutstandingProperties(): Promise<PropertyViewModel[]> {
      const url = `${this.baseUrl}/property/search?short=true&id_status_on_page=3&take=6&order_by=created_at&id_user=30262`;
      const response = await fetchWithErrorHandling<any[]>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_company: this.clientId,
          wasi_token: this.token
        })
      });
      
      // Map the response to PropertyViewModel
      delete response['status'];``
      delete response['total'];
      const properties: PropertyViewModel[] = Object.values(response).map((property: IProperty) => {
        return PropertyMapper.toViewModel(property);
      });
      
  
      return properties;
    }
  
    async getPropertyById(propertyId: number): Promise<PropertyViewModel | null> {
      const url = `${this.baseUrl}/property/get/${propertyId}`;
      try {
        const response = await fetchWithErrorHandling<IProperty>(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_company: this.clientId,
            wasi_token: this.token
          })
        });
        
        // Map the response to PropertyViewModel
        return PropertyMapper.toViewModel(response);
      } catch (error) {
        console.error(`Failed to fetch property with ID ${propertyId}:`, error);
        return null;
      }
    }

    async getAllZones(): Promise<ZoneViewModel[]> {
      let cities = await this.getCities();
      cities = cities.filter(city => !isNaN(city.id));
      // Get all locations grouped by city
      const locationsPromises = cities.map(city => this.getLocations(city));
      const locationsResult = await Promise.all(locationsPromises);
    
      // Get zones from locations
      let flattenedLocations = locationsResult.flat();
      flattenedLocations = flattenedLocations.filter(location => !isNaN(location.id));
      const zonesWithLocationsPromises = flattenedLocations.map(location => 
        this.getZones(undefined, location)
      );
      
      // Get zones directly from cities (without location)
      const zonesWithoutLocationsPromises = cities.map(city => 
        this.getZones(city, undefined)
      );
      
      // Combine all results
      const allResults = await Promise.all([
        ...zonesWithLocationsPromises,
        ...zonesWithoutLocationsPromises
      ]);
      
      // Flatten the results
      const allZones = allResults.flat();
      // filter out undefined zones
      const filteredZones = allZones.filter(zone => !isNaN(zone.id));
      return filteredZones;

    }
    
    manageParamsPropertyFilters(params:any) {
      let filters = {
        ...params
      };
      if (params.type) {
        filters.for_rent = params.type === 'rent' ? 1 : 0;
        filters.for_sale = params.type === 'buy' ? 1 : 0;
      }
      if (params.location){
        filters.id_zone = params.location;
      }
      if (params.skip) {
        filters.skip = params.skip;
      }
      return filters;
    };
    
    async getPropertyByFilters(params: any): Promise<PropertyViewModel[]> {
      const filters = this.manageParamsPropertyFilters(params);
      // add parameters to url
      const urlStringParameters = new URLSearchParams(filters).toString();
      // Construct the URL with base URL and parameters string
      const url = `${this.baseUrl}/property/search?short=true&order_by=created_at&${urlStringParameters}`;
      const response = await fetchWithErrorHandling<IProperty[]>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_company: this.clientId,
          wasi_token: this.token,
          ...params
        })
      });
      
      // Map the response to PropertyViewModel
      let properties: PropertyViewModel[] = Object.values(response).map((property: IProperty) => {
        return PropertyMapper.toViewModel(property);
      });

      properties = properties.filter(property => !isNaN(property.id));
      
      return properties;
    }
  
}
