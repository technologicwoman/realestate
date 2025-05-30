import { IProperty, IMainImage } from "../interfaces/IProperty";

export interface PropertyViewModel { // TODO: Speficy the type of objects for multiple CSM services 
  id: number;
  title: string;
  price: number;
  priceLabel: string;
  mainImage: IMainImage;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  agency: string;
  agencyLogo?: string;
  gallery: object;
  features: object;   
  garages: number;
  description: string; 
}

export class PropertyMapper {
  static toViewModel(apiProperty: IProperty): PropertyViewModel {
    // Determine the main price (sale or rent)
    const price = apiProperty.for_sale 
      ? apiProperty.sale_price 
      : (apiProperty.for_rent ? apiProperty.rent_price : 0);
      
    // Build location string
    const location = [
      apiProperty.zone_label,
      apiProperty.city_label,
      apiProperty.country_label
    ].filter(Boolean).join(', ');

    let gallery = apiProperty.galleries ? apiProperty.galleries[0] : {'id': null};
    const IdKey = "id";
    delete gallery[IdKey as keyof typeof gallery];
    let features = apiProperty.features ? apiProperty.features : {};

    return {
      id: apiProperty.id_property,
      title: apiProperty.title,
      price: price,
      priceLabel: apiProperty.sale_price ? apiProperty.sale_price_label : apiProperty.rent_price_label,
      mainImage: apiProperty.main_image,
      location: location,
      type: apiProperty.id_property_type ? `${apiProperty.id_property_type}` : 'Apartment', // Improve this with proper mapping
      bedrooms: apiProperty.bedrooms,
      bathrooms: apiProperty.bathrooms,
      area: parseFloat(apiProperty.area || '0'),
      agency: "B&B Real Estate", // Placeholder for agency name
      gallery: gallery,
      features: features,
      garages: apiProperty.garages,
      description: apiProperty.observations,
    };
  }

  static toViewModelList(apiProperties: IProperty[]): PropertyViewModel[] {
    return apiProperties.map(property => this.toViewModel(property));
  }
}
