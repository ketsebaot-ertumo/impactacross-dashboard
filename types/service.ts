export interface Service{
    id: string;
    section_id: string;
    title: string;
    content: string;
    image_url: string;
    slug: string;
    // isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}