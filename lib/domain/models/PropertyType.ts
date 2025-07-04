import { IPropertyType } from "../interfaces/IPropertyType";


export interface  PropertyTypeViewModel {
  id: number;
  name: string;
  displayName: string;
}

export class PropertyTypeMapper {
  static toViewModel(apiPropertyType: IPropertyType): PropertyTypeViewModel {
    return {
      id: parseInt(apiPropertyType.id_property_type),
      name: apiPropertyType.name || apiPropertyType.nombre, // Use name if available, otherwise nombre
      displayName: apiPropertyType.nombre || apiPropertyType.name, // Prioritize Spanish name for display
    };
  }

  static toViewModelList(apiPropertyTypes: IPropertyType[]): PropertyTypeViewModel[] {
    return apiPropertyTypes.map(propertyType => this.toViewModel(propertyType));
  }

  static toPlainObjects(propertyTypes: PropertyTypeViewModel[]): PropertyTypeViewModel[] {
    // PropertyTypeViewModel is already a plain object (interface), but we'll ensure it
    return propertyTypes.map(type => ({...type}));
  }
}