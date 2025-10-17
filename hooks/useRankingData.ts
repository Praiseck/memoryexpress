import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export interface RankingEntry {
  uid: string;
  nick: string;
  profileLevel: number;
  bestStreak: number;
  avatar: string;
}

interface UseRankingDataReturn {
  ranking: RankingEntry[] | null;
  loading: boolean;
}

export function useRankingData(): UseRankingDataReturn {
  const [ranking, setRanking] = useState<RankingEntry[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRanking = async (): Promise<void> => {
      try {
        const q = query(collection(db, 'users'));
        const snapshot = await getDocs(q);

        const rawData: RankingEntry[] = snapshot.docs.map((doc) => {
          const data: DocumentData = doc.data();
          return {
            uid: doc.id,
            nick: data.nick ?? 'Sin nombre',
            profileLevel: data.profileLevel ?? 1,
            bestStreak: data.bestStreak ?? 0,
            avatar: data.avatar ?? 'avataaars17.png',
          };
        });

        const uniqueRanking = Array.from(
          new Map(rawData.map((item) => [item.uid, item])).values()
        );

        setRanking(uniqueRanking);
      } catch (error: unknown) {
        console.error('Error al cargar ranking:', error);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return { ranking, loading };
}