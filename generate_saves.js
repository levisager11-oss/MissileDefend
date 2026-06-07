const fs = require('fs');

function generateBase64Save(level, isBossLevel) {
  const state = {
    credits: 10000,
    score: 10000,
    cps: 0,
    buildings: {
      solar_farm: 0,
      scrap_yard: 0,
      munitions_factory: 0,
      orbital_mine: 0,
      defense_contract: 0,
      ai_core: 0
    },
    level: level,
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
    phase: isBossLevel ? "playing" : "shop",
    levelComplete: false,
    levelTransitionTimer: 0,
    missileSpawnTimer: 60,
    missilesSpawnedThisLevel: 0,
    totalMissilesThisLevel: level === 1 ? 10 : 20,
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
      laserWeapon: isBossLevel ? 3 : 0,
      swarmWeapon: isBossLevel ? 3 : 0,
      mineWeapon: isBossLevel ? 3 : 0
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
    isBossLevel: isBossLevel,
    specialWeapons: [
      { type: "laser", charges: isBossLevel ? 3 : 0, maxCharges: isBossLevel ? 3 : 0, cooldownTimer: 0 },
      { type: "swarm", charges: isBossLevel ? 6 : 0, maxCharges: isBossLevel ? 6 : 0, cooldownTimer: 0 },
      { type: "mine", charges: isBossLevel ? 9 : 0, maxCharges: isBossLevel ? 9 : 0, cooldownTimer: 0 }
    ],
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
    weaponsUsedThisLevel: [] // Needs to be converted from Set for JSON
  };

  return Buffer.from(JSON.stringify({ v: 1, state: state })).toString('base64');
}

console.log("Level 1 Head Start:");
console.log(generateBase64Save(1, false));
console.log("\nLevel 5 Boss Fight Ready:");
console.log(generateBase64Save(5, true));
