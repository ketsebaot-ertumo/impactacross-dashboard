// types/multimedia.ts

export interface Multimedia {
    id: string;
    title: string;
    url: string;
    type: 'image' | 'video' | 'audio';
    createdAt: string;
  }
  