export interface Multimedia {
    id: string;
    userId: string;
    name: string;
    title: string;
    content: string;
    mediaType: string;
    mediaURL: string;
    // thumbnailURL: string;
    // fileSize: number;
    mimeType: string;
    tags: string[];
    publishedAt: Date;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}