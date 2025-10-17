import { useEffect, useRef, useState } from 'react';

export function useProfileLevelUp(currentLevel: number): boolean {
  const previousLevel = useRef<number>(currentLevel);
  const [levelUp, setLevelUp] = useState<boolean>(false);

  useEffect(() => {
    if (currentLevel > previousLevel.current) {
      setLevelUp(true);
      previousLevel.current = currentLevel;

      const timeout = setTimeout(() => setLevelUp(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [currentLevel]);

  return levelUp;
}