"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  role: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  role: null,
});

export const useFirebaseAuth = () => useContext(AuthContext);

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
         try {
            const rawAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@s-arch.dz";
            const adminEmail = rawAdminEmail.replace(/['"]/g, '').trim();

            // 1. UNCONDITIONAL MASTER ADMIN OVERRIDE
            if (currentUser.email === adminEmail) {
               setRole("ADMIN");
               setLoading(false);
               // Fire-and-forget Firestore update (do not block UI if rules deny it)
               try {
                  const userDocRef = doc(db, "users", currentUser.uid);
                  await setDoc(userDocRef, { role: "ADMIN", email: currentUser.email }, { merge: true });
               } catch (dbErr) {
                  console.warn("Firestore admin promotion skipped (likely permission/rules):", dbErr);
               }
               return; // Exit early, role is secured
            }

            // 2. REGULAR USER FLOW
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
               setRole(userDoc.data().role || "CLIENT");
            } else {
               // First time login - Create user document
               await setDoc(userDocRef, {
                 email: currentUser.email,
                 role: "CLIENT",
                 createdAt: new Date().toISOString()
               });
               setRole("CLIENT");
            }
         } catch (e) {
            console.error("Error fetching user role", e);
            // If Firestore fails, fallback to basic UI
            setRole("GUEST");
         }
      } else {
         setRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
}
