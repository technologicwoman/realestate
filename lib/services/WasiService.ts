import { ICity, ILocation, IProperty, IRegion, IZone } from "../domain/interfaces";
import { PropertyViewModel, PropertyMapper } from "../domain/models";
import { fetchWithErrorHandling } from "./common";


export class WasiService {
    private baseUrl: string;
    private clientId: string;
    private token: string;
  
    constructor(baseUrl: string, clientId: string, token: string) {
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
  
    async getCities(): Promise<ICity[]> {
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
      
      return response;
    }
  
    async getLocations(cityId: number): Promise<ILocation[]> {
      const url = `${this.baseUrl}/location/locations-from-city/${cityId}`;
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
      
      return response;
    }
  
    async getZones(cityId?: number, locationId?: number): Promise<IZone[]> {
      const endpoint = locationId ? `zones-from-location/${locationId}` :  `zones-from-city/${cityId}`;
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
      
      return response;
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
  
}
