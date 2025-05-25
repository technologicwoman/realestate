import { ICity } from "../interfaces";

export interface CityViewModel {
    id: number;
    name: string;
    country_id: number;
    country_name: string;
    region_id?: number;
}

export class CityMapper {
    static toViewModel(
        city: ICity
    ): CityViewModel {
        return {
            id: Number(city.id_city),
            name: city.name,
            country_id: 124, // Panama ID as default
            country_name: "Panama",
            region_id: city.id_region ? Number(city.id_region) : undefined
        };
    }
}