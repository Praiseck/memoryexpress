import dayjs from 'dayjs';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { useUserStats } from './useUserStats';

export function useDailyReward() {
  const { stats, updateStats } = useUserStats();
  const [canClaim, setCanClaim] = useState(false);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stats?.uid) return;

    const check = async () => {
      const ref = doc(db, 'users', stats.uid);
      const snap = await getDoc(ref);
      const data = snap.data();
      const today = dayjs().format('YYYY-MM-DD');
      if (!data) {
        setStreak(0);
        setCanClaim(false);
        setLoading(false);
        return;
      }

      const lastLogin = data.lastLoginDate ?? '';
      const claimed = data.claimedToday ?? false;

      const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      const newStreak = lastLogin === yesterday ? (data.loginStreak ?? 0) + 1 : 1;

      setStreak(newStreak);
      setCanClaim(!claimed || lastLogin !== today);
      setLoading(false);
    };

    check();
  }, [stats?.uid]);

  const claimReward = async () => {
    if (!stats?.uid || !canClaim) return;

    const today = dayjs().format('YYYY-MM-DD');
    const reward = streak >= 5 ? 20 : 5;

    await updateStats({
      coins: (stats.coins ?? 0) + reward,
    });

    await updateDoc(doc(db, 'users', stats.uid), {
      lastLoginDate: today,
      loginStreak: streak,
      claimedToday: true,
    });

    setCanClaim(false);
  };

  return { canClaim, claimReward, streak, loading };
}