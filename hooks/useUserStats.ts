import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // tu Firestore exportado desde config.ts

interface UserStats {
  uid: string;
  nick: string;
  avatar?: string; 
  frame?: string;  
  coins: number;
  streak: number;
  level: number;
  totalEarned: number;
  lastPlayed: any;
}

export function useUserStats() {
  const [uid, setUid] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStats(snap.data() as UserStats);
        } else {
          const defaultStats: UserStats = {
            uid: user.uid,
            nick: 'Jugador123',
            coins: 250,
            streak: 0,
            level: 1,
            totalEarned: 0,
            lastPlayed: serverTimestamp(),
          };
          await setDoc(ref, defaultStats);
          setStats(defaultStats);
        }
        setLoading(false);
      } else {
        setUid(null);
        setStats(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateStats = async (newData: Partial<UserStats>) => {
    if (!uid) return;
    const ref = doc(db, 'users', uid);
    await updateDoc(ref, {
      ...newData,
      lastPlayed: serverTimestamp(),
    });
    setStats((prev) => (prev ? { ...prev, ...newData } : null));
  };

  return { uid, stats, updateStats, loading };
}