export interface PrestigeBonuses {
  startingScore: number;   // +500 per level, max 5
  bonusAmmo: number;       // +2 ammo per level, max 3
  toughCities: number;     // +1 hit per level, max 2
  headStart: number;       // start at level 2, max 1
  luckyStart: number;      // start with lucky strike 1, max 1
}

export interface PrestigeUpgradeDef {
  key: keyof PrestigeBonuses;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  icon: string;
}

export const PRESTIGE_UPGRADE_DEFS: PrestigeUpgradeDef[] = [
  { key: 'startingScore', name: 'Seed Fund', description: '+500 starting score', cost: 3, maxLevel: 5, icon: '💰' },
  { key: 'bonusAmmo', name: 'Ammo Depot', description: '+2 starting ammo', cost: 2, maxLevel: 3, icon: '🎯' },
  { key: 'toughCities', name: 'Reinforced', description: 'Cities take +1 hit', cost: 5, maxLevel: 2, icon: '🏗️' },
  { key: 'headStart', name: 'Veteran', description: 'Start at Level 2', cost: 4, maxLevel: 1, icon: '🚀' },
  { key: 'luckyStart', name: 'Born Lucky', description: 'Start with Lucky Strike', cost: 3, maxLevel: 1, icon: '🍀' },
];

export function initPrestigeBonuses(): PrestigeBonuses {
  return { startingScore: 0, bonusAmmo: 0, toughCities: 0, headStart: 0, luckyStart: 0 };
}
