export const PropertyTypes: { [key: string]: string } = {
  '1': 'Casa',
  '2': 'Apartamento',
  '3': 'Local comercial',
  '4': 'Oficina',
  '5': 'Lote / Terreno',
  '6': 'Lote Comercial',
  '7': 'Finca',
  '8': 'Bodega',
  '10': 'Chalet',
  '11': 'Casa de Campo',
  '12': 'Hoteles',
  '13': 'Finca - Hoteles',
  '14': 'Aparta-Estudio',
  '15': 'Consultorio',
  '16': 'Edificio',
  '17': 'Lote de Playa',
  '18': 'Hostal',
  '19': 'Condominio',
  '20': 'Duplex',
  '21': 'Atico',
  '22': 'Bungalow',
  '23': 'Galpon Industrial',
  '24': 'Casa de Playa',
  '25': 'Piso',
  '26': 'Garaje',
  '27': 'Cortijo',
  '28': 'Cabañas',
  '29': 'Isla',
  '30': 'Nave Industrial',
  '31': 'Campos, Chacras y Quintas',
  '32': 'Terreno'
};


const allowedPropertyTypes = ['1', '2', '20', '32', '26', '8', '13', '29', '7', '19', '3', '4'];

export function isAllowed(propertyType: string): boolean {
  return allowedPropertyTypes.includes(propertyType);
}

export function getAllowedPropertyTypes() {
  return allowedPropertyTypes.map(id => ({
    id: parseInt(id),
    name: PropertyTypes[id],
    displayName: PropertyTypes[id]
  }));
}