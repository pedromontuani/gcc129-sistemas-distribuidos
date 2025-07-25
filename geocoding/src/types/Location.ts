export interface LocationResponse {
    "place_id": string;
    "licence": string;
    "osm_type": string;
    "osm_id": string;
    "lat": string;
    "lon": string;
    "place_rank": string;
    "category": string;
    "type": string;
    "importance": string;
    "addresstype": string;
    "display_name": string;
    "name": string;
    "address": {
        "road": string,
        "village": string;
        "state_district": string;
        "state": string;
        "postcode": string;
        "country": string;
        "country_code": string;
    },
    "boundingbox": string[];
}