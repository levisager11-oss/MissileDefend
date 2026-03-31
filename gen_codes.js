const fs = require('fs');

const baseSave = {
  v: 1,
  state: {
    score: 10000,
    credits: 10000, // new field
    cps: 0,         // new field
    buildings: {
      solar_farm: 0,
      scrap_yard: 0,
      munitions_factory: 0,
      orbital_mine: 0,
      defense_contract: 0,
      ai_core: 0
    },
    level: 1,
    cities: [
      { x: 120, alive: true, hp: 1, maxHp: 1 },
      { x: 200, alive: true, hp: 1, maxHp: 1 },
      { x: 280, alive: true, hp: 1, maxHp: 1 },
      { x: 600, alive: true, hp: 1, maxHp: 1 },
      { x: 680, alive: true, hp: 1, maxHp: 1 },
      { x: 760, alive: true, hp: 1, maxHp: 1 }
    ],
    batteries: [
      { x: 40, y: 580, ammo: 10, maxAmmo: 10, disabled: 0 },
      { x: 480, y: 580, ammo: 10, maxAmmo: 10, disabled: 0 },
      { x: 920, y: 580, ammo: 10, maxAmmo: 10, disabled: 0 }
    ],
    incomingMissiles: [],
    counterMissiles: [],
    explosions: [],
    particles: [],
    bombers: [],
    asteroids: [],
    gameOver: false,
    phase: "shop",
    levelComplete: false,
    levelTransitionTimer: 0,
    missileSpawnTimer: 60,
    missilesSpawnedThisLevel: 0,
    totalMissilesThisLevel: 10,
    cursorX: 480,
    cursorY: 320,
    stars: [],
    screenShake: 0,
    bonusText: [],
    upgrades: {
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
      mineWeapon: 0
    },
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
    specialWeapons: [
      { type: "laser", charges: 0, maxCharges: 0, cooldownTimer: 0 },
      { type: "swarm", charges: 0, maxCharges: 0, cooldownTimer: 0 },
      { type: "mine", charges: 0, maxCharges: 0, cooldownTimer: 0 }
    ],
    selectedWeapon: -1,
    mines: [],
    laserBeams: [],
    comboCount: 0,
    comboTimer: 0,
    comboMultiplier: 1,
    maxCombo: 0,
    runMissilesDestroyed: 0, // new field
    runBossesDefeated: 0,    // new field
    achievementToasts: [],   // new field
    weaponsUsedThisLevel: [] // new field (Set converted to array)
  }
};

const save1 = JSON.parse(JSON.stringify(baseSave));

const save2 = JSON.parse(JSON.stringify(baseSave));
save2.state.level = 5;
save2.state.phase = "playing";
save2.state.totalMissilesThisLevel = 20;
save2.state.isBossLevel = true;
save2.state.upgrades.laserWeapon = 3;
save2.state.upgrades.swarmWeapon = 3;
save2.state.upgrades.mineWeapon = 3;
save2.state.specialWeapons = [
  { type: "laser", charges: 3, maxCharges: 3, cooldownTimer: 0 },
  { type: "swarm", charges: 6, maxCharges: 6, cooldownTimer: 0 },
  { type: "mine", charges: 9, maxCharges: 9, cooldownTimer: 0 }
];

const code1 = Buffer.from(JSON.stringify(save1)).toString('base64');
const code2 = Buffer.from(JSON.stringify(save2)).toString('base64');

console.log("CODE1:", code1);
console.log("CODE2:", code2);
