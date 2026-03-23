/**
 * Typed Firestore CRUD helpers used by all Admin CMS pages.
 * Import { cmsGet, cmsAdd, cmsUpdate, cmsDelete } from "@/lib/cms"
 */
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";

/** Generic document type */
export type CmsDoc<T> = T & { id: string; createdAt?: string; updatedAt?: string };

/** Fetch all documents from a collection, ordered by createdAt desc */
export async function cmsGetAll<T>(collectionName: string): Promise<CmsDoc<T>[]> {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: (d.data().createdAt as Timestamp)?.toDate?.()?.toISOString?.() ?? "",
    updatedAt: (d.data().updatedAt as Timestamp)?.toDate?.()?.toISOString?.() ?? "",
  })) as CmsDoc<T>[];
}

/** Fetch a single document by ID */
export async function cmsGet<T>(collectionName: string, id: string): Promise<CmsDoc<T> | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as CmsDoc<T>;
}

/** Add a new document */
export async function cmsAdd<T extends object>(collectionName: string, data: T): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing document */
export async function cmsUpdate<T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a document */
export async function cmsDelete(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

/** Upload a file to Firebase Storage, returns the public download URL */
export async function cmsUploadImage(
  file: File,
  path: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        onProgress?.(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

/** Delete a file from Firebase Storage by its download URL */
export async function cmsDeleteImage(url: string): Promise<void> {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch {
    // Silently ignore — file may have already been removed
  }
}
