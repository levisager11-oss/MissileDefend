export interface Upgrades {
  blastRadius: number;
  missileSpeed: number;
  extraAmmo: number;
  chainReaction: number;
  armorPlating: number;
  multiShot: number;
  empBurst: number;
  luckyStrike: number;
  autoTurret: number;
  shieldGenerator: number;
  laserWeapon: number;
  swarmWeapon: number;
  mineWeapon: number;
}

export interface UpgradeDefinition {
  key: keyof Upgrades;
  name: string;
  description: string;
  maxLevel: number;
  baseCost: number;
  costScale: number;
  icon: string;
  color: string;
}

export const UPGRADE_DEFS: UpgradeDefinition[] = [
  {
    key: 'blastRadius',
    name: 'Blast Radius',
    description: 'Larger counter-missile explosions',
    maxLevel: 5,
    baseCost: 120,
    costScale: 1.5,
    icon: '💥',
    color: '#ff6644',
  },
  {
    key: 'missileSpeed',
    name: 'Missile Velocity',
    description: 'Faster counter-missiles reach targets quicker',
    maxLevel: 5,
    baseCost: 100,
    costScale: 1.4,
    icon: '🚀',
    color: '#44aaff',
  },
  {
    key: 'extraAmmo',
    name: 'Ammo Cache',
    description: '+3 ammo per battery each wave',
    maxLevel: 5,
    baseCost: 80,
    costScale: 1.3,
    icon: '🔋',
    color: '#88ff44',
  },
  {
    key: 'chainReaction',
    name: 'Chain Reaction',
    description: 'Secondary explosions are larger',
    maxLevel: 5,
    baseCost: 180,
    costScale: 1.6,
    icon: '⛓️',
    color: '#ff9944',
  },
  {
    key: 'luckyStrike',
    name: 'Lucky Strike',
    description: 'Chance for 2x-5x bonus score on kills',
    maxLevel: 5,
    baseCost: 150,
    costScale: 1.4,
    icon: '🍀',
    color: '#ffdd44',
  },
  {
    key: 'multiShot',
    name: 'Multi-Shot',
    description: 'Fire extra missiles per click',
    maxLevel: 3,
    baseCost: 1000,
    costScale: 2.2,
    icon: '🎯',
    color: '#ff44aa',
  },
  {
    key: 'empBurst',
    name: 'EMP Burst',
    description: 'Slow all missiles at wave start',
    maxLevel: 3,
    baseCost: 500,
    costScale: 1.6,
    icon: '⚡',
    color: '#aa88ff',
  },
  {
    key: 'autoTurret',
    name: 'Auto Turret',
    description: 'Auto-fires at nearest threats periodically',
    maxLevel: 3,
    baseCost: 1500,
    costScale: 1.8,
    icon: '🤖',
    color: '#44ffcc',
  },
  {
    key: 'shieldGenerator',
    name: 'Shield Generator',
    description: 'Energy shields absorb hits on cities',
    maxLevel: 3,
    baseCost: 800,
    costScale: 2.0,
    icon: '🛡️',
    color: '#66bbff',
  },
  {
    key: 'armorPlating',
    name: 'City Repair',
    description: 'Rebuild one destroyed city',
    maxLevel: 3,
    baseCost: 300,
    costScale: 2.0,
    icon: '🏗️',
    color: '#44ff88',
  },
  {
    key: 'laserWeapon',
    name: 'Laser Beam',
    description: 'Press 1: Instant beam destroys all in its path',
    maxLevel: 3,
    baseCost: 300,
    costScale: 1.8,
    icon: '🔫',
    color: '#ff4444',
  },
  {
    key: 'swarmWeapon',
    name: 'Missile Swarm',
    description: 'Press 2: Fire 8 missiles in a spread pattern',
    maxLevel: 3,
    baseCost: 250,
    costScale: 1.6,
    icon: '🎆',
    color: '#ff8800',
  },
  {
    key: 'mineWeapon',
    name: 'Area Mine',
    description: 'Press 3: Place proximity mine that auto-detonates',
    maxLevel: 3,
    baseCost: 200,
    costScale: 1.5,
    icon: '💣',
    color: '#ff44ff',
  },
];

export function getUpgradeCost(def: UpgradeDefinition, currentLevel: number): number {
  return Math.floor(def.baseCost * Math.pow(def.costScale, currentLevel));
}
