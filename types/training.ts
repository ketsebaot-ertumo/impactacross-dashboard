export interface Training {
    id: string;
    userId: string;
    name: string;
    title: string;
    content: string;
    slug: string;
    trainingType: string;
    location: string;
    startDate: Date;
    endDate: Date;
    durationHours: number;
    imageURL?: string;
    certification: boolean;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}