import { useRef, useEffect, useCallback, useState } from 'react';
import { ZoneDefinition, ZONES, getZone, getZoneIndex } from './zones';
import { Upgrades, UpgradeDefinition, UPGRADE_DEFS, getUpgradeCost } from './data/upgrades';

// ─── Types ──────────────────────────────────────────────────────────────
interface City {
  x: number;
  alive: boolean;
}

interface MissileBattery {
  x: number;
  y: number;
  ammo: number;
  maxAmmo: number;
  disabled: number; // frames of EMP disable
}

interface IncomingMissile {
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

interface CounterMissile {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  arrived: boolean;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  growing: boolean;
  alpha: number;
  isPlayerExplosion: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Bomber {
  id: number;
  x: number;
  y: number;
  speed: number;
  direction: number; // 1 or -1
  dropsRemaining: number;
  dropTimer: number;
  dropInterval: number;
}

interface Asteroid {
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

interface Boss {
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

interface Mine {
  id: number;
  x: number;
  y: number;
  radius: number;
  life: number;
  maxLife: number;
  armed: boolean;
}

interface LaserBeam {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  life: number;
  maxLife: number;
}

type WeaponType = 'laser' | 'swarm' | 'mine';

interface SpecialWeapon {
  type: WeaponType;
  charges: number;
  maxCharges: number;
  cooldownTimer: number;
}

interface Building {
  id: string;
  name: string;
  baseCost: number;
  baseCps: number; // Credits per second
  description: string;
  icon: string;
}

const BUILDING_DEFS: Building[] = [
  { id: 'solar_farm', name: 'Solar Farm', baseCost: 25, baseCps: 0.4, description: 'Harvests energy from the sun.', icon: '☀️' },
  { id: 'scrap_yard', name: 'Scrap Yard', baseCost: 250, baseCps: 4, description: 'Recycles debris into credits.', icon: '♻️' },
  { id: 'munitions_factory', name: 'Munitions Factory', baseCost: 2500, baseCps: 25, description: 'Produces and sells ammo.', icon: '🏭' },
  { id: 'orbital_mine', name: 'Orbital Mine', baseCost: 15000, baseCps: 120, description: 'Automated mining in orbit.', icon: '⛏️' },
  { id: 'defense_contract', name: 'Defense Contract', baseCost: 200000, baseCps: 1000, description: 'Government funding for defense.', icon: '📜' },
  { id: 'ai_core', name: 'AI Core', baseCost: 2500000, baseCps: 6000, description: 'High-frequency trading algorithms.', icon: '🧠' },
];

interface GameState {
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

// ─── Progression System ─────────────────────────────────────────────────
interface PrestigeBonuses {
  startingScore: number;   // +500 per level, max 5
  bonusAmmo: number;       // +2 ammo per level, max 3
  toughCities: number;     // +1 hit per level, max 2
  headStart: number;       // start at level 2, max 1
  luckyStart: number;      // start with lucky strike 1, max 1
}

interface PersistentStats {
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

interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (state: GameState, stats: PersistentStats) => boolean;
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
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

interface PrestigeUpgradeDef {
  key: keyof PrestigeBonuses;
  name: string;
  description: string;
  cost: number;
  maxLevel: number;
  icon: string;
}

const PRESTIGE_UPGRADE_DEFS: PrestigeUpgradeDef[] = [
  { key: 'startingScore', name: 'Seed Fund', description: '+500 starting score', cost: 3, maxLevel: 5, icon: '💰' },
  { key: 'bonusAmmo', name: 'Ammo Depot', description: '+2 starting ammo', cost: 2, maxLevel: 3, icon: '🎯' },
  { key: 'toughCities', name: 'Reinforced', description: 'Cities take +1 hit', cost: 5, maxLevel: 2, icon: '🏗️' },
  { key: 'headStart', name: 'Veteran', description: 'Start at Level 2', cost: 4, maxLevel: 1, icon: '🚀' },
  { key: 'luckyStart', name: 'Born Lucky', description: 'Start with Lucky Strike', cost: 3, maxLevel: 1, icon: '🍀' },
];

const STATS_KEY = 'missileDefendStats';

function initPrestigeBonuses(): PrestigeBonuses {
  return { startingScore: 0, bonusAmmo: 0, toughCities: 0, headStart: 0, luckyStart: 0 };
}

function initPersistentStats(): PersistentStats {
  return {
    totalGames: 0, totalScore: 0, highScore: 0, highestLevel: 0,
    highestZone: 0, totalMissilesDestroyed: 0, totalBossesDefeated: 0,
    bestCombo: 0, totalCitiesSaved: 0, prestigeLevel: 0, prestigePoints: 0,
    prestigeBonuses: initPrestigeBonuses(), achievements: [],
  };
}

function loadStats(): PersistentStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return initPersistentStats();
    const parsed = JSON.parse(raw);
    return { ...initPersistentStats(), ...parsed, prestigeBonuses: { ...initPrestigeBonuses(), ...(parsed.prestigeBonuses || {}) } };
  } catch { return initPersistentStats(); }
}

function saveStats(stats: PersistentStats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch { /* noop */ }
}

function checkAchievements(state: GameState, stats: PersistentStats): string[] {
  const newlyUnlocked: string[] = [];
  ACHIEVEMENT_DEFS.forEach(def => {
    if (!stats.achievements.includes(def.id) && def.check(state, stats)) {
      newlyUnlocked.push(def.id);
    }
  });
  return newlyUnlocked;
}

function calcPrestigePoints(state: GameState): number {
  return Math.floor(state.score / 1000) + state.level * 2;
}

// ─── Constants ──────────────────────────────────────────────────────────
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 640;
const GROUND_HEIGHT = 60;
const CITY_WIDTH = 40;
const CITY_HEIGHT = 30;
const BATTERY_WIDTH = 30;
const BASE_COUNTER_MISSILE_SPEED = 6;
const BASE_EXPLOSION_RADIUS = 50;
const EXPLOSION_GROW_SPEED = 1.5;
const EXPLOSION_SHRINK_SPEED = 0.6;
const BASE_AMMO = 10;

let nextId = 0;
const getId = () => ++nextId;

// ─── Initialization ────────────────────────────────────────────────────
function initStars(count: number): { x: number; y: number; brightness: number; size: number }[] {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * (CANVAS_HEIGHT - GROUND_HEIGHT - 80),
      brightness: Math.random() * 0.7 + 0.3,
      size: Math.random() < 0.1 ? 2.5 : Math.random() < 0.3 ? 1.8 : 1.2,
    });
  }
  return stars;
}

function initCities(): City[] {
  const positions = [120, 200, 280, 600, 680, 760];
  return positions.map((x) => ({ x, alive: true }));
}

function initBatteries(): MissileBattery[] {
  return [
    { x: 40, y: CANVAS_HEIGHT - GROUND_HEIGHT, ammo: BASE_AMMO, maxAmmo: BASE_AMMO, disabled: 0 },
    { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - GROUND_HEIGHT, ammo: BASE_AMMO, maxAmmo: BASE_AMMO, disabled: 0 },
    { x: CANVAS_WIDTH - 40, y: CANVAS_HEIGHT - GROUND_HEIGHT, ammo: BASE_AMMO, maxAmmo: BASE_AMMO, disabled: 0 },
  ];
}

function initUpgrades(): Upgrades {
  return {
    blastRadius: 0,
    missileSpeed: 0,
    extraAmmo: 0,
    chainReaction: 0,
    armorPlating: 0,
    multiShot: 0,
    empBurst: 0,
    luckyStrike: 0,
    autoTurret: 0,
    shieldGenerator: 0,
    laserWeapon: 0,
    swarmWeapon: 0,
    mineWeapon: 0,
  };
}

function initSpecialWeapons(upgrades: Upgrades): SpecialWeapon[] {
  return [
    { type: 'laser' as WeaponType, charges: upgrades.laserWeapon, maxCharges: upgrades.laserWeapon, cooldownTimer: 0 },
    { type: 'swarm' as WeaponType, charges: upgrades.swarmWeapon * 2, maxCharges: upgrades.swarmWeapon * 2, cooldownTimer: 0 },
    { type: 'mine' as WeaponType, charges: upgrades.mineWeapon * 3, maxCharges: upgrades.mineWeapon * 3, cooldownTimer: 0 },
  ];
}

function initGameState(prestige?: PrestigeBonuses): GameState {
  const upgrades = initUpgrades();
  const startLevel = (prestige && prestige.headStart > 0) ? 2 : 1;
  if (prestige && prestige.luckyStart > 0) upgrades.luckyStrike = Math.max(upgrades.luckyStrike, 1);
  const bonusAmmo = prestige ? prestige.bonusAmmo * 2 : 0;
  const maxAmmo = BASE_AMMO + bonusAmmo;

  // Initialize buildings
  const buildings: Record<string, number> = {};
  BUILDING_DEFS.forEach(b => buildings[b.id] = 0);

  return {
    credits: 0,
    score: prestige ? prestige.startingScore * 500 : 0,
    cps: 0,
    buildings,
    level: startLevel,
    cities: initCities(),
    batteries: initBatteries().map(b => ({ ...b, ammo: maxAmmo, maxAmmo })),
    incomingMissiles: [],
    counterMissiles: [],
    explosions: [],
    particles: [],
    bombers: [],
    asteroids: [],
    gameOver: false,
    phase: 'title',
    levelComplete: false,
    levelTransitionTimer: 0,
    missileSpawnTimer: 0,
    missilesSpawnedThisLevel: 0,
    totalMissilesThisLevel: 10,
    cursorX: CANVAS_WIDTH / 2,
    cursorY: CANVAS_HEIGHT / 2,
    stars: initStars(120),
    screenShake: 0,
    bonusText: [],
    upgrades,
    shopHover: -1,
    autoTurretTimer: 0,
    shieldHits: [0, 0, 0, 0, 0, 0],
    empActive: 0,
    totalSpent: 0,
    blizzardAlpha: 0,
    blizzardParticles: [],
    eruptionTimer: 0,
    eruptionActive: 0,
    asteroidSpawnTimer: 0,
    bomberSpawnTimer: 0,
    zoneIntroTimer: 0,
    previousZoneId: 0,
    highScore: 0,
    autoMode: false,
    boss: null,
    bossDefeated: false,
    isBossLevel: false,
    specialWeapons: initSpecialWeapons(upgrades),
    selectedWeapon: -1,
    mines: [],
    laserBeams: [],
    comboCount: 0,
    comboTimer: 0,
    comboMultiplier: 1,
    maxCombo: 0,
    runMissilesDestroyed: 0,
    runBossesDefeated: 0,
    achievementToasts: [],
    weaponsUsedThisLevel: new Set<string>(),
  };
}

function getLevelConfig(level: number) {
  const zone = getZone(level);
  const baseMissiles = Math.min(8 + level * 3, 50);
  const totalMissiles = Math.floor(baseMissiles * zone.spawnMultiplier);
  const missileSpeed = Math.min(0.3 + level * 0.08, 2.2) * zone.speedMultiplier;
  const spawnInterval = Math.max(80 - level * 4, 12);
  const mirvChance = Math.min((level - 3) * 0.08, 0.45);
  const clusterChance = Math.min((level - 2) * 0.05, 0.35);
  const heatSeekerChance = zone.hasHeatSeekers ? Math.min(0.1 + (level - zone.levels[0]) * 0.06, 0.4) : 0;
  const decoyChance = zone.hasDecoys ? Math.min(0.08 + (level - zone.levels[0]) * 0.04, 0.25) : 0;
  const empMissileChance = zone.hasEmpEnemies ? Math.min(0.05 + (level - zone.levels[0]) * 0.03, 0.2) : 0;
  return { totalMissiles, missileSpeed, spawnInterval, mirvChance, clusterChance, heatSeekerChance, decoyChance, empMissileChance };
}

// ─── Computed values from upgrades ─────────────────────────────────────
function getExplosionRadius(upgrades: Upgrades): number {
  return BASE_EXPLOSION_RADIUS + upgrades.blastRadius * 10;
}

function getCounterMissileSpeed(upgrades: Upgrades): number {
  return BASE_COUNTER_MISSILE_SPEED + upgrades.missileSpeed * 1.2;
}

function getAmmoPerBattery(upgrades: Upgrades): number {
  return BASE_AMMO + upgrades.extraAmmo * 3;
}

function getChainRadius(upgrades: Upgrades): number {
  return 0.6 + upgrades.chainReaction * 0.12;
}

function getMultiShotCount(upgrades: Upgrades): number {
  return 1 + upgrades.multiShot;
}

function getEmpDuration(upgrades: Upgrades): number {
  return upgrades.empBurst * 180;
}

function getAutoTurretInterval(upgrades: Upgrades): number {
  if (upgrades.autoTurret === 0) return 0;
  return Math.max(180 - upgrades.autoTurret * 40, 60);
}

function getShieldMaxHits(upgrades: Upgrades): number {
  return upgrades.shieldGenerator;
}

function getLuckyChance(upgrades: Upgrades): number {
  return upgrades.luckyStrike * 0.08;
}

// ─── Save/Load Helpers ─────────────────────────────────────────────────
interface SavePayload {
  v: number;
  state: GameState;
}

const SAVE_VERSION = 1;

function encodeSave(state: GameState): string {
  const payload: SavePayload = { v: SAVE_VERSION, state };
  return btoa(JSON.stringify(payload));
}

function decodeSave(code: string): GameState | null {
  try {
    const json = atob(code.trim());
    const payload = JSON.parse(json) as SavePayload;
    if (!payload || payload.v !== SAVE_VERSION || !payload.state) return null;
    return payload.state;
  } catch {
    return null;
  }
}

function syncNextId(state: GameState) {
  const allIds = [
    ...state.incomingMissiles.map((m) => m.id),
    ...state.counterMissiles.map((m) => m.id),
    ...state.explosions.map((e) => e.id),
    ...state.bombers.map((b) => b.id),
    ...state.asteroids.map((a) => a.id),
  ];
  const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
  nextId = Math.max(nextId, maxId + 1);
}

// ─── Game Logic ─────────────────────────────────────────────────────────
function spawnMissile(state: GameState): IncomingMissile {
  const config = getLevelConfig(state.level);
  const targets = [
    ...state.cities.filter((c) => c.alive).map((c) => c.x),
    ...state.batteries.map((b) => b.x),
  ];
  const targetX = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : CANVAS_WIDTH / 2;

  const isMirv = Math.random() < config.mirvChance;
  const isHeatSeeker = !isMirv && Math.random() < config.heatSeekerChance;
  const isDecoy = !isMirv && !isHeatSeeker && Math.random() < config.decoyChance;
  const isEmpMissile = !isMirv && !isHeatSeeker && !isDecoy && Math.random() < config.empMissileChance;

  return {
    id: getId(),
    startX: Math.random() * (CANVAS_WIDTH - 100) + 50,
    startY: -10,
    targetX,
    targetY: CANVAS_HEIGHT - GROUND_HEIGHT,
    progress: 0,
    speed: config.missileSpeed * (0.8 + Math.random() * 0.4) * (isDecoy ? 1.3 : 1.0),
    destroyed: false,
    isMirv,
    mirvSplit: false,
    mirvSplitProgress: 0.4 + Math.random() * 0.2,
    frozen: false,
    frozenTimer: 0,
    isHeatSeeker,
    isDecoy,
    isEmpMissile,
  };
}

function spawnParticles(x: number, y: number, count: number, color: string, particles: Particle[]) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 30 + Math.random() * 30,
      color,
      size: Math.random() * 3 + 1,
    });
  }
}

function findClosestBattery(state: GameState, targetX: number, targetY: number): number {
  let closest = -1;
  let minDist = Infinity;
  state.batteries.forEach((b, i) => {
    const hasAmmo = state.autoMode || b.ammo > 0;
    if (hasAmmo && b.disabled <= 0) {
      const dist = Math.hypot(b.x - targetX, b.y - targetY);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
  });
  return closest;
}

function fireCounterMissile(state: GameState, x: number, y: number, consumeAmmo: boolean = true): boolean {
  const batteryIdx = findClosestBattery(state, x, y);
  if (batteryIdx === -1) return false;

  const battery = state.batteries[batteryIdx];
  if (!state.autoMode && consumeAmmo) {
    state.batteries[batteryIdx] = { ...battery, ammo: battery.ammo - 1 };
  }
  state.counterMissiles.push({
    id: getId(),
    startX: battery.x,
    startY: battery.y - 18,
    targetX: x,
    targetY: y,
    progress: 0,
    speed: getCounterMissileSpeed(state.upgrades),
    arrived: false,
  });
  return true;
}

function createBoss(level: number): Boss {
  const types: ('mothership' | 'fortress' | 'swarm_queen')[] = ['mothership', 'fortress', 'swarm_queen'];
  const typeIndex = Math.floor((level / 5 - 1) % 3);
  const type = types[typeIndex];
  const baseHp = 150 + level * 30;
  return {
    id: getId(),
    x: CANVAS_WIDTH / 2,
    y: 60,
    hp: baseHp,
    maxHp: baseHp,
    type,
    phase: 0,
    attackTimer: 120,
    moveDir: 1,
    speed: 0.8 + level * 0.05,
    flashTimer: 0,
    spawnedMinions: 0,
  };
}

function updateGame(state: GameState): GameState {
  const s = { ...state }; // Create a mutable copy of the state

  // Calculate CPS
  let cps = 0;
  BUILDING_DEFS.forEach(def => {
    const count = s.buildings[def.id] || 0;
    cps += count * def.baseCps;
  });
  s.cps = cps;

  // Apply passive income
  if (s.phase === 'playing' || s.phase === 'level_complete') {
    const incomePerFrame = cps / 60;
    s.credits += incomePerFrame;
    // We can also add to score if score tracks "lifetime earnings" in this run
    s.score += incomePerFrame;
  }

  if (s.phase === 'gameover') return s;
  if (s.phase === 'level_complete') return s;
  if (s.phase !== 'playing') return s; // This check should be after CPS/income, but before game logic
  if (s.gameOver) return s;


  s.incomingMissiles = [...s.incomingMissiles];
  s.counterMissiles = [...s.counterMissiles];
  s.explosions = [...s.explosions];
  s.particles = [...s.particles];
  s.cities = [...s.cities];
  s.batteries = s.batteries.map((b) => ({ ...b }));
  s.bonusText = [...s.bonusText];
  s.shieldHits = [...s.shieldHits];
  s.bombers = [...s.bombers];
  s.asteroids = [...s.asteroids];
  s.mines = [...s.mines];
  s.laserBeams = [...s.laserBeams];

  const zone = getZone(s.level);

  // EMP effect
  if (s.empActive > 0) {
    s.empActive--;
  }

  // Battery EMP disable countdown
  s.batteries = s.batteries.map((b) => ({
    ...b,
    disabled: Math.max(0, b.disabled - 1),
  }));

  // Level transition to shop
  if (s.levelComplete) {
    s.levelTransitionTimer--;
    if (s.levelTransitionTimer <= 0) {
      // Check if next level is new zone
      if (getZone(s.level + 1).id !== getZone(s.level).id) {
        s.phase = 'zone_intro';
        s.zoneIntroTimer = 240;
        s.previousZoneId = getZone(s.level).id;
        // Assuming startNextLevel returns a new state, and we want to update 's' with it
        // If startNextLevel modifies the state in place, this line might need adjustment
        // For now, we'll assume it returns a new state and we're updating 's'
        Object.assign(s, startNextLevel(s));
      } else {
        // Skip shop, go straight to playing
        Object.assign(s, startNextLevel(s));
        s.phase = 'playing';
      }
      s.levelComplete = false;
    }
    return s;
  }

  // Spawn incoming missiles
  const config = getLevelConfig(s.level);
  if (s.missilesSpawnedThisLevel < s.totalMissilesThisLevel) {
    s.missileSpawnTimer--;
    if (s.missileSpawnTimer <= 0) {
      const isCluster = Math.random() < config.clusterChance;
      const count = isCluster ? Math.min(3, s.totalMissilesThisLevel - s.missilesSpawnedThisLevel) : 1;
      for (let i = 0; i < count; i++) {
        const missile = spawnMissile(s);
        if (s.empActive > 0) {
          missile.frozen = true;
          missile.frozenTimer = s.empActive;
        }
        s.incomingMissiles.push(missile);
        s.missilesSpawnedThisLevel++;
      }
      s.missileSpawnTimer = config.spawnInterval + Math.random() * 30;
    }
  }

  // ─── Zone-specific hazards ───────────────────────────────────────
  // Bombers (Arctic + later zones)
  if (zone.hasBombers) {
    s.bomberSpawnTimer--;
    if (s.bomberSpawnTimer <= 0) {
      s.bomberSpawnTimer = 600 + Math.random() * 400;
      const dir = Math.random() > 0.5 ? 1 : -1;
      s.bombers.push({
        id: getId(),
        x: dir === 1 ? -60 : CANVAS_WIDTH + 60,
        y: 50 + Math.random() * 80,
        speed: 1.2 + Math.random() * 0.8,
        direction: dir,
        dropsRemaining: 3 + Math.floor(Math.random() * 3),
        dropTimer: 60 + Math.random() * 40,
        dropInterval: 60 + Math.random() * 40,
      });
    }
  }

  // Update bombers
  s.bombers = s.bombers.map((b) => {
    const updated = { ...b };
    updated.x += updated.speed * updated.direction;
    updated.dropTimer--;
    if (updated.dropTimer <= 0 && updated.dropsRemaining > 0) {
      updated.dropsRemaining--;
      updated.dropTimer = updated.dropInterval;
      // Drop a missile
      const targets = s.cities.filter((c) => c.alive).map((c) => c.x);
      const tx = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : CANVAS_WIDTH / 2;
      s.incomingMissiles.push({
        id: getId(),
        startX: updated.x,
        startY: updated.y,
        targetX: tx,
        targetY: CANVAS_HEIGHT - GROUND_HEIGHT,
        progress: 0,
        speed: config.missileSpeed * 1.2,
        destroyed: false,
        isMirv: false,
        mirvSplit: false,
        mirvSplitProgress: 0,
        frozen: false,
        frozenTimer: 0,
        isHeatSeeker: false,
        isDecoy: false,
        isEmpMissile: false,
      });
      spawnParticles(updated.x, updated.y + 10, 4, '#888888', s.particles);
    }
    return updated;
  });
  s.bombers = s.bombers.filter(
    (b) => (b.direction === 1 && b.x < CANVAS_WIDTH + 100) || (b.direction === -1 && b.x > -100)
  );

  // Blizzard (Arctic)
  if (zone.hasBlizzard) {
    s.blizzardAlpha = 0.08 + Math.sin(Date.now() * 0.001) * 0.04;
    // Add blizzard particles
    if (Math.random() < 0.3) {
      s.blizzardParticles = [...s.blizzardParticles];
      for (let i = 0; i < 3; i++) {
        s.blizzardParticles.push({
          x: Math.random() * CANVAS_WIDTH,
          y: -5,
          vx: -2 + Math.random() * -3,
          vy: 2 + Math.random() * 3,
          size: 1 + Math.random() * 3,
        });
      }
    }
    s.blizzardParticles = s.blizzardParticles
      .map((bp) => ({ ...bp, x: bp.x + bp.vx, y: bp.y + bp.vy }))
      .filter((bp) => bp.y < CANVAS_HEIGHT && bp.x > -10);
  } else {
    s.blizzardAlpha = 0;
    s.blizzardParticles = [];
  }

  // Eruptions (Volcanic)
  if (zone.hasDecoys) {
    s.eruptionTimer--;
    if (s.eruptionTimer <= 0) {
      s.eruptionTimer = 300 + Math.random() * 500;
      s.eruptionActive = 60;
      s.screenShake = 12;
      // Spawn lava particles from ground
      const eruptX = Math.random() * CANVAS_WIDTH;
      spawnParticles(eruptX, CANVAS_HEIGHT - GROUND_HEIGHT, 30, '#ff4400', s.particles);
      spawnParticles(eruptX, CANVAS_HEIGHT - GROUND_HEIGHT, 15, '#ffaa00', s.particles);
    }
    if (s.eruptionActive > 0) {
      s.eruptionActive--;
    }
  }

  // Asteroids (Space Station)
  if (zone.hasAsteroids) {
    s.asteroidSpawnTimer--;
    if (s.asteroidSpawnTimer <= 0) {
      s.asteroidSpawnTimer = 400 + Math.random() * 600;
      const fromLeft = Math.random() > 0.5;
      s.asteroids.push({
        id: getId(),
        x: fromLeft ? -30 : CANVAS_WIDTH + 30,
        y: Math.random() * 200 + 50,
        vx: (fromLeft ? 1 : -1) * (0.8 + Math.random() * 1.5),
        vy: 0.3 + Math.random() * 0.8,
        radius: 15 + Math.random() * 20,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        hp: 2 + Math.floor(Math.random() * 3),
      });
    }
  }

  // Update asteroids
  s.asteroids = s.asteroids.map((a) => {
    const updated = { ...a };
    updated.x += updated.vx;
    updated.y += updated.vy;
    updated.rotation += updated.rotSpeed;
    return updated;
  });

  // Check asteroid-explosion collision
  s.explosions.forEach((e) => {
    if (e.radius <= 0) return;
    s.asteroids = s.asteroids.map((a) => {
      const dist = Math.hypot(a.x - e.x, a.y - e.y);
      if (dist < e.radius + a.radius) {
        const updated = { ...a, hp: a.hp - 1 };
        if (updated.hp <= 0) {
          s.score += 50;
          s.credits += 50; // Asteroids now give credits
          spawnParticles(a.x, a.y, 20, '#8888aa', s.particles);
          s.bonusText.push({ text: '+50', x: a.x, y: a.y, life: 60, color: '#aaaaff' });
          return { ...updated, radius: 0 }; // Mark for removal
        }
        spawnParticles(a.x, a.y, 5, '#666688', s.particles);
        return updated;
      }
      return a;
    });
  });
  s.asteroids = s.asteroids.filter((a) => a.radius > 0 && a.y < CANVAS_HEIGHT + 50 && a.x > -60 && a.x < CANVAS_WIDTH + 60);

  // Asteroid hits ground/cities
  s.asteroids = s.asteroids.filter((a) => {
    if (a.y + a.radius >= CANVAS_HEIGHT - GROUND_HEIGHT) {
      s.screenShake = 10;
      spawnParticles(a.x, CANVAS_HEIGHT - GROUND_HEIGHT, 20, '#887766', s.particles);
      s.explosions.push({
        id: getId(),
        x: a.x,
        y: CANVAS_HEIGHT - GROUND_HEIGHT,
        radius: 0,
        maxRadius: a.radius * 2,
        growing: true,
        alpha: 1,
        isPlayerExplosion: false,
      });
      // Damage nearby cities
      s.cities.forEach((c, ci) => {
        if (!c.alive) return;
        if (Math.abs(c.x - a.x) < a.radius + CITY_WIDTH) {
          const maxShieldHits = getShieldMaxHits(s.upgrades);
          if (maxShieldHits > 0 && s.shieldHits[ci] < maxShieldHits) {
            s.shieldHits[ci]++;
            s.bonusText.push({ text: 'SHIELD!', x: c.x, y: CANVAS_HEIGHT - GROUND_HEIGHT - 50, life: 60, color: '#66bbff' });
          } else {
            s.cities[ci] = { ...c, alive: false };
            spawnParticles(c.x, CANVAS_HEIGHT - GROUND_HEIGHT - CITY_HEIGHT / 2, 25, '#ff0000', s.particles);
          }
        }
      });
      return false;
    }
    return true;
  });

  // Auto turret
  const autoInterval = getAutoTurretInterval(s.upgrades);
  if (autoInterval > 0) {
    s.autoTurretTimer++;
    if (s.autoTurretTimer >= autoInterval) {
      s.autoTurretTimer = 0;
      let closestMissile: IncomingMissile | null = null;
      let closestDist = Infinity;
      s.incomingMissiles.forEach((m) => {
        if (m.destroyed) return;
        const my = m.startY + (m.targetY - m.startY) * m.progress;
        if (my < 100) return;
        const threatDist = CANVAS_HEIGHT - GROUND_HEIGHT - my;
        if (threatDist < closestDist) {
          closestDist = threatDist;
          closestMissile = m;
        }
      });
      if (closestMissile) {
        const cm = closestMissile as IncomingMissile;
        const mx = cm.startX + (cm.targetX - cm.startX) * cm.progress;
        const my = cm.startY + (cm.targetY - cm.startY) * cm.progress;

        const speedMult = cm.frozen ? 0.3 : 1.0;
        const velScale = (cm.speed * speedMult) / 500;
        const velX = (cm.targetX - cm.startX) * velScale;
        const velY = (cm.targetY - cm.startY) * velScale;

        const intercept = findBestIntercept(s, mx, my, velX, velY);
        if (intercept) {
          fireCounterMissile(s, intercept.x, intercept.y);
        }
      }
    }
  }

  // Update incoming missiles
  s.incomingMissiles = s.incomingMissiles.map((m) => {
    if (m.destroyed) return m;
    const updated = { ...m };

    if (updated.frozen) {
      updated.frozenTimer--;
      if (updated.frozenTimer <= 0) {
        updated.frozen = false;
      }
    }

    const speedMult = updated.frozen ? 0.3 : 1.0;
    updated.progress += (updated.speed * speedMult) / 500;

    // Heat-seeker: adjust target toward nearest alive city
    if (updated.isHeatSeeker && updated.progress < 0.8) {
      const currentX = updated.startX + (updated.targetX - updated.startX) * updated.progress;
      const aliveCities = state.cities.filter((c) => c.alive);
      if (aliveCities.length > 0) {
        let nearestCity = aliveCities[0];
        let nearestDist = Infinity;
        aliveCities.forEach((c) => {
          const d = Math.abs(c.x - currentX);
          if (d < nearestDist) {
            nearestDist = d;
            nearestCity = c;
          }
        });
        // Gently steer toward target
        updated.targetX += (nearestCity.x - updated.targetX) * 0.02;
      }
    }

    // MIRV split
    if (updated.isMirv && !updated.mirvSplit && updated.progress >= updated.mirvSplitProgress) {
      updated.mirvSplit = true;
      const currentX = updated.startX + (updated.targetX - updated.startX) * updated.progress;
      const currentY = updated.startY + (updated.targetY - updated.startY) * updated.progress;

      for (let i = 0; i < 2; i++) {
        const targets = [
          ...s.cities.filter((c) => c.alive).map((c) => c.x),
          ...s.batteries.map((b) => b.x),
        ];
        const tx = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : CANVAS_WIDTH / 2;
        s.incomingMissiles.push({
          id: getId(),
          startX: currentX + (Math.random() - 0.5) * 20,
          startY: currentY,
          targetX: tx,
          targetY: CANVAS_HEIGHT - GROUND_HEIGHT,
          progress: 0,
          speed: updated.speed * 1.1,
          destroyed: false,
          isMirv: false,
          mirvSplit: false,
          mirvSplitProgress: 0,
          frozen: updated.frozen,
          frozenTimer: updated.frozenTimer,
          isHeatSeeker: false,
          isDecoy: false,
          isEmpMissile: false,
        });
      }
    }

    return updated;
  });

  // Update counter missiles
  s.counterMissiles = s.counterMissiles.map((m) => {
    if (m.arrived) return m;
    const dist = Math.hypot(m.targetX - m.startX, m.targetY - m.startY);
    const updated = { ...m, progress: m.progress + m.speed / dist };
    if (updated.progress >= 1) {
      updated.arrived = true;
      s.explosions.push({
        id: getId(),
        x: m.targetX,
        y: m.targetY,
        radius: 0,
        maxRadius: getExplosionRadius(s.upgrades),
        growing: true,
        alpha: 1,
        isPlayerExplosion: true,
      });
      spawnParticles(m.targetX, m.targetY, 8, '#ffaa00', s.particles);
    }
    return updated;
  });

  // Update explosions
  s.explosions = s.explosions.map((e) => {
    const updated = { ...e };
    if (updated.growing) {
      updated.radius += EXPLOSION_GROW_SPEED;
      if (updated.radius >= updated.maxRadius) {
        updated.growing = false;
      }
    } else {
      updated.radius -= EXPLOSION_SHRINK_SPEED;
      updated.alpha = Math.max(0, updated.radius / updated.maxRadius);
    }
    return updated;
  });

  // ─── Combo timer ────────────────────────────────────────────────────
  if (s.comboTimer > 0) {
    s.comboTimer--;
    if (s.comboTimer <= 0) {
      s.comboCount = 0;
      s.comboMultiplier = 1;
    }
  }

  // ─── Boss update ───────────────────────────────────────────────────
  if (s.boss && !s.bossDefeated) {
    const boss = { ...s.boss };
    boss.flashTimer = Math.max(0, boss.flashTimer - 1);

    // Move side to side
    boss.x += boss.speed * boss.moveDir;
    if (boss.x > CANVAS_WIDTH - 80) boss.moveDir = -1;
    if (boss.x < 80) boss.moveDir = 1;

    // Attack timer
    boss.attackTimer--;
    if (boss.attackTimer <= 0) {
      const config = getLevelConfig(s.level);
      if (boss.type === 'mothership') {
        boss.attackTimer = Math.max(60, 120 - s.level * 2);
        const salvos = 3 + Math.floor(s.level / 10);
        for (let i = 0; i < salvos; i++) {
          const targets = [...s.cities.filter(c => c.alive).map(c => c.x), ...s.batteries.map(b => b.x)];
          const tx = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : CANVAS_WIDTH / 2;
          s.incomingMissiles.push({
            id: getId(), startX: boss.x + (Math.random() - 0.5) * 60, startY: boss.y + 20,
            targetX: tx, targetY: CANVAS_HEIGHT - GROUND_HEIGHT,
            progress: 0, speed: config.missileSpeed * 1.3, destroyed: false,
            isMirv: false, mirvSplit: false, mirvSplitProgress: 0,
            frozen: false, frozenTimer: 0, isHeatSeeker: false, isDecoy: false, isEmpMissile: false,
          });
        }
      } else if (boss.type === 'fortress') {
        boss.attackTimer = Math.max(80, 150 - s.level * 2);
        for (let i = 0; i < 5; i++) {
          const angle = -Math.PI / 2 + (i - 2) * 0.3;
          const tx = boss.x + Math.cos(angle) * 400;
          s.incomingMissiles.push({
            id: getId(), startX: boss.x, startY: boss.y + 15,
            targetX: tx, targetY: CANVAS_HEIGHT - GROUND_HEIGHT,
            progress: 0, speed: config.missileSpeed * 1.1, destroyed: false,
            isMirv: false, mirvSplit: false, mirvSplitProgress: 0,
            frozen: false, frozenTimer: 0, isHeatSeeker: false, isDecoy: false, isEmpMissile: false,
          });
        }
      } else {
        boss.attackTimer = Math.max(50, 100 - s.level * 2);
        for (let i = 0; i < 6; i++) {
          const tx = Math.random() * (CANVAS_WIDTH - 100) + 50;
          s.incomingMissiles.push({
            id: getId(), startX: boss.x + (Math.random() - 0.5) * 40, startY: boss.y + 10,
            targetX: tx, targetY: CANVAS_HEIGHT - GROUND_HEIGHT,
            progress: 0, speed: config.missileSpeed * 1.5 * (0.8 + Math.random() * 0.4), destroyed: false,
            isMirv: false, mirvSplit: false, mirvSplitProgress: 0,
            frozen: false, frozenTimer: 0, isHeatSeeker: Math.random() < 0.3, isDecoy: false, isEmpMissile: false,
          });
        }
      }
      spawnParticles(boss.x, boss.y + 15, 6, '#ff4400', s.particles);
    }

    // Boss takes damage from explosions
    s.explosions.forEach(e => {
      if (e.radius <= 0) return;
      const dist = Math.hypot(boss.x - e.x, boss.y - e.y);
      const hitRadius = boss.type === 'fortress' ? 45 : 40;
      if (dist < e.radius + hitRadius && e.isPlayerExplosion) {
        const dmg = Math.ceil(e.radius / 10);
        boss.hp -= dmg;
        boss.flashTimer = 8;
        spawnParticles(boss.x, boss.y, 5, '#ffaa00', s.particles);
      }
    });

    if (boss.hp <= 0) {
      s.bossDefeated = true;
      s.boss = null;
      s.screenShake = 20;
      const bossScore = 200 + s.level * 20;
      s.score += bossScore;
      s.credits += bossScore; // Add boss score to credits
      spawnParticles(boss.x, boss.y, 60, '#ff4400', s.particles);
      spawnParticles(boss.x, boss.y, 40, '#ffaa00', s.particles);
      spawnParticles(boss.x, boss.y, 30, '#ffffff', s.particles);
      s.explosions.push({ id: getId(), x: boss.x, y: boss.y, radius: 0, maxRadius: 120, growing: true, alpha: 1, isPlayerExplosion: false });
      s.bonusText.push({ text: `BOSS DESTROYED +${bossScore}`, x: boss.x, y: boss.y - 30, life: 150, color: '#ff8800' });
      s.runBossesDefeated++;
    } else {
      s.boss = boss;
    }
  }

  // ─── Mines update ──────────────────────────────────────────────────
  s.mines = s.mines.map(mine => {
    const m = { ...mine };
    m.life--;
    if (!m.armed && m.life < m.maxLife - 30) m.armed = true;
    return m;
  });

  // Mine proximity detonation
  s.mines = s.mines.filter(mine => {
    if (mine.life <= 0) return false;
    if (!mine.armed) return true;
    let detonate = false;
    s.incomingMissiles.forEach(m => {
      if (m.destroyed) return;
      const mx = m.startX + (m.targetX - m.startX) * m.progress;
      const my = m.startY + (m.targetY - m.startY) * m.progress;
      if (Math.hypot(mx - mine.x, my - mine.y) < mine.radius) detonate = true;
    });
    if (s.boss && !s.bossDefeated) {
      if (Math.hypot(s.boss.x - mine.x, s.boss.y - mine.y) < mine.radius + 30) detonate = true;
    }
    if (detonate) {
      s.explosions.push({ id: getId(), x: mine.x, y: mine.y, radius: 0, maxRadius: getExplosionRadius(s.upgrades) * 1.5, growing: true, alpha: 1, isPlayerExplosion: true });
      spawnParticles(mine.x, mine.y, 20, '#ff44ff', s.particles);
      s.screenShake = 6;
      return false;
    }
    return true;
  });

  // ─── Laser beams update ────────────────────────────────────────────
  s.laserBeams = s.laserBeams.map(lb => ({ ...lb, life: lb.life - 1 })).filter(lb => lb.life > 0);

  // Laser beam vs missiles
  s.laserBeams.forEach(lb => {
    const lx = lb.endX - lb.startX;
    const ly = lb.endY - lb.startY;
    const len = Math.hypot(lx, ly);
    if (len === 0) return;
    const nx = lx / len;
    const ny = ly / len;
    s.incomingMissiles.forEach((m, i) => {
      if (m.destroyed) return;
      const mx = m.startX + (m.targetX - m.startX) * m.progress;
      const my = m.startY + (m.targetY - m.startY) * m.progress;
      const dx = mx - lb.startX;
      const dy = my - lb.startY;
      const proj = dx * nx + dy * ny;
      if (proj < 0 || proj > len) return;
      const perpDist = Math.abs(dx * ny - dy * nx);
      if (perpDist < 20) {
        s.incomingMissiles[i] = { ...m, destroyed: true };
        if (!m.isDecoy) {
          const scoreGain = 25 * s.comboMultiplier;
          s.score += scoreGain;
          s.credits += scoreGain; // Laser score to credits
          s.runMissilesDestroyed++;
          s.comboCount++;
          s.comboTimer = 90;
          s.comboMultiplier = Math.min(Math.floor(s.comboCount / 2) + 1, 10);
          s.maxCombo = Math.max(s.maxCombo, s.comboCount);
          s.bonusText.push({ text: `+${scoreGain}`, x: mx, y: my, life: 60, color: '#ff4444' });
        }
        spawnParticles(mx, my, 8, '#ff4444', s.particles);
      }
    });
    // Laser vs boss
    if (s.boss && !s.bossDefeated) {
      const dx = s.boss.x - lb.startX;
      const dy = s.boss.y - lb.startY;
      const proj = dx * nx + dy * ny;
      if (proj >= 0 && proj <= len) {
        const perpDist = Math.abs(dx * ny - dy * nx);
        if (perpDist < 40) {
          const boss = { ...s.boss };
          boss.hp -= 3;
          boss.flashTimer = 8;
          s.boss = boss;
          spawnParticles(s.boss.x, s.boss.y, 3, '#ff4444', s.particles);
        }
      }
    }
  });

  // Check collision: explosions vs incoming missiles
  const chainRadiusMult = getChainRadius(s.upgrades);
  s.explosions.forEach((e) => {
    if (e.radius <= 0) return;
    s.incomingMissiles.forEach((m, i) => {
      if (m.destroyed) return;
      const mx = m.startX + (m.targetX - m.startX) * m.progress;
      const my = m.startY + (m.targetY - m.startY) * m.progress;
      const dist = Math.hypot(mx - e.x, my - e.y);
      if (dist < e.radius) {
        s.incomingMissiles[i] = { ...m, destroyed: true };

        // Decoys give no points but flash a "DECOY!" text
        if (m.isDecoy) {
          spawnParticles(mx, my, 8, '#aaaaaa', s.particles);
          s.bonusText.push({ text: 'DECOY!', x: mx, y: my, life: 60, color: '#aaaaaa' });
          return;
        }

        // Combo tracking
        s.comboCount++;
        s.runMissilesDestroyed++;
        s.comboTimer = 90;
        s.comboMultiplier = Math.min(Math.floor(s.comboCount / 2) + 1, 10);
        s.maxCombo = Math.max(s.maxCombo, s.comboCount);

        // Score with lucky strike + combo multiplier
        let scoreGain = 10;
        let bonusColor = '#ffdd44';
        const luckyChance = getLuckyChance(s.upgrades);
        if (Math.random() < luckyChance) {
          const mult = Math.floor(Math.random() * 4) + 2;
          scoreGain *= mult;
          bonusColor = mult >= 4 ? '#ff44ff' : '#ffaa44';
        }
        scoreGain *= s.comboMultiplier;
        s.score += scoreGain;
        s.credits += scoreGain; // Add to spendable currency

        const comboText = s.comboMultiplier > 1 ? ` x${s.comboMultiplier}` : '';
        spawnParticles(mx, my, 12, '#ff4444', s.particles);
        s.bonusText.push({ text: `+${scoreGain}${comboText}`, x: mx, y: my, life: 60, color: s.comboMultiplier >= 5 ? '#ff44ff' : s.comboMultiplier >= 3 ? '#ffaa44' : bonusColor });

        // Combo milestone text
        if (s.comboCount === 4) s.bonusText.push({ text: 'COMBO x2!', x: CANVAS_WIDTH / 2, y: 100, life: 80, color: '#ffaa44' });
        if (s.comboCount === 8) s.bonusText.push({ text: 'COMBO x5!', x: CANVAS_WIDTH / 2, y: 100, life: 80, color: '#ff44ff' });
        if (s.comboCount === 14) s.bonusText.push({ text: 'COMBO x8!', x: CANVAS_WIDTH / 2, y: 100, life: 80, color: '#ff4444' });
        if (s.comboCount === 18) s.bonusText.push({ text: 'MEGA COMBO x10!', x: CANVAS_WIDTH / 2, y: 100, life: 100, color: '#ff00ff' });

        // Chain explosion
        s.explosions.push({
          id: getId(),
          x: mx,
          y: my,
          radius: 0,
          maxRadius: getExplosionRadius(s.upgrades) * chainRadiusMult,
          growing: true,
          alpha: 1,
          isPlayerExplosion: false,
        });
      }
    });
  });

  // Check if incoming missiles hit ground
  s.incomingMissiles.forEach((m, i) => {
    if (m.destroyed) return;
    if (m.progress >= 1) {
      s.incomingMissiles[i] = { ...m, destroyed: true };

      // Decoys just poof when they land
      if (m.isDecoy) {
        spawnParticles(m.targetX, m.targetY, 8, '#aaaaaa', s.particles);
        s.bonusText.push({ text: 'DECOY!', x: m.targetX, y: m.targetY - 20, life: 60, color: '#888888' });
        return;
      }

      // EMP missiles disable nearest battery
      if (m.isEmpMissile) {
        let nearestBattery = 0;
        let nearestDist = Infinity;
        s.batteries.forEach((b, bi) => {
          const d = Math.abs(b.x - m.targetX);
          if (d < nearestDist) {
            nearestDist = d;
            nearestBattery = bi;
          }
        });
        s.batteries[nearestBattery] = { ...s.batteries[nearestBattery], disabled: 300 }; // 5 seconds
        spawnParticles(m.targetX, m.targetY, 20, '#8866ff', s.particles);
        s.bonusText.push({ text: 'EMP!', x: m.targetX, y: m.targetY - 20, life: 90, color: '#aa88ff' });
        s.screenShake = 6;
        s.explosions.push({
          id: getId(),
          x: m.targetX,
          y: m.targetY,
          radius: 0,
          maxRadius: 40,
          growing: true,
          alpha: 1,
          isPlayerExplosion: false,
        });
        return;
      }

      s.explosions.push({
        id: getId(),
        x: m.targetX,
        y: m.targetY,
        radius: 0,
        maxRadius: BASE_EXPLOSION_RADIUS * 0.7,
        growing: true,
        alpha: 1,
        isPlayerExplosion: false,
      });
      s.screenShake = 8;
      spawnParticles(m.targetX, m.targetY, 15, '#ff6600', s.particles);

      // Check city damage
      s.cities.forEach((c, ci) => {
        if (!c.alive) return;
        if (Math.abs(c.x - m.targetX) < CITY_WIDTH) {
          const maxShieldHits = getShieldMaxHits(s.upgrades);
          if (maxShieldHits > 0 && s.shieldHits[ci] < maxShieldHits) {
            s.shieldHits[ci]++;
            spawnParticles(c.x, CANVAS_HEIGHT - GROUND_HEIGHT - CITY_HEIGHT, 10, '#66bbff', s.particles);
            s.bonusText.push({ text: 'SHIELD!', x: c.x, y: CANVAS_HEIGHT - GROUND_HEIGHT - 50, life: 60, color: '#66bbff' });
          } else {
            s.cities[ci] = { ...c, alive: false };
            spawnParticles(c.x, CANVAS_HEIGHT - GROUND_HEIGHT - CITY_HEIGHT / 2, 25, '#ff0000', s.particles);
          }
        }
      });

      // Check battery damage
      s.batteries.forEach((b, bi) => {
        if (Math.abs(b.x - m.targetX) < BATTERY_WIDTH) {
          if (!s.autoMode) {
            s.batteries[bi] = { ...b, ammo: 0 };
          }
        }
      });
    }
  });

  // Update particles
  s.particles = s.particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.05,
      life: p.life - 1 / p.maxLife,
    }))
    .filter((p) => p.life > 0);

  // Update bonus text
  s.bonusText = s.bonusText
    .map((bt) => ({ ...bt, y: bt.y - 0.8, life: bt.life - 1 }))
    .filter((bt) => bt.life > 0);

  // Update achievement toasts
  s.achievementToasts = s.achievementToasts
    .map(t => ({ ...t, timer: t.timer - 1 }))
    .filter(t => t.timer > 0);

  // Clean up
  s.incomingMissiles = s.incomingMissiles.filter((m) => !m.destroyed || m.progress < 1.5);
  s.counterMissiles = s.counterMissiles.filter((m) => !m.arrived);
  s.explosions = s.explosions.filter((e) => e.radius > 0 || e.growing);

  // Screen shake decay
  s.screenShake = Math.max(0, s.screenShake - 0.5);

  // Check level complete
  const bossCleared = !s.isBossLevel || s.bossDefeated;
  if (
    s.missilesSpawnedThisLevel >= s.totalMissilesThisLevel &&
    s.incomingMissiles.filter((m) => !m.destroyed).length === 0 &&
    s.explosions.length === 0 &&
    s.counterMissiles.length === 0 &&
    s.bombers.length === 0 &&
    s.asteroids.filter((a) => a.y + a.radius >= CANVAS_HEIGHT - GROUND_HEIGHT - 100).length === 0 &&
    bossCleared
  ) {
    s.levelComplete = true;
    s.levelTransitionTimer = 120;
    const aliveCities = s.cities.filter((c) => c.alive).length;
    s.score += aliveCities * 100;
    s.bonusText.push({
      text: `CITY BONUS +${aliveCities * 100}`,
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      life: 100,
      color: '#44ff88',
    });
  }

  // Check game over
  const aliveCities = s.cities.filter((c) => c.alive).length;
  if (aliveCities === 0) {
    s.gameOver = true;
    s.phase = 'gameover';
    s.highScore = Math.max(s.highScore, s.score);
  }

  return s;
}

function startNextLevel(state: GameState): GameState {
  const s = { ...state };
  s.level++;
  s.phase = 'playing';
  s.missilesSpawnedThisLevel = 0;
  const config = getLevelConfig(s.level);
  s.totalMissilesThisLevel = s.level % 5 === 0 ? Math.floor(config.totalMissiles * 0.6) : config.totalMissiles;
  s.missileSpawnTimer = 60;

  const maxAmmo = getAmmoPerBattery(s.upgrades);
  s.batteries = s.batteries.map((b) => ({ ...b, ammo: maxAmmo, maxAmmo, disabled: 0 }));

  s.shieldHits = s.cities.map(() => 0);
  s.empActive = getEmpDuration(s.upgrades);
  s.autoTurretTimer = 0;
  s.incomingMissiles = [];
  s.counterMissiles = [];
  s.explosions = [];
  s.bombers = [];
  s.asteroids = [];
  s.mines = [];
  s.laserBeams = [];
  s.bomberSpawnTimer = 200 + Math.random() * 300;
  s.asteroidSpawnTimer = 300 + Math.random() * 400;
  s.eruptionTimer = 200 + Math.random() * 300;

  // Boss spawning every 5th level
  if (s.level % 5 === 0) {
    s.boss = createBoss(s.level);
    s.bossDefeated = false;
    s.isBossLevel = true;
  } else {
    s.boss = null;
    s.bossDefeated = false;
    s.isBossLevel = false;
  }

  // Recharge special weapons
  s.specialWeapons = initSpecialWeapons(s.upgrades);
  s.selectedWeapon = -1;

  // Reset combo
  s.comboCount = 0;
  s.comboTimer = 0;
  s.comboMultiplier = 1;

  return s;
}

// ─── Shop Layout ────────────────────────────────────────────────────────
const SHOP_CARD_W = 280;
const SHOP_CARD_H = 72;
const SHOP_COLS = 3;
const SHOP_GAP = 16;
const SHOP_START_X = (CANVAS_WIDTH - (SHOP_CARD_W * SHOP_COLS + SHOP_GAP * (SHOP_COLS - 1))) / 2;
const SHOP_START_Y = 100;

function getShopCardRect(index: number): { x: number; y: number; w: number; h: number } {
  const col = index % SHOP_COLS;
  const row = Math.floor(index / SHOP_COLS);
  return {
    x: SHOP_START_X + col * (SHOP_CARD_W + SHOP_GAP),
    y: SHOP_START_Y + row * (SHOP_CARD_H + SHOP_GAP - 2),
    w: SHOP_CARD_W,
    h: SHOP_CARD_H,
  };
}

// ─── Rendering ──────────────────────────────────────────────────────────
const skyGradientCache = new Map<number, CanvasGradient>();
const groundGradientCache = new Map<number, CanvasGradient>();
const buildingGradientCache = new Map<string, CanvasGradient>();
let lastGradientsCtx: CanvasRenderingContext2D | null = null;

function clearGradientCaches(ctx: CanvasRenderingContext2D) {
  if (ctx !== lastGradientsCtx) {
    skyGradientCache.clear();
    groundGradientCache.clear();
    buildingGradientCache.clear();
    lastGradientsCtx = ctx;
  }
}

function getCachedSkyGradient(ctx: CanvasRenderingContext2D, zone: ZoneDefinition): CanvasGradient {
  clearGradientCaches(ctx);
  let grad = skyGradientCache.get(zone.id);
  if (!grad) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, zone.skyColors[0]);
    grad.addColorStop(0.6, zone.skyColors[1]);
    grad.addColorStop(1, zone.skyColors[2]);
    ctx.restore();
    skyGradientCache.set(zone.id, grad);
  }
  return grad;
}

function getCachedGroundGradient(ctx: CanvasRenderingContext2D, zone: ZoneDefinition): CanvasGradient {
  clearGradientCaches(ctx);
  let grad = groundGradientCache.get(zone.id);
  if (!grad) {
    const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    grad = ctx.createLinearGradient(0, groundY, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, zone.groundColors[0]);
    grad.addColorStop(0.3, zone.groundColors[1]);
    grad.addColorStop(1, zone.groundColors[2]);
    ctx.restore();
    groundGradientCache.set(zone.id, grad);
  }
  return grad;
}

function getCachedBuildingGradient(ctx: CanvasRenderingContext2D, zoneId: number, cityIdx: number, bIdx: number, bx: number, by: number, bw: number, bh: number, colors: [string, string]): CanvasGradient {
  clearGradientCaches(ctx);
  const key = `${zoneId}-${cityIdx}-${bIdx}`;
  let grad = buildingGradientCache.get(key);
  if (!grad) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    grad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1]);
    ctx.restore();
    buildingGradientCache.set(key, grad);
  }
  return grad;
}

function drawGame(ctx: CanvasRenderingContext2D, state: GameState, stats?: PersistentStats) {
  if (state.phase === 'shop') {
    drawShop(ctx, state);
    return;
  }

  if (state.phase === 'title') {
    drawTitleScreen(ctx, state, stats);
    return;
  }

  if (state.phase === 'gameover') {
    drawGameOver(ctx, state, stats);
    return;
  }

  if (state.phase === 'prestige_shop' && stats) {
    drawPrestigeShop(ctx, stats);
    return;
  }

  if (state.phase === 'zone_intro') {
    drawZoneIntro(ctx, state);
    return;
  }

  const zone = getZone(state.level);
  const shake = state.screenShake;
  const sx = shake > 0 ? (Math.random() - 0.5) * shake : 0;
  const sy = shake > 0 ? (Math.random() - 0.5) * shake : 0;

  ctx.save();
  ctx.translate(sx, sy);

  // Sky gradient
  ctx.fillStyle = getCachedSkyGradient(ctx, zone);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Stars
  state.stars.forEach((star) => {
    const twinkle = star.brightness * (0.5 + 0.5 * Math.sin(Date.now() * 0.003 + star.x));
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  // Volcanic lava glow at ground
  if (zone.hasDecoys && state.eruptionActive > 0) {
    const lavaAlpha = state.eruptionActive / 60 * 0.3;
    const lavaGrad = ctx.createLinearGradient(0, CANVAS_HEIGHT - 120, 0, CANVAS_HEIGHT);
    lavaGrad.addColorStop(0, `rgba(255, 60, 0, 0)`);
    lavaGrad.addColorStop(1, `rgba(255, 60, 0, ${lavaAlpha})`);
    ctx.fillStyle = lavaGrad;
    ctx.fillRect(0, CANVAS_HEIGHT - 120, CANVAS_WIDTH, 120);
  }

  // EMP effect
  if (state.empActive > 0) {
    const empAlpha = Math.min(0.15, state.empActive / 300);
    ctx.fillStyle = `rgba(100, 80, 255, ${empAlpha})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = `rgba(150, 120, 255, ${empAlpha * 2})`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const waveY = (Date.now() * 0.05 + i * 120) % CANVAS_HEIGHT;
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x < CANVAS_WIDTH; x += 20) {
        ctx.lineTo(x, waveY + Math.sin(x * 0.02 + Date.now() * 0.003) * 3);
      }
      ctx.stroke();
    }
  }

  // Ground
  const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;
  ctx.fillStyle = getCachedGroundGradient(ctx, zone);
  ctx.fillRect(0, groundY, CANVAS_WIDTH, GROUND_HEIGHT);

  ctx.strokeStyle = zone.groundStrokeColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(CANVAS_WIDTH, groundY);
  ctx.stroke();

  // Volcanic lava cracks
  if (zone.hasDecoys) {
    const t = Date.now() * 0.002;
    ctx.strokeStyle = `rgba(255, 80, 0, ${0.3 + Math.sin(t) * 0.15})`;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const crackX = 80 + i * 110 + Math.sin(t + i * 2) * 10;
      ctx.beginPath();
      ctx.moveTo(crackX, groundY + 5);
      ctx.lineTo(crackX + 10, groundY + 20);
      ctx.lineTo(crackX + 5, groundY + 35);
      ctx.stroke();
    }
  }

  // Draw cities with shields
  const shieldMax = getShieldMaxHits(state.upgrades);
  state.cities.forEach((city, ci) => {
    if (city.alive) {
      drawCity(ctx, city.x, groundY, zone, ci);
      if (shieldMax > 0 && state.shieldHits[ci] < shieldMax) {
        const shieldStrength = 1 - state.shieldHits[ci] / shieldMax;
        ctx.strokeStyle = `rgba(100, 180, 255, ${shieldStrength * 0.7})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = '#44aaff';
        ctx.shadowBlur = 8 * shieldStrength;
        ctx.beginPath();
        ctx.arc(city.x, groundY - CITY_HEIGHT / 2, 28, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
        ctx.fillStyle = `rgba(100, 180, 255, ${shieldStrength * 0.1})`;
        ctx.beginPath();
        ctx.arc(city.x, groundY - CITY_HEIGHT / 2, 28, Math.PI * 1.1, Math.PI * 1.9);
        ctx.lineTo(city.x + 28 * Math.cos(Math.PI * 1.9), groundY);
        ctx.lineTo(city.x + 28 * Math.cos(Math.PI * 1.1), groundY);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } else {
      drawDestroyedCity(ctx, city.x, groundY);
    }
  });

  // Draw batteries
  state.batteries.forEach((battery) => {
    drawBattery(ctx, battery);
  });

  // Auto turret indicator
  if (state.upgrades.autoTurret > 0) {
    const interval = getAutoTurretInterval(state.upgrades);
    const progress = state.autoTurretTimer / interval;
    state.batteries.forEach((b) => {
      if (b.ammo > 0 && b.disabled <= 0) {
        ctx.strokeStyle = `rgba(68, 255, 204, ${0.3 + progress * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(b.x, b.y - 24, 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.stroke();
      }
    });
  }

  // Draw bombers
  state.bombers.forEach((bomber) => {
    drawBomber(ctx, bomber);
  });

  // Draw asteroids
  state.asteroids.forEach((asteroid) => {
    drawAsteroid(ctx, asteroid);
  });

  // Draw incoming missile trails
  state.incomingMissiles.forEach((m) => {
    if (m.destroyed) return;
    const currentX = m.startX + (m.targetX - m.startX) * m.progress;
    const currentY = m.startY + (m.targetY - m.startY) * m.progress;

    let trailColor = zone.missileTrailColor;
    if (m.frozen) trailColor = 'rgba(150, 100, 255, 0.9)';
    else if (m.isHeatSeeker) trailColor = 'rgba(255, 60, 200, 0.9)';
    else if (m.isDecoy) trailColor = 'rgba(180, 180, 180, 0.7)';
    else if (m.isEmpMissile) trailColor = 'rgba(130, 100, 255, 0.9)';

    const trailGrad = ctx.createLinearGradient(m.startX, m.startY, currentX, currentY);
    trailGrad.addColorStop(0, 'rgba(255, 50, 50, 0.1)');
    trailGrad.addColorStop(1, trailColor);
    ctx.strokeStyle = trailGrad;
    ctx.lineWidth = m.isDecoy ? 1.5 : 2;
    ctx.beginPath();
    ctx.moveTo(m.startX, m.startY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    // Warhead
    let headColor = '#ff4444';
    let glowColor = '#ff0000';
    if (m.frozen) { headColor = '#aa88ff'; glowColor = '#8866ff'; }
    else if (m.isHeatSeeker) { headColor = '#ff44cc'; glowColor = '#ff00aa'; }
    else if (m.isDecoy) { headColor = '#bbbbbb'; glowColor = '#999999'; }
    else if (m.isEmpMissile) { headColor = '#8866ff'; glowColor = '#6644dd'; }

    ctx.fillStyle = headColor;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(currentX, currentY, m.isDecoy ? 2 : 3, 0, Math.PI * 2);
    ctx.fill();

    // MIRV indicator
    if (m.isMirv && !m.mirvSplit) {
      ctx.fillStyle = '#ffff00';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heat-seeker ring
    if (m.isHeatSeeker) {
      const t = Date.now() * 0.01;
      ctx.strokeStyle = `rgba(255, 100, 200, ${0.3 + Math.sin(t) * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 6 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // EMP missile indicator
    if (m.isEmpMissile) {
      const t = Date.now() * 0.008;
      ctx.strokeStyle = `rgba(130, 100, 255, ${0.4 + Math.sin(t) * 0.2})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 7, 0, Math.PI * 2);
      ctx.stroke();
      // Lightning bolts
      for (let i = 0; i < 3; i++) {
        const angle = t * 3 + (i * Math.PI * 2) / 3;
        ctx.strokeStyle = `rgba(180, 150, 255, ${0.5 + Math.sin(t + i) * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentX + Math.cos(angle) * 5, currentY + Math.sin(angle) * 5);
        ctx.lineTo(currentX + Math.cos(angle) * 10, currentY + Math.sin(angle) * 10);
        ctx.stroke();
      }
    }

    if (m.frozen) {
      ctx.strokeStyle = 'rgba(150, 120, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
  });

  // Draw counter missile trails
  state.counterMissiles.forEach((m) => {
    const currentX = m.startX + (m.targetX - m.startX) * m.progress;
    const currentY = m.startY + (m.targetY - m.startY) * m.progress;

    const trailGrad = ctx.createLinearGradient(m.startX, m.startY, currentX, currentY);
    trailGrad.addColorStop(0, 'rgba(50, 150, 255, 0.1)');
    trailGrad.addColorStop(1, 'rgba(100, 200, 255, 0.9)');
    ctx.strokeStyle = trailGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.startX, m.startY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = '#66ccff';
    ctx.shadowColor = '#44aaff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Draw explosions
  state.explosions.forEach((e) => {
    if (e.radius <= 0) return;
    const colors = e.isPlayerExplosion
      ? ['rgba(100, 200, 255, ', 'rgba(150, 230, 255, ', 'rgba(200, 240, 255, ']
      : ['rgba(255, 100, 50, ', 'rgba(255, 150, 50, ', 'rgba(255, 200, 100, '];

    const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.radius);
    grad.addColorStop(0, colors[2] + (e.alpha * 0.9) + ')');
    grad.addColorStop(0.4, colors[1] + (e.alpha * 0.6) + ')');
    grad.addColorStop(0.7, colors[0] + (e.alpha * 0.3) + ')');
    grad.addColorStop(1, colors[0] + '0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(255, 255, 255, ${e.alpha * 0.5})`;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw particles
  state.particles.forEach((p) => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  });
  ctx.globalAlpha = 1;

  // Draw bonus text
  state.bonusText.forEach((bt) => {
    ctx.globalAlpha = Math.min(1, bt.life / 20);
    ctx.fillStyle = bt.color;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(bt.text, bt.x, bt.y);
  });
  ctx.globalAlpha = 1;

  // Blizzard overlay
  if (zone.hasBlizzard) {
    ctx.fillStyle = `rgba(200, 220, 240, ${state.blizzardAlpha})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Blizzard particles
    ctx.fillStyle = 'rgba(220, 235, 250, 0.6)';
    state.blizzardParticles.forEach((bp) => {
      ctx.beginPath();
      ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Draw crosshair (color changes for special weapon)  
  if (state.selectedWeapon >= 0 && state.selectedWeapon < state.specialWeapons.length) {
    const weapon = state.specialWeapons[state.selectedWeapon];
    const wColors: Record<string, string> = { laser: '#ff4444', swarm: '#ff8800', mine: '#ff44ff' };
    drawCrosshair(ctx, state.cursorX, state.cursorY);
    // Draw weapon indicator ring
    ctx.strokeStyle = wColors[weapon.type] || '#ffffff';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(state.cursorX, state.cursorY, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  } else {
    drawCrosshair(ctx, state.cursorX, state.cursorY);
  }

  // Draw mines
  state.mines.forEach(mine => {
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.008);
    ctx.strokeStyle = mine.armed ? `rgba(255, 68, 255, ${0.4 + pulse * 0.4})` : 'rgba(255, 68, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(mine.x, mine.y, mine.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    // Core
    ctx.fillStyle = mine.armed ? '#ff44ff' : '#aa44aa';
    ctx.shadowColor = '#ff44ff';
    ctx.shadowBlur = mine.armed ? 10 + pulse * 5 : 4;
    ctx.beginPath();
    ctx.arc(mine.x, mine.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Spikes
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Date.now() * 0.002;
      ctx.fillRect(mine.x + Math.cos(a) * 7 - 1, mine.y + Math.sin(a) * 7 - 1, 2, 2);
    }
  });

  // Draw laser beams
  state.laserBeams.forEach(lb => {
    const alpha = lb.life / lb.maxLife;
    const width = 3 + alpha * 5;
    ctx.strokeStyle = `rgba(255, 50, 50, ${alpha})`;
    ctx.lineWidth = width;
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 20 * alpha;
    ctx.beginPath();
    ctx.moveTo(lb.startX, lb.startY);
    ctx.lineTo(lb.endX, lb.endY);
    ctx.stroke();
    // Inner glow
    ctx.strokeStyle = `rgba(255, 200, 200, ${alpha * 0.8})`;
    ctx.lineWidth = width * 0.4;
    ctx.beginPath();
    ctx.moveTo(lb.startX, lb.startY);
    ctx.lineTo(lb.endX, lb.endY);
    ctx.stroke();
    ctx.shadowBlur = 0;
  });

  // Draw boss
  if (state.boss && !state.bossDefeated) {
    const b = state.boss;
    const flash = b.flashTimer > 0;
    ctx.save();
    ctx.translate(b.x, b.y);

    if (b.type === 'mothership') {
      // Large triangular ship
      ctx.fillStyle = flash ? '#ffffff' : '#884400';
      ctx.shadowColor = '#ff6600';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(-40, 20);
      ctx.lineTo(-15, 15);
      ctx.lineTo(0, 25);
      ctx.lineTo(15, 15);
      ctx.lineTo(40, 20);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Pulsing lights
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.005);
      ctx.fillStyle = `rgba(255, 100, 0, ${pulse})`;
      ctx.beginPath(); ctx.arc(-20, 10, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(20, 10, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -15, 3, 0, Math.PI * 2); ctx.fill();
    } else if (b.type === 'fortress') {
      // Rotating hexagonal station
      const rot = Date.now() * 0.001;
      ctx.fillStyle = flash ? '#ffffff' : '#445566';
      ctx.shadowColor = '#4488ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = rot + (i / 6) * Math.PI * 2;
        const method = i === 0 ? 'moveTo' : 'lineTo';
        ctx[method](Math.cos(a) * 35, Math.sin(a) * 35);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#6699cc';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Turrets
      for (let i = 0; i < 6; i++) {
        const a = rot + (i / 6) * Math.PI * 2;
        ctx.fillStyle = '#aabbcc';
        ctx.beginPath();
        ctx.arc(Math.cos(a) * 35, Math.sin(a) * 35, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Swarm queen - organic with tentacles
      ctx.fillStyle = flash ? '#ffffff' : '#660066';
      ctx.shadowColor = '#cc00cc';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.ellipse(0, 0, 35, 25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ff44ff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Tentacles
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI + Math.PI;
        const wave = Math.sin(Date.now() * 0.004 + i) * 8;
        ctx.strokeStyle = `rgba(200, 50, 200, 0.7)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 20);
        ctx.quadraticCurveTo(
          Math.cos(a) * 45 + wave, Math.sin(a) * 35,
          Math.cos(a) * 50, Math.sin(a) * 50 + wave
        );
        ctx.stroke();
      }
      // Eyes
      ctx.fillStyle = '#ff00ff';
      ctx.beginPath(); ctx.arc(-10, -5, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(10, -5, 4, 0, Math.PI * 2); ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // HP bar
    const barW = 80;
    const barH = 6;
    const barX = b.x - barW / 2;
    const barY = b.y - 40;
    const hpPct = b.hp / b.maxHp;
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barW, barH);
    const hpColor = hpPct > 0.5 ? '#44ff44' : hpPct > 0.25 ? '#ffaa00' : '#ff4444';
    ctx.fillStyle = hpColor;
    ctx.fillRect(barX, barY, barW * hpPct, barH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    // Boss name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    const bossNames: Record<string, string> = { mothership: 'MOTHERSHIP', fortress: 'FORTRESS', swarm_queen: 'SWARM QUEEN' };
    ctx.fillText(bossNames[b.type], b.x, barY - 4);
  }

  ctx.restore();

  // HUD
  drawHUD(ctx, state);

  // Level complete overlay
  if (state.levelComplete) {
    drawLevelComplete(ctx, state);
  }

  // Game over overlay

}

function drawCity(ctx: CanvasRenderingContext2D, x: number, groundY: number, zone: ZoneDefinition, cityIdx: number) {
  const buildings = [
    { ox: -18, w: 10, h: 20 },
    { ox: -8, w: 12, h: 28 },
    { ox: 5, w: 10, h: 22 },
    { ox: 14, w: 8, h: 16 },
  ];

  buildings.forEach((b, bIdx) => {
    const bx = x + b.ox;
    const by = groundY - b.h;

    ctx.fillStyle = getCachedBuildingGradient(ctx, zone.id, cityIdx, bIdx, bx, by, b.w, b.h, zone.buildingColors);
    ctx.fillRect(bx, by, b.w, b.h);

    ctx.fillStyle = zone.windowColor;
    for (let wy = by + 4; wy < groundY - 4; wy += 6) {
      for (let wx = bx + 2; wx < bx + b.w - 2; wx += 4) {
        if (Math.random() > 0.3) {
          ctx.fillRect(wx, wy, 2, 3);
        }
      }
    }

    ctx.strokeStyle = zone.buildingColors[0];
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, b.w, b.h);
  });
}

function drawDestroyedCity(ctx: CanvasRenderingContext2D, x: number, groundY: number) {
  ctx.fillStyle = '#553333';
  ctx.fillRect(x - 20, groundY - 5, 40, 5);
  ctx.fillStyle = '#442222';
  ctx.fillRect(x - 15, groundY - 8, 8, 8);
  ctx.fillRect(x + 5, groundY - 6, 6, 6);

  ctx.fillStyle = 'rgba(100, 60, 60, 0.3)';
  const t = Date.now() * 0.001;
  ctx.beginPath();
  ctx.arc(x + Math.sin(t) * 5, groundY - 15, 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawBattery(ctx: CanvasRenderingContext2D, battery: MissileBattery) {
  const x = battery.x;
  const y = battery.y;
  const isDisabled = battery.disabled > 0;

  ctx.fillStyle = isDisabled ? '#443355' : '#556677';
  ctx.beginPath();
  ctx.moveTo(x - 20, y);
  ctx.lineTo(x - 12, y - 18);
  ctx.lineTo(x + 12, y - 18);
  ctx.lineTo(x + 20, y);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = isDisabled ? '#6644aa' : '#7799aa';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - 20, y);
  ctx.lineTo(x - 12, y - 18);
  ctx.lineTo(x + 12, y - 18);
  ctx.lineTo(x + 20, y);
  ctx.closePath();
  ctx.stroke();

  if (isDisabled) {
    // EMP disabled visual
    const t = Date.now() * 0.01;
    ctx.strokeStyle = `rgba(130, 100, 255, ${0.4 + Math.sin(t) * 0.3})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y - 9, 14, 0, Math.PI * 2);
    ctx.stroke();
    // Sparks
    for (let i = 0; i < 3; i++) {
      const angle = t + (i * Math.PI * 2) / 3;
      const sparkX = x + Math.cos(angle) * 12;
      const sparkY = y - 9 + Math.sin(angle) * 12;
      ctx.fillStyle = '#aa88ff';
      ctx.fillRect(sparkX - 1, sparkY - 1, 2, 2);
    }
  }

  const ammoY = y - 14;
  for (let i = 0; i < battery.ammo; i++) {
    ctx.fillStyle = isDisabled ? '#6644aa' : '#88ff88';
    const ax = x - 8 + (i % 5) * 4;
    const ay = ammoY + Math.floor(i / 5) * 5;
    ctx.fillRect(ax, ay, 2, 4);
  }
}

function drawBomber(ctx: CanvasRenderingContext2D, bomber: Bomber) {
  const x = bomber.x;
  const y = bomber.y;

  // Body
  ctx.fillStyle = '#556677';
  ctx.beginPath();
  ctx.ellipse(x, y, 25, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cockpit
  ctx.fillStyle = '#88aacc';
  ctx.beginPath();
  ctx.ellipse(x + 15 * bomber.direction, y - 2, 6, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wings
  ctx.fillStyle = '#445566';
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.lineTo(x - 5, y - 18);
  ctx.lineTo(x + 5, y - 15);
  ctx.lineTo(x + 10, y);
  ctx.closePath();
  ctx.fill();

  // Tail
  ctx.beginPath();
  ctx.moveTo(x - 20 * bomber.direction, y);
  ctx.lineTo(x - 25 * bomber.direction, y - 10);
  ctx.lineTo(x - 15 * bomber.direction, y);
  ctx.closePath();
  ctx.fill();

  // Engine glow
  ctx.fillStyle = '#ff8844';
  ctx.shadowColor = '#ff6600';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(x - 20 * bomber.direction, y + 2, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Warning indicator
  if (bomber.dropsRemaining > 0) {
    const t = Date.now() * 0.005;
    ctx.fillStyle = `rgba(255, 50, 50, ${0.5 + Math.sin(t) * 0.3})`;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚠', x, y - 22);
  }
}

function drawAsteroid(ctx: CanvasRenderingContext2D, asteroid: Asteroid) {
  ctx.save();
  ctx.translate(asteroid.x, asteroid.y);
  ctx.rotate(asteroid.rotation);

  // Rocky body
  ctx.fillStyle = '#667788';
  ctx.beginPath();
  const points = 8;
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = asteroid.radius * (0.7 + Math.sin(i * 3.7) * 0.3);
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // Craters
  ctx.fillStyle = '#556677';
  ctx.beginPath();
  ctx.arc(asteroid.radius * 0.2, -asteroid.radius * 0.1, asteroid.radius * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-asteroid.radius * 0.3, asteroid.radius * 0.2, asteroid.radius * 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Outline
  ctx.strokeStyle = '#8899aa';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = asteroid.radius * (0.7 + Math.sin(i * 3.7) * 0.3);
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  // HP indicator
  if (asteroid.hp > 1) {
    ctx.fillStyle = '#aabbcc';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${asteroid.hp}`, 0, 4);
  }

  ctx.restore();

  // Trail
  ctx.strokeStyle = 'rgba(100, 120, 140, 0.3)';
  ctx.lineWidth = asteroid.radius * 0.5;
  ctx.beginPath();
  ctx.moveTo(asteroid.x, asteroid.y);
  ctx.lineTo(asteroid.x - asteroid.vx * 15, asteroid.y - asteroid.vy * 15);
  ctx.stroke();
}

function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const size = 15;
  const t = Date.now() * 0.005;
  const pulse = 1 + Math.sin(t) * 0.15;

  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 6;

  ctx.beginPath();
  ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - size * 1.5, y);
  ctx.lineTo(x - size * 0.6, y);
  ctx.moveTo(x + size * 0.6, y);
  ctx.lineTo(x + size * 1.5, y);
  ctx.moveTo(x, y - size * 1.5);
  ctx.lineTo(x, y - size * 0.6);
  ctx.moveTo(x, y + size * 0.6);
  ctx.lineTo(x, y + size * 1.5);
  ctx.stroke();

  ctx.fillStyle = '#00ff88';
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
}

function drawHUD(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.textAlign = 'left';
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#44ff88';
  ctx.fillText(`SCORE: ${state.score}`, 10, 25);

  ctx.textAlign = 'right';
  const zone = getZone(state.level);
  ctx.fillStyle = zone.groundColors[0];
  ctx.fillText(`ZONE ${zone.id}: ${zone.name}`, CANVAS_WIDTH - 10, 25);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '13px monospace';
  ctx.fillText(`LEVEL ${state.level}`, CANVAS_WIDTH / 2, 25);

  // Boss level indicator
  if (state.isBossLevel && !state.bossDefeated) {
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('⚠ BOSS FIGHT ⚠', CANVAS_WIDTH / 2, 42);
  }

  // Combo display
  if (state.comboCount >= 2) {
    const scale = 1 + Math.min(state.comboCount * 0.05, 0.5);
    const comboColors = ['#ffffff', '#ffdd44', '#ffaa44', '#ff6644', '#ff44ff'];
    const colorIdx = Math.min(Math.floor(state.comboCount / 4), comboColors.length - 1);
    ctx.save();
    ctx.translate(CANVAS_WIDTH / 2, 60);
    ctx.scale(scale, scale);
    ctx.fillStyle = comboColors[colorIdx];
    ctx.font = `bold ${14}px monospace`;
    ctx.textAlign = 'center';
    const timerPct = state.comboTimer / 90;
    ctx.globalAlpha = 0.5 + timerPct * 0.5;
    ctx.fillText(`COMBO ${state.comboCount} • x${state.comboMultiplier}`, 0, 0);
    // Timer bar
    ctx.fillStyle = comboColors[colorIdx];
    ctx.globalAlpha = 0.3 + timerPct * 0.4;
    ctx.fillRect(-40, 4, 80 * timerPct, 3);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Special weapon HUD
  const weaponIcons: Record<string, string> = { laser: '🔫', swarm: '🎆', mine: '💣' };
  const weaponColors: Record<string, string> = { laser: '#ff4444', swarm: '#ff8800', mine: '#ff44ff' };
  state.specialWeapons.forEach((w, i) => {
    if (w.maxCharges <= 0) return;
    const wx = 10 + i * 90;
    const wy = CANVAS_HEIGHT - 30;
    const selected = state.selectedWeapon === i;
    ctx.fillStyle = selected ? weaponColors[w.type] : '#333333';
    ctx.globalAlpha = selected ? 0.6 : 0.4;
    ctx.fillRect(wx, wy, 80, 24);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = selected ? weaponColors[w.type] : '#555';
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(wx, wy, 80, 24);
    ctx.fillStyle = w.charges > 0 ? '#ffffff' : '#666666';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${i + 1} ${weaponIcons[w.type]} ${w.charges}/${w.maxCharges}`, wx + 4, wy + 16);
  });

  // Ammo indicators
  ctx.textAlign = 'center';
  state.batteries.forEach((b) => {
    const ammoAlpha = b.ammo / b.maxAmmo;
    ctx.fillStyle = `rgba(100, 200, 255, ${0.5 + ammoAlpha * 0.5})`;
    ctx.font = '11px monospace';
    ctx.fillText(`${b.ammo}`, b.x, b.y - 15);
  });

  // Achievement Toasts
  state.achievementToasts.forEach((t, i) => {
    const alpha = Math.min(1, t.timer / 20);
    const y = 70 + i * 45;
    const w = 240;
    const x = CANVAS_WIDTH / 2 - w / 2;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x, y, w, 40);
    ctx.strokeStyle = '#ffdd44';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, 40);

    ctx.fillStyle = '#ffdd44';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('🏆 ACHIEVEMENT UNLOCKED!', x + 10, y + 16);

    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText(`${t.icon} ${t.text}`, x + 10, y + 32);
    ctx.globalAlpha = 1;
  });
}

function drawLevelComplete(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`LEVEL ${state.level} COMPLETE`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

  const currentZone = getZoneIndex(state.level);
  const nextZone = getZoneIndex(state.level + 1);

  ctx.font = '18px monospace';
  ctx.fillStyle = '#aaaaaa';
  if (nextZone !== currentZone) {
    ctx.fillStyle = '#ffaa44';
    ctx.fillText(`Entering ${ZONES[nextZone].name}...`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
  } else {
    ctx.fillText('Starting next wave...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
  }
}

function getPrestigeButtonRect(colX: number, colW: number, y: number) {
  const btnW = 80;
  const btnH = 30;
  return {
    x: colX + colW - btnW - 15,
    y: y + 20,
    w: btnW,
    h: btnH,
  };
}

function drawPrestigeShop(ctx: CanvasRenderingContext2D, stats: PersistentStats) {
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  grad.addColorStop(0, '#1a0a2e');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Grid
  ctx.strokeStyle = 'rgba(255, 170, 68, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < CANVAS_WIDTH; i += 40) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_HEIGHT); ctx.stroke();
  }
  for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(CANVAS_WIDTH, i); ctx.stroke();
  }

  // Header
  ctx.fillStyle = '#ffaa44';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#ffaa44';
  ctx.shadowBlur = 15;
  ctx.fillText('⭐ PRESTIGE SHOP ⭐', CANVAS_WIDTH / 2, 50);
  ctx.shadowBlur = 0;

  ctx.font = '18px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Prestige Level: ${stats.prestigeLevel}  •  Points Available: ${stats.prestigePoints}`, CANVAS_WIDTH / 2, 85);

  // Upgrades
  const startY = 130;
  const colW = 400;
  const rowH = 70;
  const col1X = CANVAS_WIDTH / 2 - colW / 2;

  PRESTIGE_UPGRADE_DEFS.forEach((def, i) => {
    const y = startY + i * (rowH + 10);
    const currentLevel = stats.prestigeBonuses[def.key];
    const maxed = currentLevel >= def.maxLevel;
    const canAfford = stats.prestigePoints >= def.cost;

    // Card bg
    ctx.fillStyle = maxed ? 'rgba(100, 255, 100, 0.1)' : 'rgba(255, 170, 68, 0.1)';
    ctx.fillRect(col1X, y, colW, rowH);
    ctx.strokeStyle = maxed ? '#44ff88' : '#ffaa44';
    ctx.lineWidth = 1;
    ctx.strokeRect(col1X, y, colW, rowH);

    // Icon & Name
    ctx.textAlign = 'left';
    ctx.font = '24px monospace';
    ctx.fillText(def.icon, col1X + 15, y + 42);

    ctx.fillStyle = maxed ? '#44ff88' : '#ffaa44';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`${def.name} (${currentLevel}/${def.maxLevel})`, col1X + 55, y + 25);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '12px monospace';
    ctx.fillText(def.description, col1X + 55, y + 50);

    // Cost / Buy Button
    if (maxed) {
      ctx.fillStyle = '#44ff88';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('MAXED', col1X + colW - 20, y + 40);
    } else {
      const { x: btnX, y: btnY, w: btnW, h: btnH } = getPrestigeButtonRect(col1X, colW, y);

      ctx.fillStyle = canAfford ? '#ffaa44' : '#555555';
      ctx.fillRect(btnX, btnY, btnW, btnH);
      ctx.fillStyle = canAfford ? '#000000' : '#888888';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${def.cost} pts`, btnX + btnW / 2, btnY + 19);
    }
  });

  // Back Button
  const backY = CANVAS_HEIGHT - 60;
  const backW = 200;
  const backH = 40;
  const backX = CANVAS_WIDTH / 2 - backW / 2;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(backX, backY, backW, backH);
  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(backX, backY, backW, backH);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BACK TO TITLE', CANVAS_WIDTH / 2, backY + 26);
}

function drawGameOver(ctx: CanvasRenderingContext2D, state: GameState, stats?: PersistentStats) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = '#ff4444';
  ctx.font = 'bold 48px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 80);

  ctx.fillStyle = '#ffffff';
  ctx.font = '24px monospace';
  ctx.fillText(`FINAL SCORE: ${state.score}`, CANVAS_WIDTH / 2, 130);

  // Persistent high score
  const persistHigh = stats ? Math.max(stats.highScore, state.score) : state.highScore;
  ctx.font = '14px monospace';
  ctx.fillStyle = state.score >= persistHigh ? '#ffdd44' : '#888888';
  ctx.fillText(state.score >= persistHigh ? '★ NEW HIGH SCORE! ★' : `HIGH SCORE: ${persistHigh}`, CANVAS_WIDTH / 2, 155);

  ctx.font = '16px monospace';
  ctx.fillStyle = '#aaaaaa';
  const zone = getZone(state.level);
  ctx.fillText(`Reached Level ${state.level} — ${zone.name}`, CANVAS_WIDTH / 2, 185);

  // Zone progress bar
  const barW = 400;
  const barH = 18;
  const barX = (CANVAS_WIDTH - barW) / 2;
  const barY = 200;

  ctx.fillStyle = 'rgba(30, 30, 50, 0.8)';
  ctx.fillRect(barX, barY, barW, barH);
  ctx.strokeStyle = '#444466';
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barW, barH);

  ZONES.forEach((z, i) => {
    const segW = barW / ZONES.length;
    const segX = barX + i * segW;
    const reached = state.level >= z.levels[0];
    ctx.fillStyle = reached ? z.groundStrokeColor : 'rgba(40, 40, 60, 0.5)';
    ctx.fillRect(segX + 1, barY + 1, segW - 2, barH - 2);
    ctx.fillStyle = reached ? '#ffffff' : '#666666';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(z.name.split(' ')[0], segX + segW / 2, barY + 12);
  });

  // ─── Run Stats ──────────────────────────────────────────────────
  const statsY = 250;
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#44aaff';
  ctx.textAlign = 'center';
  ctx.fillText('── RUN STATS ──', CANVAS_WIDTH / 2, statsY);

  const runStats = [
    { label: '🎯 Missiles Destroyed', value: `${state.runMissilesDestroyed}` },
    { label: '🔥 Best Combo', value: `${state.maxCombo}x` },
    { label: '👑 Bosses Defeated', value: `${state.runBossesDefeated}` },
    { label: '🏙️ Cities Saved', value: `${state.cities.filter(c => c.alive).length}/6` },
  ];

  ctx.font = '13px monospace';
  const col1X = CANVAS_WIDTH / 2 - 150;
  const col2X = CANVAS_WIDTH / 2 + 150;
  runStats.forEach((rs, i) => {
    const sx = i < 2 ? col1X : col2X;
    const sy = statsY + 22 + (i % 2) * 22;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText(rs.label, sx - 100, sy);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(rs.value, sx + 100, sy);
  });

  // ─── Prestige Preview ──────────────────────────────────────────
  const pp = calcPrestigePoints(state);
  if (state.level >= 5 && pp > 0) {
    const pY = statsY + 80;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffaa44';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`⭐ Prestige available! Earn ${pp} Prestige Points ⭐`, CANVAS_WIDTH / 2, pY);
    ctx.font = '12px monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('(Prestige resets your run but grants permanent bonuses)', CANVAS_WIDTH / 2, pY + 18);

    // Prestige button
    const btnW = 200;
    const btnH = 36;
    const btnX = CANVAS_WIDTH / 2 - btnW / 2;
    const btnY_btn = pY + 28;
    ctx.fillStyle = 'rgba(255, 170, 68, 0.2)';
    ctx.fillRect(btnX, btnY_btn, btnW, btnH);
    ctx.strokeStyle = '#ffaa44';
    ctx.lineWidth = 2;
    ctx.strokeRect(btnX, btnY_btn, btnW, btnH);
    ctx.fillStyle = '#ffaa44';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('PRESTIGE', CANVAS_WIDTH / 2, btnY_btn + 24);
  }

  // ─── Lifetime Stats ────────────────────────────────────────────
  if (stats) {
    const lY = state.level >= 5 && pp > 0 ? statsY + 165 : statsY + 85;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666688';
    ctx.font = '11px monospace';
    const prestigeStr = stats.prestigeLevel > 0 ? ` • ⭐ Prestige ${stats.prestigeLevel}` : '';
    ctx.fillText(`Games: ${stats.totalGames} • Lifetime Score: ${stats.totalScore} • Achievements: ${stats.achievements.length}/${ACHIEVEMENT_DEFS.length}${prestigeStr}`, CANVAS_WIDTH / 2, lY);
  }

  // ─── Newly Unlocked Achievements ───────────────────────────────
  const toasts = state.achievementToasts;
  if (toasts.length > 0) {
    const aY = 440;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffdd44';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('🏆 ACHIEVEMENTS UNLOCKED! 🏆', CANVAS_WIDTH / 2, aY);
    toasts.forEach((t, i) => {
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(`${t.icon} ${t.text}`, CANVAS_WIDTH / 2, aY + 20 + i * 18);
    });
  }

  // Play again / prestige instructions
  ctx.fillStyle = '#44ff88';
  ctx.font = '18px monospace';
  ctx.textAlign = 'center';
  const bottomY = CANVAS_HEIGHT - 40;
  ctx.fillText('Click to Play Again', CANVAS_WIDTH / 2, bottomY);
}

// ─── Zone Intro Screen ─────────────────────────────────────────────────
function drawZoneIntro(ctx: CanvasRenderingContext2D, state: GameState) {
  const nextZone = getZone(state.level + 1);
  const progress = 1 - state.zoneIntroTimer / 240;

  // Background transition
  ctx.fillStyle = getCachedSkyGradient(ctx, nextZone);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Stars
  state.stars.forEach((star) => {
    const twinkle = star.brightness * (0.5 + 0.5 * Math.sin(Date.now() * 0.003 + star.x));
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * Math.min(1, progress * 2)})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  // Ground preview
  const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;
  const groundAlpha = Math.min(1, progress * 1.5);
  ctx.globalAlpha = groundAlpha;
  ctx.fillStyle = getCachedGroundGradient(ctx, nextZone);
  ctx.fillRect(0, groundY, CANVAS_WIDTH, GROUND_HEIGHT);
  ctx.strokeStyle = nextZone.groundStrokeColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(CANVAS_WIDTH, groundY);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Scan lines
  ctx.fillStyle = 'rgba(0, 255, 100, 0.01)';
  for (let y = 0; y < CANVAS_HEIGHT; y += 3) {
    ctx.fillRect(0, y, CANVAS_WIDTH, 1);
  }

  // Zone number and name with dramatic reveal
  const textAlpha = Math.min(1, progress * 3);
  ctx.globalAlpha = textAlpha;

  // Zone number
  ctx.fillStyle = nextZone.groundStrokeColor;
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = nextZone.groundStrokeColor;
  ctx.shadowBlur = 20;
  ctx.fillText(`— ZONE ${nextZone.id} —`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
  ctx.shadowBlur = 0;

  // Zone name - big dramatic text
  const nameScale = Math.min(1, progress * 2);
  ctx.save();
  ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
  ctx.scale(nameScale, nameScale);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px monospace';
  ctx.shadowColor = nextZone.groundStrokeColor;
  ctx.shadowBlur = 30;
  ctx.fillText(nextZone.name, 0, 0);
  ctx.shadowBlur = 0;
  ctx.restore();

  // Subtitle
  if (progress > 0.3) {
    const subAlpha = Math.min(1, (progress - 0.3) * 3);
    ctx.globalAlpha = subAlpha;
    ctx.fillStyle = '#aaaacc';
    ctx.font = 'italic 18px monospace';
    ctx.fillText(nextZone.subtitle, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
  }

  // Hazard warnings appear one by one
  if (progress > 0.5) {
    const hazards: { icon: string; text: string; color: string }[] = [];
    if (nextZone.hasHeatSeekers) hazards.push({ icon: '🔥', text: 'Heat-Seeking Missiles', color: '#ff66aa' });
    if (nextZone.hasBombers) hazards.push({ icon: '✈️', text: 'Bomber Aircraft', color: '#8899bb' });
    if (nextZone.hasBlizzard) hazards.push({ icon: '❄️', text: 'Blizzard Conditions', color: '#aaddff' });
    if (nextZone.hasDecoys) hazards.push({ icon: '👻', text: 'Decoy Missiles', color: '#bbbbbb' });
    if (nextZone.hasAsteroids) hazards.push({ icon: '☄️', text: 'Asteroid Storms', color: '#aabbcc' });
    if (nextZone.hasEmpEnemies) hazards.push({ icon: '⚡', text: 'EMP Warheads', color: '#aa88ff' });

    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff6644';
    const warningAlpha = Math.min(1, (progress - 0.5) * 4);
    ctx.globalAlpha = warningAlpha;
    ctx.fillText('⚠ NEW THREATS ⚠', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 65);

    hazards.forEach((h, i) => {
      const hDelay = 0.55 + i * 0.06;
      if (progress > hDelay) {
        const hAlpha = Math.min(1, (progress - hDelay) * 5);
        ctx.globalAlpha = hAlpha;
        ctx.fillStyle = h.color;
        ctx.font = '13px monospace';
        ctx.fillText(`${h.icon} ${h.text}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 90 + i * 22);
      }
    });
  }

  ctx.globalAlpha = 1;

  // Speed/difficulty info
  if (progress > 0.8) {
    const infoAlpha = Math.min(1, (progress - 0.8) * 5);
    ctx.globalAlpha = infoAlpha;
    ctx.fillStyle = '#ffaa44';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Speed ×${nextZone.speedMultiplier.toFixed(1)}  •  Spawn ×${nextZone.spawnMultiplier.toFixed(1)}`,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 90 + 22 * 6 + 10
    );
    ctx.globalAlpha = 1;
  }

  // Zone progress bar at bottom
  const barW = 500;
  const barH = 24;
  const barX = (CANVAS_WIDTH - barW) / 2;
  const barY = CANVAS_HEIGHT - 60;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.beginPath();
  ctx.roundRect(barX - 2, barY - 2, barW + 4, barH + 4, 6);
  ctx.fill();

  ZONES.forEach((z, i) => {
    const segW = barW / ZONES.length;
    const segX = barX + i * segW;
    const isCurrent = z.id === nextZone.id;
    const isPast = z.id < nextZone.id;

    ctx.fillStyle = isCurrent
      ? nextZone.groundStrokeColor
      : isPast
        ? 'rgba(100, 200, 100, 0.4)'
        : 'rgba(40, 40, 60, 0.4)';
    ctx.beginPath();
    ctx.roundRect(segX + 2, barY + 2, segW - 4, barH - 4, 3);
    ctx.fill();

    if (isCurrent) {
      ctx.strokeStyle = nextZone.groundStrokeColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = nextZone.groundStrokeColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(segX + 2, barY + 2, segW - 4, barH - 4, 3);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = isCurrent ? '#ffffff' : isPast ? '#aaffaa' : '#555555';
    ctx.font = isCurrent ? 'bold 9px monospace' : '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(z.name.split(' ')[0], segX + segW / 2, barY + 15);
  });
}

// ─── Shop Rendering ────────────────────────────────────────────────────
function drawShop(ctx: CanvasRenderingContext2D, state: GameState) {
  const zone = getZone(state.level);

  // Background
  const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  skyGrad.addColorStop(0, '#050515');
  skyGrad.addColorStop(0.5, '#0a0a28');
  skyGrad.addColorStop(1, '#12082a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  state.stars.forEach((star) => {
    const twinkle = star.brightness * (0.3 + 0.2 * Math.sin(Date.now() * 0.002 + star.x));
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
    ctx.fillRect(star.x, star.y, 1, 1);
  });

  ctx.fillStyle = 'rgba(0, 255, 100, 0.015)';
  for (let y = 0; y < CANVAS_HEIGHT; y += 3) {
    ctx.fillRect(0, y, CANVAS_WIDTH, 1);
  }

  // Header
  ctx.fillStyle = '#44ff88';
  ctx.font = 'bold 32px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#44ff88';
  ctx.shadowBlur = 15;
  ctx.fillText('⚙ UPGRADE SHOP ⚙', CANVAS_WIDTH / 2, 48);
  ctx.shadowBlur = 0;

  // Zone and level info
  ctx.fillStyle = zone.groundStrokeColor;
  ctx.font = '12px monospace';
  ctx.fillText(`${zone.name} — Preparing for Level ${state.level + 1}`, CANVAS_WIDTH / 2, 72);

  // Next zone warning
  const nextZoneId = getZoneIndex(state.level + 1);
  const currentZoneId = getZoneIndex(state.level);
  if (nextZoneId !== currentZoneId) {
    ctx.fillStyle = '#ff8844';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`⚠ ENTERING ${ZONES[nextZoneId].name} NEXT ⚠`, CANVAS_WIDTH / 2, 90);
  }

  // Score display
  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffdd44';
  ctx.font = 'bold 20px monospace';
  ctx.shadowColor = '#ffdd44';
  ctx.shadowBlur = 8;
  ctx.fillText(`⬡ ${state.score}`, CANVAS_WIDTH - 30, 48);
  ctx.shadowBlur = 0;
  ctx.font = '12px monospace';
  ctx.fillStyle = '#888';
  ctx.fillText('available points', CANVAS_WIDTH - 30, 65);

  // Draw upgrade cards
  UPGRADE_DEFS.forEach((def, i) => {
    const rect = getShopCardRect(i);
    const currentLevel = state.upgrades[def.key];
    const isMaxed = currentLevel >= def.maxLevel;
    const cost = isMaxed ? 0 : getUpgradeCost(def, currentLevel);
    const canAfford = state.score >= cost && !isMaxed;
    const isHovered = state.shopHover === i;

    const isRepair = def.key === 'armorPlating';
    const hasDestroyedCity = state.cities.some((c) => !c.alive);
    const repairDisabled = isRepair && !hasDestroyedCity;

    drawUpgradeCard(ctx, rect, def, currentLevel, cost, canAfford && !repairDisabled, isMaxed || (isRepair && !hasDestroyedCity && isMaxed), isHovered);
  });

  // Continue button
  const continueY = SHOP_START_Y + Math.ceil(UPGRADE_DEFS.length / SHOP_COLS) * (SHOP_CARD_H + SHOP_GAP - 2) + 12;
  const btnW = 240;
  const btnH = 48;
  const btnX = (CANVAS_WIDTH - btnW) / 2;

  const isHoverContinue = state.shopHover === 99;

  if (isHoverContinue) {
    ctx.shadowColor = '#44ff88';
    ctx.shadowBlur = 20;
  }

  const btnGrad = ctx.createLinearGradient(btnX, continueY, btnX, continueY + btnH);
  btnGrad.addColorStop(0, isHoverContinue ? '#226644' : '#1a4a30');
  btnGrad.addColorStop(1, isHoverContinue ? '#184430' : '#0e3020');
  ctx.fillStyle = btnGrad;
  ctx.beginPath();
  ctx.roundRect(btnX, continueY, btnW, btnH, 8);
  ctx.fill();

  ctx.strokeStyle = isHoverContinue ? '#66ffaa' : '#44aa66';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(btnX, continueY, btnW, btnH, 8);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#44ff88';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('▶ NEXT WAVE', CANVAS_WIDTH / 2, continueY + 30);

  // Stats bar
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, CANVAS_HEIGHT - 36, CANVAS_WIDTH, 36);
  ctx.strokeStyle = 'rgba(100, 255, 150, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, CANVAS_HEIGHT - 36);
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 36);
  ctx.stroke();

  ctx.font = '12px monospace';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#667788';
  const aliveCities = state.cities.filter((c) => c.alive).length;
  const maxAmmo = getAmmoPerBattery(state.upgrades);
  const blastR = getExplosionRadius(state.upgrades);
  const speed = getCounterMissileSpeed(state.upgrades).toFixed(1);
  ctx.fillText(
    `Cities: ${aliveCities}/6  |  Ammo/Battery: ${maxAmmo}  |  Blast: ${blastR}px  |  Speed: ${speed}  |  Zone: ${zone.name}  |  Total Spent: ${state.totalSpent}`,
    20,
    CANVAS_HEIGHT - 14
  );
}

function drawUpgradeCard(
  ctx: CanvasRenderingContext2D,
  rect: { x: number; y: number; w: number; h: number },
  def: UpgradeDefinition,
  currentLevel: number,
  cost: number,
  canAfford: boolean,
  isMaxed: boolean,
  isHovered: boolean
) {
  const { x, y, w, h } = rect;

  const bgAlpha = isHovered ? 0.4 : 0.25;
  const borderColor = isMaxed
    ? 'rgba(100, 100, 100, 0.4)'
    : canAfford
      ? isHovered
        ? def.color
        : `rgba(${hexToRgb(def.color)}, 0.6)`
      : 'rgba(80, 80, 80, 0.4)';

  if (isHovered && canAfford) {
    ctx.shadowColor = def.color;
    ctx.shadowBlur = 12;
  }

  ctx.fillStyle = `rgba(20, 20, 40, ${bgAlpha + 0.3})`;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = isHovered && canAfford ? 2 : 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.font = '24px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(def.icon, x + 10, y + 34);

  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = isMaxed ? '#666666' : canAfford ? '#ffffff' : '#888888';
  ctx.fillText(def.name, x + 44, y + 22);

  ctx.font = '10px monospace';
  ctx.fillStyle = isMaxed ? '#555555' : '#8899aa';
  ctx.fillText(def.description, x + 44, y + 36);

  const pipStartX = x + 44;
  const pipY = y + 52;
  for (let i = 0; i < def.maxLevel; i++) {
    const filled = i < currentLevel;
    ctx.fillStyle = filled ? def.color : 'rgba(60, 60, 80, 0.8)';
    ctx.beginPath();
    ctx.roundRect(pipStartX + i * 18, pipY, 14, 6, 2);
    ctx.fill();
    if (filled) {
      ctx.shadowColor = def.color;
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  ctx.textAlign = 'right';
  if (isMaxed) {
    ctx.fillStyle = '#556655';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('MAXED', x + w - 12, y + 22);
  } else {
    ctx.fillStyle = canAfford ? '#ffdd44' : '#664422';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`⬡ ${cost}`, x + w - 12, y + 22);

    if (isHovered && canAfford) {
      ctx.fillStyle = 'rgba(68, 255, 136, 0.8)';
      ctx.font = '10px monospace';
      ctx.fillText('CLICK TO BUY', x + w - 12, y + 58);
    }
  }
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// ─── Title Screen ───────────────────────────────────────────────────────
function drawTitleScreen(ctx: CanvasRenderingContext2D, state: GameState, stats?: PersistentStats) {
  ctx.fillStyle = getCachedSkyGradient(ctx, ZONES[0]);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  state.stars.forEach((star) => {
    const twinkle = star.brightness * (0.5 + 0.5 * Math.sin(Date.now() * 0.003 + star.x));
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  const t = Date.now() * 0.001;
  for (let i = 0; i < 5; i++) {
    const mx = ((t * 30 + i * 200) % (CANVAS_WIDTH + 100)) - 50;
    const my = 100 + i * 80 + Math.sin(t + i) * 20;
    ctx.strokeStyle = `rgba(255, 80, 50, ${0.3 + Math.sin(t + i) * 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mx - 40, my - 20);
    ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(mx, my, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#ff4444';
  ctx.font = 'bold 56px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 20;
  ctx.fillText('MISSILE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
  ctx.fillStyle = '#44aaff';
  ctx.shadowColor = '#4488ff';
  ctx.fillText('COMMAND', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 45);
  ctx.shadowBlur = 0;

  // Zone subtitle
  ctx.fillStyle = '#ffaa44';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('ZONE DEFENSE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 5);

  ctx.fillStyle = '#aaaaaa';
  ctx.font = '14px monospace';
  ctx.fillText('Click to aim and fire counter-missiles', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35);
  ctx.fillText('Defend your cities across 5 dangerous zones!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 55);

  // Stats Display
  if (stats) {
    const sY = CANVAS_HEIGHT / 2 + 85;
    ctx.fillStyle = '#666688';
    ctx.font = '11px monospace';
    const unlocked = stats.achievements.length;
    const total = ACHIEVEMENT_DEFS.length;
    const prestige = stats.prestigeLevel > 0 ? ` • ⭐ Prestige ${stats.prestigeLevel}` : '';
    ctx.fillText(`Games: ${stats.totalGames} • High Score: ${stats.highScore}`, CANVAS_WIDTH / 2, sY);
    ctx.fillText(`🏆 Achievements: ${unlocked}/${total}${prestige}`, CANVAS_WIDTH / 2, sY + 16);
  }

  // Konami code hint - very subtle
  ctx.fillStyle = '#222233';
  ctx.font = '10px monospace';
  ctx.fillText('↑↑↓↓←→←→BA', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 15);

  // Zone preview
  ctx.font = '11px monospace';
  const zonePreviewY = CANVAS_HEIGHT / 2 + 120;
  ZONES.forEach((z, i) => {
    ctx.fillStyle = z.groundStrokeColor;
    ctx.fillText(`Zone ${i + 1}: ${z.name}`, CANVAS_WIDTH / 2, zonePreviewY + i * 18);
  });

  const blink = Math.sin(Date.now() * 0.004) > 0;
  if (blink) {
    ctx.fillStyle = '#44ff88';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('CLICK TO START', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 230);
  }
}

// ─── Auto-Play AI ───────────────────────────────────────────────────────
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

interface AutoPlayState {
  active: boolean;
  fireTimer: number;
  shopTimer: number;
  shopBuyTimer: number;
  zoneIntroTimer: number;
  targetX: number;
  targetY: number;
  scanTimer: number;
  activationFlash: number;
  deactivationFlash: number;
}

function initAutoPlay(): AutoPlayState {
  return {
    active: false,
    fireTimer: 0,
    shopTimer: 0,
    shopBuyTimer: 0,
    zoneIntroTimer: 0,
    targetX: CANVAS_WIDTH / 2,
    targetY: CANVAS_HEIGHT / 2,
    scanTimer: 0,
    activationFlash: 0,
    deactivationFlash: 0,
  };
}

// AI: Prioritize upgrades based on strategy
const AI_UPGRADE_PRIORITY: (keyof Upgrades)[] = [
  'blastRadius',
  'extraAmmo',
  'missileSpeed',
  'chainReaction',
  'multiShot',
  'shieldGenerator',
  'autoTurret',
  'empBurst',
  'luckyStrike',
  'armorPlating',
];

function autoPlayBuyUpgrade(state: GameState): GameState {
  // Try to buy the highest priority affordable upgrade
  for (const key of AI_UPGRADE_PRIORITY) {
    const def = UPGRADE_DEFS.find((d) => d.key === key);
    if (!def) continue;

    const currentLevel = state.upgrades[def.key];
    if (currentLevel >= def.maxLevel) continue;

    // For city repair, only buy if a city is destroyed
    if (def.key === 'armorPlating') {
      const destroyedIdx = state.cities.findIndex((c) => !c.alive);
      if (destroyedIdx === -1) continue;

      const cost = getUpgradeCost(def, currentLevel);
      if (state.score < cost) continue;

      const newState = { ...state };
      newState.score -= cost;
      newState.totalSpent += cost;
      newState.upgrades = { ...newState.upgrades, [def.key]: currentLevel + 1 };
      newState.cities = [...newState.cities];
      newState.cities[destroyedIdx] = { ...newState.cities[destroyedIdx], alive: true };
      newState.shieldHits = [...newState.shieldHits];
      newState.shieldHits[destroyedIdx] = 0;
      return newState;
    }

    const cost = getUpgradeCost(def, currentLevel);
    // AI is strategic: keep a reserve of 20% of score or 200 points minimum
    const reserve = Math.max(200, state.score * 0.2);
    if (state.score - cost < reserve && state.score > cost * 2) continue;
    if (state.score < cost) continue;

    const newState = { ...state };
    newState.score -= cost;
    newState.totalSpent += cost;
    newState.upgrades = { ...newState.upgrades, [def.key]: currentLevel + 1 };
    return newState;
  }
  return state;
}

function solveInterceptTime(
  originX: number,
  originY: number,
  targetX: number,
  targetY: number,
  velX: number,
  velY: number,
  projectileSpeed: number
): number | null {
  const relX = targetX - originX;
  const relY = targetY - originY;
  const a = velX * velX + velY * velY - projectileSpeed * projectileSpeed;
  const b = 2 * (relX * velX + relY * velY);
  const c = relX * relX + relY * relY;

  if (Math.abs(a) < 1e-6) {
    if (Math.abs(b) < 1e-6) return null;
    const t = -c / b;
    return t > 0 ? t : null;
  }

  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;
  const sqrtDisc = Math.sqrt(disc);
  const t1 = (-b - sqrtDisc) / (2 * a);
  const t2 = (-b + sqrtDisc) / (2 * a);
  const t = Math.min(t1 > 0 ? t1 : Infinity, t2 > 0 ? t2 : Infinity);
  if (!isFinite(t)) return null;
  if (t > 300) return null;
  return t;
}

function findBestIntercept(
  state: GameState,
  targetX: number,
  targetY: number,
  velX: number,
  velY: number
): { x: number; y: number; time: number } | null {
  let bestTime = Infinity;
  let bestPoint: { x: number; y: number; time: number } | null = null;
  const projectileSpeed = getCounterMissileSpeed(state.upgrades);

  state.batteries.forEach((b) => {
    const hasAmmo = state.autoMode || b.ammo > 0;
    if (!hasAmmo || b.disabled > 0) return;
    const originX = b.x;
    const originY = b.y - 18;

    const t = solveInterceptTime(originX, originY, targetX, targetY, velX, velY, projectileSpeed);
    if (t !== null && t < bestTime) {
      const px = targetX + velX * t;
      const py = targetY + velY * t;
      bestTime = t;
      bestPoint = { x: px, y: py, time: t };
    }
  });

  if (!bestPoint) return null;
  const point = bestPoint as { x: number; y: number; time: number };
  const clampedY = Math.min(point.y, CANVAS_HEIGHT - GROUND_HEIGHT - 24);
  return { x: Math.max(20, Math.min(CANVAS_WIDTH - 20, point.x)), y: Math.max(40, clampedY), time: point.time };
}

function findBestTarget(state: GameState): { x: number; y: number } | null {
  // Find the most dangerous incoming missile (closest to ground and not already being targeted)
  let bestThreat = -1;
  let bestTarget: { x: number; y: number } | null = null;

  const counterTargets = new Set<string>();
  state.counterMissiles.forEach((cm) => {
    counterTargets.add(`${Math.round(cm.targetX / 16)}_${Math.round(cm.targetY / 16)}`);
  });

  for (const m of state.incomingMissiles) {
    if (m.destroyed) continue;

    const mx = m.startX + (m.targetX - m.startX) * m.progress;
    const my = m.startY + (m.targetY - m.startY) * m.progress;

    // Skip missiles too high up
    if (my < 40) continue;

    // Calculate threat level based on proximity to ground and cities
    const groundDist = CANVAS_HEIGHT - GROUND_HEIGHT - my;
    const threat = 1 / (groundDist + 1);

    // Reduce priority for missiles already being targeted
    const targetKey = `${Math.round(mx / 16)}_${Math.round(my / 16)}`;
    const alreadyTargeted = counterTargets.has(targetKey);
    const adjustedThreat = alreadyTargeted ? threat * 0.3 : threat;

    // Increase priority for non-decoy missiles
    const decoyMult = m.isDecoy ? 0.1 : 1.0;
    const empMult = m.isEmpMissile ? 1.6 : 1.0;
    const heatMult = m.isHeatSeeker ? 1.35 : 1.0;

    const speedMult = m.frozen ? 0.3 : 1.0;
    const velScale = (m.speed * speedMult) / 500;
    const velX = (m.targetX - m.startX) * velScale;
    const velY = (m.targetY - m.startY) * velScale;

    const intercept = findBestIntercept(state, mx, my, velX, velY);
    if (!intercept) continue;

    const interceptKey = `${Math.round(intercept.x / 16)}_${Math.round(intercept.y / 16)}`;
    const interceptTargeted = counterTargets.has(interceptKey);
    const finalThreat = adjustedThreat * decoyMult * empMult * heatMult * (interceptTargeted ? 0.3 : 1);

    if (finalThreat > bestThreat) {
      bestThreat = finalThreat;
      bestTarget = { x: intercept.x, y: intercept.y };
    }
  }

  // Also consider asteroids
  for (const a of state.asteroids) {
    const groundDist = CANVAS_HEIGHT - GROUND_HEIGHT - a.y - a.radius;
    if (groundDist < 240) {
      const threat = (1 / (groundDist + 1)) * 1.8;
      const intercept = findBestIntercept(state, a.x, a.y, a.vx, a.vy);
      if (!intercept) continue;

      const interceptKey = `${Math.round(intercept.x / 16)}_${Math.round(intercept.y / 16)}`;
      const interceptTargeted = counterTargets.has(interceptKey);
      const finalThreat = interceptTargeted ? threat * 0.4 : threat;

      if (finalThreat > bestThreat) {
        bestThreat = finalThreat;
        bestTarget = { x: intercept.x, y: intercept.y };
      }
    }
  }

  // Target boss
  if (state.boss && !state.bossDefeated) {
    const b = state.boss;
    const hpPct = b.hp / b.maxHp;
    const threat = (2.0 - hpPct) * 0.5; // High threat, increases as boss takes damage

    // Boss moves horizontally
    const velX = b.speed * b.moveDir;
    const velY = 0;

    const intercept = findBestIntercept(state, b.x, b.y, velX, velY);
    if (intercept) {
      const interceptKey = `${Math.round(intercept.x / 16)}_${Math.round(intercept.y / 16)}`;
      const interceptTargeted = counterTargets.has(interceptKey);
      const finalThreat = (interceptTargeted ? threat * 0.4 : threat) * 2.0; // Bosses are high priority

      if (finalThreat > bestThreat) {
        bestThreat = finalThreat;
        bestTarget = { x: intercept.x, y: intercept.y };
      }
    }
  }

  return bestTarget;
}

function drawAutoPlayOverlay(ctx: CanvasRenderingContext2D, autoPlay: AutoPlayState, state: GameState) {
  if (!autoPlay.active && autoPlay.deactivationFlash <= 0) return;

  // Activation flash
  if (autoPlay.activationFlash > 0) {
    const flashAlpha = autoPlay.activationFlash / 60 * 0.3;
    ctx.fillStyle = `rgba(0, 255, 100, ${flashAlpha})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // Deactivation flash
  if (autoPlay.deactivationFlash > 0) {
    const flashAlpha = autoPlay.deactivationFlash / 40 * 0.3;
    ctx.fillStyle = `rgba(255, 50, 50, ${flashAlpha})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  if (!autoPlay.active) return;

  // AUTO MODE banner at top
  const bannerH = 28;
  const t = Date.now() * 0.003;
  const bannerAlpha = 0.7 + Math.sin(t) * 0.15;
  ctx.fillStyle = `rgba(0, 20, 10, ${bannerAlpha * 0.8})`;
  ctx.fillRect(0, 0, CANVAS_WIDTH, bannerH);

  // Scanning line effect
  ctx.strokeStyle = `rgba(0, 255, 100, ${0.15 + Math.sin(t * 2) * 0.08})`;
  ctx.lineWidth = 1;
  const scanY = ((Date.now() * 0.15) % CANVAS_HEIGHT);
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(CANVAS_WIDTH, scanY);
  ctx.stroke();

  // Border glow
  ctx.strokeStyle = `rgba(0, 255, 100, ${0.2 + Math.sin(t) * 0.1})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, CANVAS_WIDTH - 2, CANVAS_HEIGHT - 2);

  // Corner brackets
  const cornerSize = 20;
  const cornerColor = `rgba(0, 255, 100, ${0.6 + Math.sin(t * 1.5) * 0.2})`;
  ctx.strokeStyle = cornerColor;
  ctx.lineWidth = 2;

  // Top-left
  ctx.beginPath();
  ctx.moveTo(4, 4 + cornerSize);
  ctx.lineTo(4, 4);
  ctx.lineTo(4 + cornerSize, 4);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH - 4 - cornerSize, 4);
  ctx.lineTo(CANVAS_WIDTH - 4, 4);
  ctx.lineTo(CANVAS_WIDTH - 4, 4 + cornerSize);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(4, CANVAS_HEIGHT - 4 - cornerSize);
  ctx.lineTo(4, CANVAS_HEIGHT - 4);
  ctx.lineTo(4 + cornerSize, CANVAS_HEIGHT - 4);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH - 4 - cornerSize, CANVAS_HEIGHT - 4);
  ctx.lineTo(CANVAS_WIDTH - 4, CANVAS_HEIGHT - 4);
  ctx.lineTo(CANVAS_WIDTH - 4, CANVAS_HEIGHT - 4 - cornerSize);
  ctx.stroke();

  // AUTO MODE text with icon
  ctx.fillStyle = '#00ff66';
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#00ff66';
  ctx.shadowBlur = 10;
  const autoText = `🤖 AUTO MODE [∞ AMMO] — Press C to cancel`;
  ctx.fillText(autoText, CANVAS_WIDTH / 2, 18);
  ctx.shadowBlur = 0;

  // AI targeting reticle during gameplay
  if (state.phase === 'playing') {
    const reticleX = autoPlay.targetX;
    const reticleY = autoPlay.targetY;
    const reticleSize = 12 + Math.sin(t * 3) * 3;
    const reticleAlpha = 0.5 + Math.sin(t * 2) * 0.2;

    ctx.strokeStyle = `rgba(255, 100, 50, ${reticleAlpha})`;
    ctx.lineWidth = 1;

    // Diamond shape
    ctx.beginPath();
    ctx.moveTo(reticleX, reticleY - reticleSize);
    ctx.lineTo(reticleX + reticleSize, reticleY);
    ctx.lineTo(reticleX, reticleY + reticleSize);
    ctx.lineTo(reticleX - reticleSize, reticleY);
    ctx.closePath();
    ctx.stroke();

    // Inner cross
    ctx.strokeStyle = `rgba(255, 150, 50, ${reticleAlpha * 0.7})`;
    ctx.beginPath();
    ctx.moveTo(reticleX - reticleSize * 0.5, reticleY);
    ctx.lineTo(reticleX + reticleSize * 0.5, reticleY);
    ctx.moveTo(reticleX, reticleY - reticleSize * 0.5);
    ctx.lineTo(reticleX, reticleY + reticleSize * 0.5);
    ctx.stroke();

    // Targeting lines from batteries to target
    state.batteries.forEach((b) => {
      if (b.ammo > 0 && b.disabled <= 0) {
        ctx.strokeStyle = `rgba(0, 255, 100, ${0.06 + Math.sin(t + b.x * 0.01) * 0.03})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y - 18);
        ctx.lineTo(reticleX, reticleY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Threat indicators on incoming missiles
    state.incomingMissiles.forEach((m) => {
      if (m.destroyed) return;
      const mx = m.startX + (m.targetX - m.startX) * m.progress;
      const my = m.startY + (m.targetY - m.startY) * m.progress;
      if (my < 30) return;

      const groundDist = CANVAS_HEIGHT - GROUND_HEIGHT - my;
      const dangerLevel = Math.max(0, 1 - groundDist / 400);

      if (dangerLevel > 0.2) {
        const boxSize = 8;
        ctx.strokeStyle = `rgba(255, ${Math.floor(255 * (1 - dangerLevel))}, 0, ${dangerLevel * 0.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(mx - boxSize, my - boxSize, boxSize * 2, boxSize * 2);

        // Threat level text
        if (dangerLevel > 0.6) {
          ctx.fillStyle = `rgba(255, 50, 50, ${dangerLevel * 0.6})`;
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${Math.floor(dangerLevel * 100)}%`, mx, my - boxSize - 3);
        }
      }
    });
  }

  // Shop phase: show AI thinking indicator
  if (state.phase === 'shop') {
    const thinkDots = '.'.repeat(Math.floor((Date.now() / 300) % 4));
    ctx.fillStyle = '#00ff66';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`AI analyzing upgrades${thinkDots}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 55);
  }
}

// ─── Main Component ─────────────────────────────────────────────────────
export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>(initGameState());
  const statsRef = useRef<PersistentStats>(initPersistentStats());
  const animationRef = useRef<number>(0);
  const [, setRenderTick] = useState(0);
  const autoPlayRef = useRef<AutoPlayState>(initAutoPlay());
  const konamiIndexRef = useRef(0);
  const [saveHash, setSaveHash] = useState('');
  const [loadHash, setLoadHash] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const state = gameStateRef.current;

      // Auto mode handles clicks automatically, but allow manual clicks to pass through
      if (autoPlayRef.current.active && state.phase === 'playing') {
        return; // Let auto-play handle it
      }

      if (state.phase === 'title') {
        // Check for prestige shop click (if button visible)
        if (statsRef.current.prestigePoints > 0) {
          // Assume button is near stats area, let's put it specifically
          // Wait, drawTitleScreen needs to draw the button first.
          // I didn't add the button rect in drawTitleScreen.
          // Let's assume a specific area: center bottom-ish
          const sY = CANVAS_HEIGHT / 2 + 85 + 25;
          const btnW = 160;
          const btnH = 30;
          const btnX = (CANVAS_WIDTH - btnW) / 2;
          if (x >= btnX && x <= btnX + btnW && y >= sY && y <= sY + btnH) {
            const newState = { ...state };
            newState.phase = 'prestige_shop';
            gameStateRef.current = newState;
            setRenderTick(t => t + 1);
            return;
          }
        }

        const newState = { ...state };
        newState.phase = 'playing';
        newState.autoMode = autoPlayRef.current.active;
        newState.missileSpawnTimer = 60;
        newState.bomberSpawnTimer = 300;
        newState.asteroidSpawnTimer = 400;
        newState.eruptionTimer = 300;
        gameStateRef.current = newState;
        setRenderTick((t) => t + 1);
        return;
      }

      if (state.phase === 'gameover') {
        // Check prestige click
        const pp = calcPrestigePoints(state);
        if (state.level >= 5 && pp > 0) {
          const btnW = 200;
          const btnH = 36;
          const btnX = (CANVAS_WIDTH - btnW) / 2;
          const btnY = 330 + 28; // calculated from drawGameOver layout
          if (x >= btnX && x <= btnX + btnW && y >= btnY && y <= btnY + btnH) {
            const stats = statsRef.current;
            stats.prestigeLevel++;
            stats.prestigePoints += pp;
            stats.prestigeBonuses = { ...stats.prestigeBonuses }; // ensure reactivity if we used state
            saveStats(stats);

            gameStateRef.current = initGameState(stats.prestigeBonuses);
            gameStateRef.current.phase = 'title';
            setRenderTick((t) => t + 1);
            return;
          }
        }

        const wasAutoMode = autoPlayRef.current.active;
        gameStateRef.current = initGameState(statsRef.current.prestigeBonuses);
        gameStateRef.current.phase = 'title';
        gameStateRef.current.autoMode = wasAutoMode;
        setRenderTick((t) => t + 1);
        return;
      }

      if (state.phase === 'zone_intro') {
        // Skip to shop
        const newState = { ...state };
        newState.phase = 'shop';
        newState.zoneIntroTimer = 0;
        gameStateRef.current = newState;
        setRenderTick((t) => t + 1);
        return;
      }

      // Shop phase logic removed (Shop is now sidebar)

      if (state.phase === 'prestige_shop') {
        const stats = statsRef.current;
        const startY = 130;
        const colW = 400;
        const rowH = 70;
        const col1X = CANVAS_WIDTH / 2 - colW / 2;

        // Check upgrades
        let somethingBought = false;
        PRESTIGE_UPGRADE_DEFS.forEach((def, i) => {
          const rowY = startY + i * (rowH + 10);
          const currentLevel = stats.prestigeBonuses[def.key];
          const maxed = currentLevel >= def.maxLevel;

          if (!maxed) {
            const { x: btnX, y: btnY, w: btnW, h: btnH } = getPrestigeButtonRect(col1X, colW, rowY);
            if (x >= btnX && x <= btnX + btnW && y >= btnY && y <= btnY + btnH) {
              if (stats.prestigePoints >= def.cost) {
                stats.prestigePoints -= def.cost;
                stats.prestigeBonuses[def.key]++;
                somethingBought = true;
              }
            }
          }
        });

        if (somethingBought) {
          saveStats(stats);
          setRenderTick(t => t + 1);
          return;
        }

        // Back button
        const backY = CANVAS_HEIGHT - 60;
        const backW = 200;
        const backH = 40;
        const backX = CANVAS_WIDTH / 2 - backW / 2;
        if (x >= backX && x <= backX + backW && y >= backY && y <= backY + backH) {
          const newState = { ...state };
          newState.phase = 'title';
          gameStateRef.current = newState;
          setRenderTick(t => t + 1);
          return;
        }
        return;
      }

      if (state.levelComplete) return;

      // Special weapon firing
      if (state.selectedWeapon >= 0 && state.selectedWeapon < state.specialWeapons.length) {
        const weapons = [...state.specialWeapons];
        const weapon = { ...weapons[state.selectedWeapon] };
        if (weapon.charges <= 0) return;
        weapon.charges--;
        weapons[state.selectedWeapon] = weapon;
        const newState = { ...state, specialWeapons: weapons };

        if (weapon.type === 'laser') {
          // Fire laser from closest battery to click point
          const batIdx = findClosestBattery(state, x, y);
          const bat = state.batteries[batIdx];
          newState.laserBeams = [...state.laserBeams, {
            id: getId(), startX: bat.x, startY: bat.y - 18,
            endX: x, endY: y, life: 30, maxLife: 30,
          }];
          newState.screenShake = 4;
        } else if (weapon.type === 'swarm') {
          // Fire 8 missiles in a spread
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const spread = 40 + Math.random() * 20;
            fireCounterMissile(newState, x + Math.cos(angle) * spread, y + Math.sin(angle) * spread, false);
          }
        } else if (weapon.type === 'mine') {
          // Place a mine at click position
          newState.mines = [...state.mines, {
            id: getId(), x, y, radius: getExplosionRadius(state.upgrades) * 1.2,
            life: 600, maxLife: 600, armed: false,
          }];
        }

        if (weapon.charges <= 0) newState.selectedWeapon = -1;
        gameStateRef.current = newState;
        setRenderTick((t) => t + 1);
        return;
      }

      // Normal firing
      const multiCount = getMultiShotCount(state.upgrades);
      for (let i = 0; i < multiCount; i++) {
        const offsetX = i === 0 ? 0 : (Math.random() - 0.5) * 40;
        const offsetY = i === 0 ? 0 : (Math.random() - 0.5) * 40;
        fireCounterMissile(state, x + offsetX, y + offsetY, i === 0);
      }
    },
    []
  );

  const buyBuilding = (id: string) => {
    const s = gameStateRef.current;
    const def = BUILDING_DEFS.find(b => b.id === id);
    if (!def) return;

    const count = s.buildings[id] || 0;
    const cost = Math.floor(def.baseCost * Math.pow(1.15, count));

    if (s.credits >= cost) {
      s.credits -= cost;
      s.buildings[id] = count + 1;
      s.totalSpent += cost;
      setRenderTick(t => t + 1);
    }
  };

  const buyUpgrade = (key: keyof Upgrades) => {
    const s = gameStateRef.current;
    const def = UPGRADE_DEFS.find(u => u.key === key);
    if (!def) return;

    const level = s.upgrades[key];
    if (level >= def.maxLevel) return;

    const cost = getUpgradeCost(def, level);
    if (s.credits >= cost) {
      s.credits -= cost;
      s.upgrades[key] = level + 1;
      s.totalSpent += cost;
      setRenderTick(t => t + 1);
    }
  };

  // Legacy shop click handler removed

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Only update cursor position if not in auto mode (or if in shop/other phases)
    if (!autoPlayRef.current.active || gameStateRef.current.phase !== 'playing') {
      gameStateRef.current.cursorX = x;
      gameStateRef.current.cursorY = y;
    }

    if (gameStateRef.current.phase === 'shop') {
      let hoveredIndex = -1;

      UPGRADE_DEFS.forEach((_, i) => {
        const r = getShopCardRect(i);
        if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
          hoveredIndex = i;
        }
      });

      const continueY = SHOP_START_Y + Math.ceil(UPGRADE_DEFS.length / SHOP_COLS) * (SHOP_CARD_H + SHOP_GAP - 2) + 12;
      const btnW = 240;
      const btnH = 48;
      const btnX = (CANVAS_WIDTH - btnW) / 2;
      if (x >= btnX && x <= btnX + btnW && y >= continueY && y <= continueY + btnH) {
        hoveredIndex = 99;
      }

      gameStateRef.current.shopHover = hoveredIndex;
    }
  }, []);

  const handleSave = useCallback(() => {
    const state = gameStateRef.current;
    const hash = encodeSave(state);
    setSaveHash(hash);
    setSaveStatus('Save code generated.');
  }, []);

  const handleCopySave = useCallback(async () => {
    if (!saveHash) return;
    try {
      await navigator.clipboard.writeText(saveHash);
      setSaveStatus('Save code copied to clipboard.');
    } catch {
      setSaveStatus('Copy failed. You can still select and copy manually.');
    }
  }, [saveHash]);

  const handleLoad = useCallback(() => {
    const loaded = decodeSave(loadHash);
    if (!loaded) {
      setSaveStatus('Invalid save code.');
      return;
    }
    gameStateRef.current = loaded;
    syncNextId(loaded);
    autoPlayRef.current.active = loaded.autoMode;
    autoPlayRef.current.fireTimer = 0;
    autoPlayRef.current.shopTimer = 0;
    autoPlayRef.current.shopBuyTimer = 0;
    autoPlayRef.current.zoneIntroTimer = 0;
    autoPlayRef.current.activationFlash = 30;
    autoPlayRef.current.deactivationFlash = 0;
    setSaveStatus('Save loaded successfully.');
    setRenderTick((t) => t + 1);
  }, [loadHash]);

  // Konami code listener and cancel key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Cancel auto mode with 'c'
      if (key === 'c' && autoPlayRef.current.active) {
        autoPlayRef.current.active = false;
        autoPlayRef.current.deactivationFlash = 40;
        gameStateRef.current.autoMode = false;
        setRenderTick((t) => t + 1);
        return;
      }

      // Weapon selection keys (1, 2, 3 to select, 0 to deselect)
      if (gameStateRef.current.phase === 'playing' && !autoPlayRef.current.active) {
        if (key === '1' || key === '2' || key === '3') {
          const idx = parseInt(key) - 1;
          const state = gameStateRef.current;
          if (state.specialWeapons[idx] && state.specialWeapons[idx].maxCharges > 0) {
            state.selectedWeapon = state.selectedWeapon === idx ? -1 : idx;
            setRenderTick((t) => t + 1);
            return;
          }
        }
        if (key === '0' || key === 'escape') {
          gameStateRef.current.selectedWeapon = -1;
          setRenderTick((t) => t + 1);
          return;
        }
      }

      // DEBUG KEYS (Skip to Boss / Get Money)
      if (key === 'l') {
        const state = gameStateRef.current;
        state.level = 4; // Set to 4 so winning Level 4 leads to Level 5 Boss
        state.score += 5000;
        state.phase = 'playing';
        gameStateRef.current = startNextLevel(state);
        setRenderTick((t) => t + 1);
        return;
      }
      if (key === 'm') {
        gameStateRef.current.score += 5000;
        setRenderTick((t) => t + 1);
        return;
      }

      // Check Konami code
      const expectedKey = KONAMI_CODE[konamiIndexRef.current].toLowerCase();
      if (key === expectedKey) {
        konamiIndexRef.current++;
        if (konamiIndexRef.current >= KONAMI_CODE.length) {
          // Konami code complete! Activate auto mode
          konamiIndexRef.current = 0;
          if (!autoPlayRef.current.active) {
            autoPlayRef.current.active = true;
            autoPlayRef.current.activationFlash = 60;
            autoPlayRef.current.fireTimer = 0;
            autoPlayRef.current.shopTimer = 0;
            autoPlayRef.current.shopBuyTimer = 0;
            autoPlayRef.current.zoneIntroTimer = 0;

            // Set autoMode on game state for unlimited ammo
            gameStateRef.current.autoMode = true;

            // If on title screen, auto-start
            const state = gameStateRef.current;
            if (state.phase === 'title') {
              const newState = { ...state };
              newState.phase = 'playing';
              newState.missileSpawnTimer = 60;
              newState.bomberSpawnTimer = 300;
              newState.asteroidSpawnTimer = 400;
              newState.eruptionTimer = 300;
              gameStateRef.current = newState;
            }

            setRenderTick((t) => t + 1);
          }
        }
      } else {
        // Reset if wrong key, but check if this key starts the sequence
        konamiIndexRef.current = 0;
        if (key === KONAMI_CODE[0].toLowerCase()) {
          konamiIndexRef.current = 1;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    statsRef.current = loadStats();

    const gameLoop = () => {
      const state = gameStateRef.current;
      const auto = autoPlayRef.current;

      // Update flash timers
      if (auto.activationFlash > 0) auto.activationFlash--;
      if (auto.deactivationFlash > 0) auto.deactivationFlash--;

      // ─── Auto-Play Logic ───────────────────────────────────
      if (auto.active) {
        // Auto: Title screen -> start game
        if (state.phase === 'title') {
          const newState = { ...state };
          newState.phase = 'playing';
          newState.missileSpawnTimer = 60;
          newState.bomberSpawnTimer = 300;
          newState.asteroidSpawnTimer = 400;
          newState.eruptionTimer = 300;
          gameStateRef.current = newState;
        }

        // Auto: Game over -> restart
        if (state.phase === 'gameover') {
          auto.shopTimer++;
          if (auto.shopTimer > 120) {
            auto.shopTimer = 0;
            const newState = initGameState();
            newState.phase = 'playing';
            newState.autoMode = true;
            newState.missileSpawnTimer = 60;
            newState.bomberSpawnTimer = 300;
            newState.asteroidSpawnTimer = 400;
            newState.eruptionTimer = 300;
            gameStateRef.current = newState;
          }
        }

        // Auto: Zone intro -> skip
        if (state.phase === 'zone_intro') {
          auto.zoneIntroTimer++;
          if (auto.zoneIntroTimer > 90) {
            auto.zoneIntroTimer = 0;
            const newState = { ...state };
            newState.phase = 'shop';
            newState.zoneIntroTimer = 0;
            gameStateRef.current = newState;
          }
        }

        // Auto: Shop -> buy upgrades then continue
        if (state.phase === 'shop') {
          auto.shopBuyTimer++;
          if (auto.shopBuyTimer > 15) {
            auto.shopBuyTimer = 0;
            // Try to buy an upgrade
            const beforeScore = state.score;
            gameStateRef.current = autoPlayBuyUpgrade(gameStateRef.current);
            const afterScore = gameStateRef.current.score;

            // If nothing was bought, increment shop timer
            if (beforeScore === afterScore) {
              auto.shopTimer++;
            } else {
              auto.shopTimer = 0; // Reset timer if we bought something
            }
          }

          // After trying all upgrades or waiting a bit, continue to next wave
          if (auto.shopTimer > 8) {
            auto.shopTimer = 0;
            auto.shopBuyTimer = 0;
            gameStateRef.current = startNextLevel(gameStateRef.current);
            setRenderTick((t) => t + 1);
          }
        }

        // Auto: Playing -> AI fires at threats
        if (state.phase === 'playing' && !state.levelComplete) {
          auto.fireTimer++;
          auto.scanTimer++;

          // Scan for targets every few frames
          if (auto.scanTimer >= 5) {
            auto.scanTimer = 0;
            const target = findBestTarget(state);
            if (target) {
              // Smoothly move cursor toward target
              auto.targetX += (target.x - auto.targetX) * 0.3;
              auto.targetY += (target.y - auto.targetY) * 0.3;
            }
          }

          // Update cursor position for crosshair
          state.cursorX += (auto.targetX - state.cursorX) * 0.15;
          state.cursorY += (auto.targetY - state.cursorY) * 0.15;

          // Fire at intervals based on threat density
          const threatCount = state.incomingMissiles.filter((m) => !m.destroyed).length;
          const asteroidCount = state.asteroids.length;
          const bossThreat = (state.boss && !state.bossDefeated) ? 1 : 0;
          const totalThreats = threatCount + asteroidCount + bossThreat;

          // Fire faster when more threats exist
          const fireInterval = totalThreats > 10 ? 6 : totalThreats > 5 ? 10 : totalThreats > 2 ? 15 : 25;

          if (auto.fireTimer >= fireInterval && totalThreats > 0) {
            auto.fireTimer = 0;

            const target = findBestTarget(state);
            if (target) {
              // Check if we have ammo
              const hasAmmo = state.batteries.some((b) => b.ammo > 0 && b.disabled <= 0);
              if (hasAmmo) {
                const multiCount = getMultiShotCount(state.upgrades);
                for (let i = 0; i < multiCount; i++) {
                  const offsetX = i === 0 ? 0 : (Math.random() - 0.5) * 30;
                  const offsetY = i === 0 ? 0 : (Math.random() - 0.5) * 30;
                  fireCounterMissile(state, target.x + offsetX, target.y + offsetY, i === 0);
                }
              }
            }
          }
        }
      }

      // ─── Normal Game Update ────────────────────────────────
      if (state.phase === 'playing') {
        const prevState = { ...gameStateRef.current };
        gameStateRef.current = updateGame(gameStateRef.current);

        // Check for achievements
        const newUnlocks = checkAchievements(gameStateRef.current, statsRef.current);
        if (newUnlocks.length > 0) {
          statsRef.current.achievements.push(...newUnlocks);
          newUnlocks.forEach(id => {
            const def = ACHIEVEMENT_DEFS.find(d => d.id === id);
            if (def) {
              gameStateRef.current.achievementToasts.push({
                text: def.name, icon: def.icon, timer: 180
              });
            }
          });
          saveStats(statsRef.current);
        }

        // Check if just died
        if (gameStateRef.current.phase === 'gameover' && prevState.phase === 'playing' && !gameStateRef.current.autoMode) {
          const s = statsRef.current;
          s.totalGames++;
          s.totalScore += gameStateRef.current.score;
          s.highScore = Math.max(s.highScore, gameStateRef.current.score);
          s.highestLevel = Math.max(s.highestLevel, gameStateRef.current.level);
          s.highestZone = Math.max(s.highestZone, getZoneIndex(gameStateRef.current.level) + 1);
          s.totalMissilesDestroyed += gameStateRef.current.runMissilesDestroyed;
          s.totalBossesDefeated += gameStateRef.current.runBossesDefeated;
          s.bestCombo = Math.max(s.bestCombo, gameStateRef.current.maxCombo);
          saveStats(s);
        }
      } else if (state.phase === 'zone_intro' && !auto.active) {
        // Auto-advance zone intro (normal mode)
        const s = { ...state };
        s.zoneIntroTimer--;
        if (s.zoneIntroTimer <= 0) {
          s.phase = 'shop';
        }
        gameStateRef.current = s;
      } else if (state.phase === 'zone_intro' && auto.active) {
        // Still decrement timer in auto mode
        const s = { ...state };
        s.zoneIntroTimer--;
        gameStateRef.current = s;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const phase = gameStateRef.current.phase;
        const hover = gameStateRef.current.shopHover;
        const isAuto = auto.active;
        const desiredCursor = isAuto
          ? 'default'
          : phase === 'playing'
            ? 'none'
            : (phase === 'shop' && hover !== -1)
              ? 'pointer'
              : (phase === 'zone_intro')
                ? 'pointer'
                : 'default';
        if (canvas.style.cursor !== desiredCursor) {
          canvas.style.cursor = desiredCursor;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (phase === 'title') {
            drawTitleScreen(ctx, gameStateRef.current, statsRef.current);
          } else {
            // Draw game but NOT shop (shop is now React UI)
            if (phase !== 'shop') {
              drawGame(ctx, gameStateRef.current, statsRef.current);
            } else {
              // Immediate skip if in shop phase (which shouldn't happen anymore but just in case)
              gameStateRef.current.phase = 'playing';
            }
          }
          // Always draw auto-play overlay on top
          drawAutoPlayOverlay(ctx, auto, gameStateRef.current);
        }
      }

      // Force React UI update every 5 frames for smooth credit counter
      if (gameStateRef.current.phase === 'playing' || gameStateRef.current.phase === 'level_complete') {
        if (state.score % 5 === 0 || Math.random() < 0.2) { // heuristic
          setRenderTick(t => t + 1);
        }
      } else {
        // Less frequent updates in other menus
        if (Math.random() < 0.05) setRenderTick(t => t + 1);
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-black text-white overflow-hidden font-mono select-none">
      {/* ─── Left Column: Buildings ───────────────────────────── */}
      <div className="w-72 flex flex-col border-r border-green-900/30 bg-gray-900/90 z-20 shadow-xl">
        <div className="p-4 border-b border-green-900/30 bg-gray-900">
          <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
            <span>🏭</span> INDUSTRY
          </h2>
          <div className="text-xs text-green-600 font-bold mt-1">
            INCOME: {gameStateRef.current.cps.toFixed(1)} / sec
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {BUILDING_DEFS.map((def) => {
            const count = gameStateRef.current.buildings[def.id] || 0;
            const cost = Math.floor(def.baseCost * Math.pow(1.15, count));
            const canAfford = gameStateRef.current.credits >= cost;

            return (
              <div
                key={def.id}
                onClick={() => buyBuilding(def.id)}
                className={`relative p-3 rounded border transition-all cursor-pointer group ${canAfford
                  ? 'bg-gray-800 border-gray-700 hover:border-green-500 hover:bg-gray-750'
                  : 'bg-gray-900/50 border-gray-800 opacity-60'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-bold text-gray-200">{def.icon} {def.name}</div>
                  <div className="text-2xl font-bold text-gray-700">{count}</div>
                </div>
                <div className="text-xs text-gray-400 mt-1 h-8">{def.description}</div>
                <div className={`text-sm font-bold mt-2 ${canAfford ? 'text-yellow-400' : 'text-red-900'}`}>
                  ⬡ {cost.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-500 absolute bottom-3 right-3">
                  +{def.baseCps} CPS
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Center Column: Game ─────────────────────────────── */}
      <div className="flex-1 flex flex-col relative bg-black">
        {/* Top Resource Bar */}
        <div className="h-16 flex items-center justify-between px-8 border-b border-gray-800 bg-gray-900/80 backdrop-blur z-10">
          <div>
            <div className="text-3xl font-bold text-yellow-500 drop-shadow-md">
              ⬡ {Math.floor(gameStateRef.current.credits).toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase">Available Credits</div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-xl font-bold text-blue-400">LEVEL {gameStateRef.current.level}</div>
            <div className="text-xs text-gray-500">{getZone(gameStateRef.current.level).name}</div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gray-950">
          <div className="relative shadow-2xl shadow-green-900/10 rounded-lg overflow-hidden border border-gray-800">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="max-w-full max-h-[calc(100vh-80px)] block"
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Title Screen Overlay Logic for React Button integration if needed, 
                 but we kept title screen on canvas. We can overlay the Save Code stuff here. */}
          </div>

          {/* Save/Load Overlay */}
          {showSaveMenu && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-2xl max-w-lg w-full">
                <h3 className="text-xl font-bold text-white mb-4">SAVE / LOAD GAME</h3>

                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-black/40 rounded border border-gray-800">
                    <label className="block text-xs text-gray-500 mb-2">CURRENT SAVE CODE</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={saveHash || 'Click Generate'}
                        className="flex-1 bg-black text-green-400 font-mono text-xs p-2 rounded border border-gray-700 focus:outline-none"
                      />
                      <button onClick={handleSave} className="bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">GENERATE</button>
                      <button onClick={handleCopySave} className="bg-blue-700 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">COPY</button>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded border border-gray-800">
                    <label className="block text-xs text-gray-500 mb-2">LOAD SAVE CODE</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={loadHash}
                        onChange={(e) => setLoadHash(e.target.value)}
                        placeholder="Paste code here..."
                        className="flex-1 bg-black text-white font-mono text-xs p-2 rounded border border-gray-700 focus:border-purple-500 outline-none"
                      />
                      <button onClick={handleLoad} className="bg-purple-700 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded">LOAD</button>
                    </div>
                  </div>

                  {saveStatus && <div className="text-xs text-yellow-400 text-center">{saveStatus}</div>}

                  <button
                    onClick={() => setShowSaveMenu(false)}
                    className="mt-2 w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-bold"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save/Load Overlay Trigger */}
          <div className="absolute bottom-4 left-4 text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer select-none"
            onClick={() => setShowSaveMenu(prev => !prev)}>
            [SAVE / LOAD]
          </div>
        </div>
      </div>

      {/* ─── Right Column: Upgrades ──────────────────────────── */}
      <div className="w-80 flex flex-col border-l border-blue-900/30 bg-gray-900/90 z-20 shadow-xl">
        <div className="p-4 border-b border-blue-900/30 bg-gray-900">
          <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
            <span>⚡</span> RESEARCH
          </h2>
          <div className="text-xs text-blue-600 font-bold mt-1">
            ACTIVE BUFFS & TECH
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {UPGRADE_DEFS.map((def) => {
            const currentLevel = gameStateRef.current.upgrades[def.key];
            const isMaxed = currentLevel >= def.maxLevel;
            const cost = getUpgradeCost(def, currentLevel);
            const canAfford = !isMaxed && gameStateRef.current.credits >= cost;

            // Unlock conditions (example: don't show everything at once? Or show all)
            // Showing all for idle game style is fine.

            return (
              <div
                key={def.key}
                onClick={() => buyUpgrade(def.key)}
                className={`relative p-3 rounded border transition-all group ${isMaxed
                  ? 'bg-blue-900/20 border-blue-900/50'
                  : canAfford
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500 hover:bg-gray-750 cursor-pointer'
                    : 'bg-gray-900/50 border-gray-800 opacity-60 cursor-not-allowed'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-bold text-gray-200 text-sm flex items-center gap-2">
                    <span>{def.icon}</span> {def.name}
                  </div>
                  {isMaxed ? (
                    <span className="text-[10px] font-bold text-blue-400 border border-blue-900 px-1 rounded">MAX</span>
                  ) : (
                    <div className="text-xs font-mono text-gray-500">{currentLevel}/{def.maxLevel}</div>
                  )}
                </div>

                <div className="text-xs text-gray-400 mt-1 h-8 leading-tight">{def.description}</div>

                {!isMaxed && (
                  <div className={`text-sm font-bold mt-2 ${canAfford ? 'text-yellow-400' : 'text-red-900'}`}>
                    ⬡ {cost.toLocaleString()}
                  </div>
                )}

                {/* Progress Bar for Level */}
                <div className="mt-2 h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(currentLevel / def.maxLevel) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
