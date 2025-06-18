export interface Link {
    id: string;
    owner_id: string;
    label: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    // target?: '_self' | '_blank' | '_parent' | '_top';
    // rel?: string;
}