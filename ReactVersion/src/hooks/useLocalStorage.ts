import { useState } from 'react';
import type { Hell, Stats } from '../types';

const MAX_ENTRIES = 9;

function loadHells(): Hell[] {
  try {
    const json = localStorage.getItem('hells');
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

function loadStats(): Stats {
  try {
    const json = localStorage.getItem('stats');
    return json ? JSON.parse(json) : { count: 0 };
  } catch {
    return { count: 0 };
  }
}

export function useHellStorage() {
  const [hells, setHells] = useState<Hell[]>(loadHells);
  const [stats, setStats] = useState<Stats>(loadStats);

  function addHell(description: string) {
    setHells((previousHells) => {
      const freshHell: Hell = { description, observed: new Date() };
      const updatedHells = [freshHell, ...previousHells].slice(0, MAX_ENTRIES);
      localStorage.setItem('hells', JSON.stringify(updatedHells));
      return updatedHells;
    });

    setStats((previousStats) => {
      const updatedStats: Stats = { count: previousStats.count + 1 };
      localStorage.setItem('stats', JSON.stringify(updatedStats));
      return updatedStats;
    });
  }

  return { hells, stats, addHell };
}
