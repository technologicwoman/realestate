import { IZone } from "../interfaces";
import { CityViewModel } from "./City";
import { LocationViewModel } from "./Location";

export class ZoneViewModel {
    id: number;
    name: string;
    city_id: number;
    city_name: string;
    location_id: number | null;
    location_name: string | null;
    owner: string;
    country_id: number;
    country_name: string;
    outstanding?: boolean;
    description?: string;
    imageUrl?: string;
    
    constructor(
        id: number,
        name: string,
        city_id: number,
        city_name: string,
        location_id: number | null,
        location_name: string | null,
        owner: string,
        country_id: number,
        country_name: string,
        outstanding?: boolean,
        description?: string,
        imageUrl?: string 

    ) {
        this.id = id;
        this.name = name;
        this.city_id = city_id;
        this.city_name = city_name;
        this.location_id = location_id;
        this.location_name = location_name;
        this.owner = owner;
        this.country_id = country_id;
        this.country_name = country_name;
        this.outstanding = outstanding;
        this.description = description; // Initialize description
        this.imageUrl = imageUrl;
    }
    
    getString(): string {
        const parts = [
            this.name,
            this.location_name,
            this.city_name,
            this.country_name
        ].filter(Boolean);
        return parts.join(", ");
    }
    
    toPlainObject() {
        return {
            id: this.id,
            name: this.name,
            city_id: this.city_id,
            city_name: this.city_name,
            location_id: this.location_id,
            location_name: this.location_name,
            owner: this.owner,
            country_id: this.country_id,
            country_name: this.country_name,
            outstanding: this.outstanding,
            description: this.description,
            imageUrl: this.imageUrl,
            displayString: this.getString() // Include the result of the getString function
        };
    }
    
    static toPlainObjects(zones: ZoneViewModel[]) {
        return zones.map(zone => zone.toPlainObject());
    }
}

export class ZoneMapper {
    static toViewModel(
        zone: IZone, 
        location?: LocationViewModel | null, 
        city?: CityViewModel | null
    ): ZoneViewModel {
        return new ZoneViewModel(
            Number(zone.id_zone),
            zone.name,
            Number(location?.city_id || city?.id || zone.id_city),
            location ? location.city_name : city?.name || "",
            location?.id || null,
            location?.name || null,
            zone.owner || "",
            124, // Panama ID as defined in WasiService
            "Panama",
            undefined
        );
    }
}