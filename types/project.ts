export interface Project{
    id: string;
    section_id: string;
    title: string;
    description: string;
    date: Date;
    client: string;
    createdAt: Date;
    updatedAt: Date;
    // status: 'active' | 'completed' | 'on-hold';
}