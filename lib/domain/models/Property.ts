import { IProperty, IMainImage } from "../interfaces/IProperty";
import { PropertyTypes } from "../../static/config/PropertyConfig";

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
  slug?: string; // Optional slug for routing
}

export class PropertyMapper {
  static toViewModel(apiProperty: IProperty): PropertyViewModel {
    // Determine the main price (sale or rent) and business type
    let price = 0;
    let priceLabel = '';
    let businessType = '';
    if (apiProperty.for_sale === 'true') {
      price = apiProperty.sale_price;
      priceLabel = apiProperty.sale_price_label;
      businessType = 'venta';
    } else {
      price = apiProperty.rent_price;
      priceLabel = apiProperty.rent_price_label;
      businessType = 'alquiler';
    }

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

    let area = apiProperty.private_area;
    if (area === null || area === '') {
      area = apiProperty.built_area || apiProperty.area || '0' ;
    }

    // property type
    let propertyType = PropertyTypes[apiProperty.id_property_type] || 'Apartamento';
    
    return {
      id: apiProperty.id_property,
      title: apiProperty.title,
      price: price,
      priceLabel: priceLabel,
      mainImage: apiProperty.main_image,
      location: location,
      type: propertyType,
      bedrooms: apiProperty.bedrooms,
      bathrooms: apiProperty.bathrooms,
      area: parseFloat(area),
      agency: "B&B Real Estate",
      gallery: gallery,
      features: features,
      garages: apiProperty.garages,
      description: apiProperty.observations,
      slug: `${propertyType.toLowerCase()}-${businessType}-${apiProperty.zone_label || apiProperty.location_label}-${apiProperty.city_label || apiProperty.country_label}`.replace(/\s+/g, '-').toLowerCase() || ''
    };
  }

  static toViewModelList(apiProperties: IProperty[]): PropertyViewModel[] {
    return apiProperties.map(property => this.toViewModel(property));
  }
}
