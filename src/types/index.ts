// Tipos para la revista FERMENTUM

export interface Article {
  id: string;
  title: string;
  abstract: string;
  authors: Author[];
  keywords: string[];
  category: Category;
  volume: number;
  issue: number;
  year: number;
  pages: string;
  pdfUrl: string;
  doi?: string;
  publishedDate: string;
  downloads: number;
  views: number;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  bio: string;
  specialty: string[];
  avatar?: string;
  orcid?: string;
  articlesCount: number;
  articles?: Article[];
}

export interface Volume {
  id: number;
  number: number;
  year: number;
  title: string;
  description: string;
  coverImage?: string;
  articles: Article[];
  publishedDate: string;
}

export type Category = 
  | 'ciencias-sociales' 
  | 'economia' 
  | 'humanidades' 
  | 'ciencias-naturales' 
  | 'tecnologia' 
  | 'salud';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface EditorialTeam {
  id: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  avatar?: string;
}

export interface ResearchLine {
  id: string;
  name: string;
  description: string;
  leader: string;
  members: number;
  publications: number;
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PublicationGuideline {
  id: string;
  title: string;
  description: string;
  steps?: string[];
  requirements?: string[];
}
