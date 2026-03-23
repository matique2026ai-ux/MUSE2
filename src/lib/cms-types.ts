/**
 * Firestore data types for the CMS.
 * These are the canonical types stored in Firestore.
 */

export type ProjectStatus = "active" | "completed" | "design" | "on_hold" | "archived";
export type ProjectCategory =
  | "cultural-civic"
  | "residential"
  | "adaptive-reuse"
  | "urban-planning"
  | "mixed-use"
  | "heritage";

export interface ProjectTranslation {
  title: string;
  location: string;
  year: string;
  type: string;
  tagline: string;
  status: string;
  client: string;
  services: string[];
  narrative: {
    context: string[];
    design: string[];
    outcome: string[];
  };
}

export interface FirestoreProject {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  heroImage: string;        // Firebase Storage URL or local path
  images: string[];         // Gallery image URLs
  published: boolean;       // Show on public site
  featured: boolean;        // Show on homepage
  order: number;            // Sort order
  en: ProjectTranslation;
  fr: ProjectTranslation;
  ar: ProjectTranslation;
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreService {
  slug: string;
  icon: string;             // Lucide icon name
  image: string;
  published: boolean;
  order: number;
  en: { title: string; subtitle: string; description: string; features: string[] };
  fr: { title: string; subtitle: string; description: string; features: string[] };
  ar: { title: string; subtitle: string; description: string; features: string[] };
}

export interface FirestoreTeamMember {
  name: string;
  role: { en: string; fr: string; ar: string };
  photo: string;
  order: number;
  published: boolean;
}

export interface FirestoreHeroConfig {
  id: "homepage";
  backgroundImage: string;
  en: { title: string; subtitle: string; cta: string };
  fr: { title: string; subtitle: string; cta: string };
  ar: { title: string; subtitle: string; cta: string };
}

export interface FirestoreSiteConfig {
  id: "global";
  officeName: string;
  address: { en: string; fr: string; ar: string };
  phone: string;
  email: string;
  instagram: string;
  linkedin: string;
  copyright: { en: string; fr: string; ar: string };
}

export interface FirestoreInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  locale: string;
  status: "new" | "responded" | "archived";
  createdAt?: string;
}
