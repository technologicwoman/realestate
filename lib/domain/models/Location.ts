import { ILocation, ICity } from "../interfaces";
import { CityViewModel } from "./City";


export interface LocationViewModel {
    id: number;
    name: string;
    city_id: number;
    city_name: string;
    country_id: number;
    country_name: string;
}

export class LocationMapper {
    static toViewModel(
        location: ILocation,
        city?: CityViewModel
    ): LocationViewModel {
        return {
            id: Number(location.id_location),
            name: location.name,
            city_id: Number(location.id_city),
            city_name: city?.name || "",
            country_id: 124, // Panama ID as default
            country_name: "Panama"
        };
    }
}