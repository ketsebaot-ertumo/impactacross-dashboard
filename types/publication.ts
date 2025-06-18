export interface Publication {
    id: string;
    userId: string;
    name: string;
    title: string;
    content: string;
    slug: string;
    author: string;
    imageURL?:string;
    fileURL: string;
    published_at: Date;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}