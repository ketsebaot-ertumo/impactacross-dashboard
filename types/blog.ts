export interface Blog {
    id: string;
    userId: string;
    name: string;
    title: string;
    content: string;
    slug: string;
    publishedAt: Date;
    imageURL?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}