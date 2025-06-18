export interface Location {
    id: string;
    owner_id: string;
    address: string;
    lat: number;
    lng: number;
    createdAt: Date;
    updatedAt: Date;
    // city?: string;
    // state?: string;
    // country?: string;
    // postalCode?: string;
}