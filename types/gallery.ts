export interface Gallery {
    title: string;
    description?: string;
    // image_url: string;
    image_url: File;
    video_url?: string;
    // type: string;
    // thumbnail_url?: string;
}

export interface GalleryResponse extends Gallery {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}