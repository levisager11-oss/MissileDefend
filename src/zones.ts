export interface ZoneDefinition {
  id: number;
  name: string;
  subtitle: string;
  levels: [number, number]; // inclusive range
  skyColors: [string, string, string];
  groundColors: [string, string, string];
  groundStrokeColor: string;
  buildingColors: [string, string];
  windowColor: string;
  missileTrailColor: string;
  starCount: number;
  hazardDescription: string;
  // Unique enemy flags
  hasHeatSeekers: boolean;
  hasBombers: boolean;
  hasBlizzard: boolean;
  hasDecoys: boolean;
  hasAsteroids: boolean;
  hasEmpEnemies: boolean;
  speedMultiplier: number;
  spawnMultiplier: number;
}

export const ZONES: ZoneDefinition[] = [
  {
    id: 1,
    name: 'GREEN VALLEY',
    subtitle: 'The war begins...',
    levels: [1, 5],
    skyColors: ['#000011', '#0a0a2e', '#1a0a2e'],
    groundColors: ['#2a5a1a', '#1e4a12', '#0e2a08'],
    groundStrokeColor: '#3a7a2a',
    buildingColors: ['#4488cc', '#2266aa'],
    windowColor: '#ffee88',
    missileTrailColor: 'rgba(255, 100, 50, 0.9)',
    starCount: 120,
    hazardDescription: 'Standard combat zone',
    hasHeatSeekers: false,
    hasBombers: false,
    hasBlizzard: false,
    hasDecoys: false,
    hasAsteroids: false,
    hasEmpEnemies: false,
    speedMultiplier: 1.0,
    spawnMultiplier: 1.0,
  },
  {
    id: 2,
    name: 'DESERT OUTPOST',
    subtitle: 'The heat is rising...',
    levels: [6, 10],
    skyColors: ['#1a0800', '#2a1400', '#3a1800'],
    groundColors: ['#8a6a30', '#6a5020', '#4a3810'],
    groundStrokeColor: '#aa8844',
    buildingColors: ['#bb8844', '#886633'],
    windowColor: '#ffcc66',
    missileTrailColor: 'rgba(255, 150, 30, 0.9)',
    starCount: 80,
    hazardDescription: 'Heat-seeking missiles track your cities!',
    hasHeatSeekers: true,
    hasBombers: false,
    hasBlizzard: false,
    hasDecoys: false,
    hasAsteroids: false,
    hasEmpEnemies: false,
    speedMultiplier: 1.15,
    spawnMultiplier: 1.1,
  },
  {
    id: 3,
    name: 'ARCTIC BASE',
    subtitle: 'Visibility is limited...',
    levels: [11, 15],
    skyColors: ['#0a1520', '#122838', '#1a3848'],
    groundColors: ['#aabbcc', '#8899aa', '#667788'],
    groundStrokeColor: '#bbddee',
    buildingColors: ['#6688aa', '#446688'],
    windowColor: '#aaeeff',
    missileTrailColor: 'rgba(180, 200, 255, 0.9)',
    starCount: 60,
    hazardDescription: 'Bombers drop payloads! Blizzard reduces visibility!',
    hasHeatSeekers: true,
    hasBombers: true,
    hasBlizzard: true,
    hasDecoys: false,
    hasAsteroids: false,
    hasEmpEnemies: false,
    speedMultiplier: 1.25,
    spawnMultiplier: 1.2,
  },
  {
    id: 4,
    name: 'VOLCANIC FORTRESS',
    subtitle: 'The ground trembles...',
    levels: [16, 20],
    skyColors: ['#1a0505', '#2a0a0a', '#3a1010'],
    groundColors: ['#4a2a1a', '#3a1a0a', '#2a1005'],
    groundStrokeColor: '#ff4400',
    buildingColors: ['#885544', '#664433'],
    windowColor: '#ff8844',
    missileTrailColor: 'rgba(255, 80, 20, 0.9)',
    starCount: 40,
    hazardDescription: 'Decoy missiles waste your ammo! Eruptions shake the screen!',
    hasHeatSeekers: true,
    hasBombers: true,
    hasBlizzard: false,
    hasDecoys: true,
    hasAsteroids: false,
    hasEmpEnemies: false,
    speedMultiplier: 1.4,
    spawnMultiplier: 1.3,
  },
  {
    id: 5,
    name: 'SPACE STATION',
    subtitle: 'Final frontier...',
    levels: [21, 999],
    skyColors: ['#020208', '#050510', '#080818'],
    groundColors: ['#334455', '#2a3a4a', '#1a2a3a'],
    groundStrokeColor: '#4488ff',
    buildingColors: ['#5577aa', '#3355aa'],
    windowColor: '#44ffff',
    missileTrailColor: 'rgba(100, 255, 200, 0.9)',
    starCount: 200,
    hazardDescription: 'Asteroids! EMP missiles disable your batteries! All threats combined!',
    hasHeatSeekers: true,
    hasBombers: true,
    hasBlizzard: false,
    hasDecoys: true,
    hasAsteroids: true,
    hasEmpEnemies: true,
    speedMultiplier: 1.5,
    spawnMultiplier: 1.4,
  },
];

export function getZone(level: number): ZoneDefinition {
  for (const z of ZONES) {
    if (level >= z.levels[0] && level <= z.levels[1]) return z;
  }
  return ZONES[ZONES.length - 1];
}

export function getZoneIndex(level: number): number {
  for (let i = 0; i < ZONES.length; i++) {
    if (level >= ZONES[i].levels[0] && level <= ZONES[i].levels[1]) return i;
  }
  return ZONES.length - 1;
}
