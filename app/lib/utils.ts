// lib/utils.ts

export function formatDate(date: string | Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }
  
  export function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }
  
  export function generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
  