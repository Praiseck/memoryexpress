import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { useUserStats } from './useUserStats';

type MissionKey = 'play' | 'streak' | 'video';

interface Mission {
  key: MissionKey;
  label: string;
  conditionMet: boolean;
  reward: number;
  claimed: boolean;
}

export function useDailyMissions() {
  const { stats, updateStats } = useUserStats();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stats?.uid) return;

    const today = dayjs().format('YYYY-MM-DD');
    const completed = stats.missionsCompletedToday ?? [];

    const missionList: Mission[] = [
      {
        key: 'play',
        label: 'Jugar 1 partida',
        conditionMet: (stats.gamesPlayedToday ?? 0) >= 1,
        reward: 5,
        claimed: completed.includes('play'),
      },
      {
        key: 'streak',
        label: 'Acierta 5 emojis seguidos',
        conditionMet: (stats.bestStreakToday ?? 0) >= 5,
        reward: 10,
        claimed: completed.includes('streak'),
      },
      {
        key: 'video',
        label: 'Ver 1 video de recompensa',
        conditionMet: (stats.videosWatchedToday ?? 0) >= 1,
        reward: 15,
        claimed: completed.includes('video'),
      },
    ];

    setMissions(missionList);

    const allDone = missionList.every((m) => m.conditionMet && m.claimed);
    setAllCompleted(allDone);
    setLoading(false);
  }, [stats]);

  const claimMission = async (key: MissionKey) => {
    if (!stats?.uid) return;

    const mission = missions.find((m) => m.key === key);
    if (!mission || !mission.conditionMet || mission.claimed) return;

    const newCoins = (stats.coins ?? 0) + mission.reward;
    const updatedCompleted = [...(stats.missionsCompletedToday ?? []), key];

    await updateStats({
      coins: newCoins,
      missionsCompletedToday: updatedCompleted,
    });

    // Si ahora se completaron todas, registrar el día
    const allNowCompleted = missions.every((m) =>
      m.key === key ? true : m.conditionMet && m.claimed
    );

    if (allNowCompleted) {
      const today = dayjs().format('YYYY-MM-DD');
      const updatedDays = [...(stats.missionDaysCompleted ?? []), today];
      await updateDoc(doc(db, 'users', stats.uid), {
        missionDaysCompleted: updatedDays,
        weeklyRewardClaimed: false,
      });
    }
  };

  return { missions, claimMission, allCompleted, loading };
}