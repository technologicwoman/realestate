export type PropertyStatus = 'sale' | 'rent';
export type PropertyType = 'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  location: {
    address: string;
    city: string;
    area?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number; // in square meters
    yearBuilt?: number;
    parking?: number;
    furnished?: boolean;
  };
  amenities: string[];
  images: string[];
  featured?: boolean;
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  role: string;
  bio: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  languages?: string[];
  listings?: number;
  experience?: number; // in years
}

export interface Location {
  id: string;
  name: string;
  city: string;
  description: string;
  imag