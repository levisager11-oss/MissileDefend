// ─── Types ──────────────────────────────────────────────────────────────
export interface City {
  x: number;
  alive: boolean;
}

export interface MissileBattery {
  x: number;
  y: number;
  ammo: number;
  maxAmmo: number;
  disabled: number; // frames of EMP disable
}

export interface IncomingMissile {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  destroyed: boolean;
  isMirv: boolean;
  mirvSplit: boolean;
  mirvSplitProgress: number;
  frozen: boolean;
  frozenTimer: number;
  isHeatSeeker: boolean;
  isDecoy: boolean;
  isEmpMissile: boolean;
}

export interface CounterMissile {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  arrived: boolean;
}

export interface Explosion {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  growing: boolean;
  alpha: number;
  isPlayerExplosion: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface Bomber {
  id: number;
  x: number;
  y: number;
  speed: number;
  direction: number; // 1 or -1
  dropsRemaining: number;
  dropTimer: number;
  dropInterval: number;
}

export interface Asteroid {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  rotSpeed: number;
  hp: number;
}

export interface Boss {
  id: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  type: 'mothership' | 'fortress' | 'swarm_queen';
  phase: number;
  attackTimer: number;
  moveDir: number;
  speed: number;
  flashTimer: number;
  spawnedMinions: number;
}

export interface Mine {
  id: number;
  x: number;
  y: number;
  radius: number;
  life: number;
  maxLife: number;
  armed: boolean;
}

export interface LaserBeam {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  life: number;
  maxLife: number;
}

export type WeaponType = 'laser' | 'swarm' | 'mine';

export interface SpecialWeapon {
  type: WeaponType;
  charges: number;
  maxCharges: number;
  cooldownTimer: number;
}

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

export interface Building {
  id: string;
  name: string;
  baseCost: number;
  baseCps: number; // Credits per second
  description: string;
  icon: string;
}

export interface GameState {
  credits: number; // Replaces score as currency
  score: number;
  cps: number;
  buildings: Record<string, number>;
  level: number;
  cities: City[];
  batteries: MissileBattery[];
  incomingMissiles: IncomingMissile[];
  counterMissiles: CounterMissile[];
  explosions: Explosion[];
  particles: Particle[];
  bombers: Bomber[];
  asteroids: Asteroid[];
  gameOver: boolean;
  phase: 'title' | 'playing' | 'shop' | 'gameover' | 'zone_intro' | 'prestige_shop' | 'level_complete';
  levelComplete: boolean;
  levelTransitionTimer: number;
  missileSpawnTimer: number;
  missilesSpawnedThisLevel: number;
  totalMissilesThisLevel: number;
  cursorX: number;
  cursorY: number;
  stars: { x: number; y: number; brightness: number; size: number }[];
  screenShake: number;
  bonusText: { text: string; x: number; y: number; life: number; color: string }[];
  upgrades: Upgrades;
  shopHover: number;
  autoTurretTimer: number;
  shieldHits: number[];
  empActive: number;
  totalSpent: number;
  blizzardAlpha: number;
  blizzardParticles: { x: number; y: number; vx: number; vy: number; size: number }[];
  eruptionTimer: number;
  eruptionActive: number;
  asteroidSpawnTimer: number;
  bomberSpawnTimer: number;
  zoneIntroTimer: number;
  previousZoneId: number;
  highScore: number;
  autoMode: boolean;
  // Boss
  boss: Boss | null;
  bossDefeated: boolean;
  isBossLevel: boolean;
  // Special weapons
  specialWeapons: SpecialWeapon[];
  selectedWeapon: number;
  mines: Mine[];
  laserBeams: LaserBeam[];
  // Combo
  comboCount: number;
  comboTimer: number;
  comboMultiplier: number;
  maxCombo: number;
  // Run tracking
  runMissilesDestroyed: number;
  runBossesDefeated: number;
  achievementToasts: { text: string; icon: string; timer: number }[];
  weaponsUsedThisLevel: Set<string>;
}

export interface PrestigeBonuses {
  startingScore: number;   // +500 per level, max 5
  bonusAmmo: number;       // +2 ammo per level, max 3
  toughCities: number;     // +1 hit per level, max 2
  headStart: number;       // start at level 2, max 1
  luckyStart: number;      // start with lucky strike 1, max 1
}

export interface PersistentStats {
  totalGames: number;
  totalScore: number;
  highScore: number;
  highestLevel: number;
  highestZone: number;
  totalMissilesDestroyed: number;
  totalBossesDefeated: number;
  bestCombo: number;
  totalCitiesSaved: number;
  prestigeLevel: number;
  prestigePoints: number;
  prestigeBonuses: PrestigeBonuses;
  achievements: string[];
}

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (state: GameState, stats: PersistentStats) => boolean;
}

export interface PrestigeUpgradeDef {
  key: keyof PrestigeBonuses;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  icon: string;
}

export interface SavePayload {
  v: number;
  state: GameState;
}
