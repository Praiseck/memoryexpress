import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { db } from '../firebase/config';

// ✅ Avatares y marcos por defecto
export const defaultAvatars = ['avataaars0.png', 'avataaars1.png'];
export const defaultFrames = ['frame1.png', 'frame_silver'];

export interface UserStats {
  uid: string;
  nick: string;
  avatar?: string;
  frame?: string;
  unlockedFrames?: string[];
  unlockedAvatars?: string[];
  coins: number;
  streak: number;
  bestStreak?: number;
  level: number;
  totalEarned: number;
  lastPlayed: Timestamp | null;
  xp: number;
  profileLevel: number;
  lastLevelNotified: number;
  // Campos adicionales para gestión de inicio de sesión diaria
  lastLoginDate?: string; // Fecha del último inicio de sesión en formato 'YYYY-MM-DD'
  loginStreak?: number; // Racha de días consecutivos de inicio de sesión
  claimedToday?: boolean; // Si el usuario ha reclamado su recompensa diaria hoy
}

interface UseUserStatsReturn {
  uid: string | null;
  stats: UserStats | null;
  updateStats: (newData: Partial<UserStats>) => Promise<void>;
  loading: boolean;
  reloadStats: () => Promise<void>;
}

export function useUserStats(): UseUserStatsReturn {
  const [uid, setUid] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setUid(user.uid);
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          const loadedStats: UserStats = {
            uid: user.uid,
            nick: data.nick ?? 'Jugador',
            avatar: data.avatar ?? 'avataaars17.png',
            frame: data.frame ?? 'frame1.png',
            unlockedAvatars: data.unlockedAvatars ?? [...defaultAvatars],
            unlockedFrames: data.unlockedFrames ?? [...defaultFrames],
            coins: data.coins ?? 0,
            streak: data.streak ?? 0,
            bestStreak: data.bestStreak ?? 0,
            level: data.level ?? 1,
            totalEarned: data.totalEarned ?? 0,
            lastPlayed: data.lastPlayed ?? null,
            xp: data.xp ?? 1,
            profileLevel: data.profileLevel ?? 1,
            lastLevelNotified: data.lastLevelNotified ?? 1,
          };

          // ✅ Mostrar mensaje de subida de nivel solo una vez
          if (loadedStats.level > loadedStats.lastLevelNotified) {
            Alert.alert('🎉 ¡Nivel alcanzado!', `Has subido al nivel ${loadedStats.level}`);
            await updateDoc(ref, { lastLevelNotified: loadedStats.level });
            loadedStats.lastLevelNotified = loadedStats.level;
          }

          setStats(loadedStats);
        } else {
          const defaultStats: UserStats = {
            uid: user.uid,
            nick: user.displayName ?? 'Jugador',
            coins: 50,
            streak: 0,
            bestStreak: 0,
            level: 1,
            totalEarned: 0,
            lastPlayed: null,
            xp: 1,
            profileLevel: 1,
            avatar: 'avataaars17.png',
            frame: 'frame1.png',
            unlockedAvatars: [...defaultAvatars],
            unlockedFrames: [...defaultFrames],
            lastLevelNotified: 1,
            lastLoginDate: '2025-10-16',
            loginStreak: 1,
            claimedToday: false,
          };
          await setDoc(ref, {
            ...defaultStats,
            lastPlayed: serverTimestamp(),
          });
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

  const reloadStats = async () => {
    if (!uid) return;
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      const reloadedStats: UserStats = {
        uid: uid,
        nick: data.nick ?? 'Jugador',
        avatar: data.avatar ?? 'avataaars17.png',
        frame: data.frame ?? 'frame1.png',
        unlockedAvatars: data.unlockedAvatars ?? [...defaultAvatars],
        unlockedFrames: data.unlockedFrames ?? [...defaultFrames],
        coins: data.coins ?? 0,
        streak: data.streak ?? 0,
        bestStreak: data.bestStreak ?? 0,
        level: data.level ?? 1,
        totalEarned: data.totalEarned ?? 0,
        lastPlayed: data.lastPlayed ?? null,
        xp: data.xp ?? 1,
        profileLevel: data.profileLevel ?? 1,
        lastLevelNotified: data.lastLevelNotified ?? 1,
      };
      setStats(reloadedStats);
    }
  };

  return { uid, stats, updateStats, loading, reloadStats };
}