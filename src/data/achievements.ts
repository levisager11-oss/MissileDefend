import { AchievementDef } from '../types';

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first_blood', name: 'First Blood', description: 'Destroy your first missile', icon: '🎯',
    check: (_, stats) => stats.totalMissilesDestroyed >= 1
  },
  {
    id: 'combo_5', name: 'Combo Master', description: 'Get a 5x combo', icon: '🔥',
    check: (state) => state.maxCombo >= 5
  },
  {
    id: 'combo_10', name: 'Combo Legend', description: 'Get a 10x combo', icon: '💥',
    check: (state) => state.maxCombo >= 10
  },
  {
    id: 'boss_slayer', name: 'Boss Slayer', description: 'Defeat a boss', icon: '👑',
    check: (_, stats) => stats.totalBossesDefeated >= 1
  },
  {
    id: 'boss_trio', name: 'Triple Threat', description: 'Defeat 3 bosses', icon: '⚔️',
    check: (_, stats) => stats.totalBossesDefeated >= 3
  },
  {
    id: 'zone_2', name: 'Explorer', description: 'Reach Zone 2', icon: '🗺️',
    check: (_, stats) => stats.highestZone >= 2
  },
  {
    id: 'zone_5', name: 'World Traveler', description: 'Reach Zone 5', icon: '🌍',
    check: (_, stats) => stats.highestZone >= 5
  },
  {
    id: 'score_10k', name: 'Big Earner', description: 'Score 10,000 in one run', icon: '💰',
    check: (state) => state.score >= 10000
  },
  {
    id: 'score_100k', name: 'Millionaire', description: 'Score 100,000 in one run', icon: '💎',
    check: (state) => state.score >= 100000
  },
  {
    id: 'perfect_level', name: 'Untouchable', description: 'Complete a level with all cities', icon: '🛡️',
    check: (state) => state.levelComplete && state.cities.filter(c => c.alive).length === 6
  },
  {
    id: 'weapon_master', name: 'Weapon Master', description: 'Use all 3 special weapons', icon: '🔫',
    check: (state) => state.specialWeapons.length >= 3 &&
      state.specialWeapons.every(w => w.maxCharges > 0 && w.charges < w.maxCharges)
  },
  {
    id: 'prestige_1', name: 'Reborn', description: 'Prestige for the first time', icon: '⭐',
    check: (_, stats) => stats.prestigeLevel >= 1
  },
];
