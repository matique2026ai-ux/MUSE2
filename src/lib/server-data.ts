/**
 * Server-side Firestore data access.
 * Used in Next.js Server Components and generateStaticParams.
 * Uses the Firebase Admin SDK pattern for server-side rendering
 * but falls back to the client SDK since we're in a client-side Firebase setup.
 */
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { FirestoreProject, FirestoreService, FirestoreTeamMember, FirestoreHeroConfig, FirestoreSiteConfig, FirestoreEthosConfig, FirestoreMethodologyConfig, FirestoreOfficeConfig, WithId } from "@/lib/cms-types";
import { projects as staticProjects } from "@/lib/data/projects";


function timestampToString(ts: unknown): string {
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return "";
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────

export async function fetchPublicProjects(): Promise<WithId<FirestoreProject>[]> {
  try {
    const q = query(
      collection(db, "projects"),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    if (snap.empty) return buildStaticProjectsFallback();
    
    // Sort in memory to avoid Firestore composite index requirement errors
    const docs = snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as FirestoreProject),
      createdAt: timestampToString(d.data().createdAt),
      updatedAt: timestampToString(d.data().updatedAt),
    })).sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return docs;
  } catch {
    // Firestore not accessible (rules / offline) — use static fallback
    return buildStaticProjectsFallback();
  }
}

export async function fetchProjectBySlug(slug: string): Promise<WithId<FirestoreProject> | null> {
  try {
    const q = query(collection(db, "projects"), where("slug", "==", slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as FirestoreProject) };
    }
  } catch {
    // fallback to static
  }
  // Static fallback
  const staticProject = staticProjects.find(p => p.slug === slug);
  if (!staticProject) return null;
  const t = staticProject.translations as Record<string, {
    title: string; location: string; year: string; type: string;
    tagline: string; status: string; client: string; services: string[];
    narrative: { context: string[]; design: string[]; outcome: string[] };
  }>;
  return {
    id: slug,
    slug: staticProject.slug,
    category: staticProject.category as FirestoreProject["category"],
    status: "completed",
    heroImage: staticProject.heroImage,
    images: staticProject.images,
    published: true,
    featured: false,
    order: 0,
    en: t.en,
    fr: t.fr,
    ar: t.ar,
  };
}

export async function fetchFeaturedProjects(): Promise<WithId<FirestoreProject>[]> {
  try {
    const q = query(
      collection(db, "projects"),
      where("published", "==", true),
      where("featured", "==", true)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      // Sort and slice in memory
      const docs = snap.docs.map(d => ({ id: d.id, ...(d.data() as FirestoreProject) }));
      docs.sort((a, b) => (a.order || 0) - (b.order || 0));
      return docs.slice(0, 6);
    }
  } catch {
    // fallback
  }
  return buildStaticProjectsFallback().slice(0, 3);
}

function buildStaticProjectsFallback(): WithId<FirestoreProject>[] {
  return staticProjects.map((p, i) => ({
    id: p.slug,
    slug: p.slug,
    category: p.category as FirestoreProject["category"],
    status: "completed" as const,
    heroImage: p.heroImage,
    images: p.images,
    published: true,
    featured: i < 3,
    order: i,
    en: p.translations.en,
    fr: p.translations.fr,
    ar: p.translations.ar,
  }));
}

// ─── SERVICES ──────────────────────────────────────────────────────────────

export async function fetchPublicServices(): Promise<WithId<FirestoreService>[]> {
  try {
    const q = query(
      collection(db, "services"),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docs = snap.docs.map(d => ({ id: d.id, ...(d.data() as FirestoreService) }));
      return docs.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch {
    // fallback — returns empty (pages will use their own hardcoded fallback)
  }
  return [];
}

export async function fetchServiceBySlug(slug: string): Promise<WithId<FirestoreService> | null> {
  try {
    const q = query(collection(db, "services"), where("slug", "==", slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as FirestoreService) };
    }
  } catch {
    // fallback to static
  }
  return null;
}

// ─── TEAM ──────────────────────────────────────────────────────────────────

export async function fetchPublicTeam(): Promise<WithId<FirestoreTeamMember>[]> {
  try {
    const q = query(
      collection(db, "team"),
      where("published", "==", true)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docs = snap.docs.map(d => ({ id: d.id, ...(d.data() as FirestoreTeamMember) }));
      return docs.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch {
    // fallback
  }
  return [];
}

// ─── HERO CONFIG ───────────────────────────────────────────────────────────

export async function fetchHeroConfig(): Promise<FirestoreHeroConfig | null> {
  try {
    const snap = await getDoc(doc(db, "hero_config", "homepage"));
    if (snap.exists()) return snap.data() as FirestoreHeroConfig;
  } catch {
    // fallback
  }
  return null;
}

// ─── SITE CONFIG ───────────────────────────────────────────────────────────

export async function fetchSiteConfig(): Promise<FirestoreSiteConfig | null> {
  try {
    const snap = await getDoc(doc(db, "site_config", "global"));
    if (snap.exists()) return snap.data() as FirestoreSiteConfig;
  } catch {
    // fallback
  }
  return null;
}

// ─── ETHOS CONFIG ──────────────────────────────────────────────────────────

export async function fetchEthosConfig(): Promise<FirestoreEthosConfig | null> {
  try {
    const snap = await getDoc(doc(db, "home_config", "ethos"));
    if (snap.exists()) return snap.data() as FirestoreEthosConfig;
  } catch {
    // fallback
  }
  return null;
}

// ─── METHODOLOGY CONFIG ────────────────────────────────────────────────────

export async function fetchMethodologyConfig(): Promise<FirestoreMethodologyConfig | null> {
  try {
    const snap = await getDoc(doc(db, "home_config", "methodology"));
    if (snap.exists()) return snap.data() as FirestoreMethodologyConfig;
  } catch {
    // fallback
  }
  return null;
}

// ─── OFFICE CONFIG ─────────────────────────────────────────────────────────

export async function fetchOfficeConfig(): Promise<FirestoreOfficeConfig | null> {
  try {
    const snap = await getDoc(doc(db, "office_config", "main"));
    if (snap.exists()) return snap.data() as FirestoreOfficeConfig;
  } catch {
    // fallback
  }
  return null;
}

// ─── DASHBOARD STATS ───────────────────────────────────────────────────────

export async function fetchDashboardStats() {
  try {
    const [projectsSnap, inquiriesSnap] = await Promise.all([
      getDocs(collection(db, "projects")),
      getDocs(collection(db, "inquiries")),
    ]);
    const newInquiries = inquiriesSnap.docs.filter(d => d.data().status === "new").length;
    return {
      totalProjects: projectsSnap.size,
      totalInquiries: inquiriesSnap.size,
      newInquiries,
    };
  } catch {
    return { totalProjects: 0, totalInquiries: 0, newInquiries: 0 };
  }
}
