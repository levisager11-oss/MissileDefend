import base64
import json

def encode_state(state):
    wrapped = {'v': 1, 'state': state}
    return base64.b64encode(json.dumps(wrapped).encode('utf-8')).decode('utf-8')

base_state_1 = {
    'score': 10000,
    'credits': 10000,
    'cps': 0,
    'buildings': {},
    'level': 1,
    'cities': [
        {'x': 40, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 160, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 280, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 680, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 800, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 920, 'alive': True, 'hp': 100, 'maxHp': 100}
    ],
    'batteries': [
        {'x': 40, 'y': 580, 'ammo': 10, 'maxAmmo': 10, 'disabled': 0},
        {'x': 480, 'y': 580, 'ammo': 10, 'maxAmmo': 10, 'disabled': 0},
        {'x': 920, 'y': 580, 'ammo': 10, 'maxAmmo': 10, 'disabled': 0}
    ],
    'incomingMissiles': [],
    'counterMissiles': [],
    'explosions': [],
    'particles': [],
    'bombers': [],
    'asteroids': [],
    'gameOver': False,
    'phase': 'shop',
    'levelComplete': False,
    'levelTransitionTimer': 0,
    'missileSpawnTimer': 60,
    'missilesSpawnedThisLevel': 0,
    'totalMissilesThisLevel': 10,
    'cursorX': 480,
    'cursorY': 320,
    'stars': [],
    'screenShake': 0,
    'bonusText': [],
    'upgrades': {
        'blastRadius': 0, 'missileSpeed': 0, 'extraAmmo': 0, 'chainReaction': 0,
        'armorPlating': 0, 'multiShot': 0, 'empBurst': 0, 'luckyStrike': 0,
        'autoTurret': 0, 'shieldGenerator': 0, 'laserWeapon': 0, 'swarmWeapon': 0, 'mineWeapon': 0
    },
    'shopHover': -1,
    'autoTurretTimer': 0,
    'shieldHits': [0, 0, 0, 0, 0, 0],
    'empActive': 0,
    'totalSpent': 0,
    'blizzardAlpha': 0,
    'blizzardParticles': [],
    'eruptionTimer': 0,
    'eruptionActive': 0,
    'asteroidSpawnTimer': 0,
    'bomberSpawnTimer': 0,
    'zoneIntroTimer': 0,
    'previousZoneId': 0,
    'highScore': 0,
    'autoMode': False,
    'boss': None,
    'bossDefeated': False,
    'isBossLevel': False,
    'specialWeapons': [
        {'type': 'laser', 'charges': 0, 'maxCharges': 0, 'cooldownTimer': 0},
        {'type': 'swarm', 'charges': 0, 'maxCharges': 0, 'cooldownTimer': 0},
        {'type': 'mine', 'charges': 0, 'maxCharges': 0, 'cooldownTimer': 0}
    ],
    'selectedWeapon': -1,
    'mines': [],
    'laserBeams': [],
    'comboCount': 0,
    'comboTimer': 0,
    'comboMultiplier': 1,
    'maxCombo': 0,
    'runMissilesDestroyed': 0,
    'runBossesDefeated': 0,
    'achievementToasts': [],
    'weaponsUsedThisLevel': []
}

base_state_5 = {
    'score': 10000,
    'credits': 10000,
    'cps': 0,
    'buildings': {},
    'level': 5,
    'cities': [
        {'x': 40, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 160, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 280, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 680, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 800, 'alive': True, 'hp': 100, 'maxHp': 100},
        {'x': 920, 'alive': True, 'hp': 100, 'maxHp': 100}
    ],
    'batteries': [
        {'x': 40, 'y': 580, 'ammo': 10, 'maxAmmo': 10, 'disabled': 0},
        {'x': 480, 'y': 580, 'ammo': 10, 'maxAmmo': 10, 'disabled': 0},
        {'x': 920, 'y': 580, 'ammo': 10, 'maxAmmo': 10, 'disabled': 0}
    ],
    'incomingMissiles': [],
    'counterMissiles': [],
    'explosions': [],
    'particles': [],
    'bombers': [],
    'asteroids': [],
    'gameOver': False,
    'phase': 'playing',
    'levelComplete': False,
    'levelTransitionTimer': 0,
    'missileSpawnTimer': 60,
    'missilesSpawnedThisLevel': 0,
    'totalMissilesThisLevel': 20,
    'cursorX': 480,
    'cursorY': 320,
    'stars': [],
    'screenShake': 0,
    'bonusText': [],
    'upgrades': {
        'blastRadius': 0, 'missileSpeed': 0, 'extraAmmo': 0, 'chainReaction': 0,
        'armorPlating': 0, 'multiShot': 0, 'empBurst': 0, 'luckyStrike': 0,
        'autoTurret': 0, 'shieldGenerator': 0, 'laserWeapon': 3, 'swarmWeapon': 3, 'mineWeapon': 3
    },
    'shopHover': -1,
    'autoTurretTimer': 0,
    'shieldHits': [0, 0, 0, 0, 0, 0],
    'empActive': 0,
    'totalSpent': 0,
    'blizzardAlpha': 0,
    'blizzardParticles': [],
    'eruptionTimer': 0,
    'eruptionActive': 0,
    'asteroidSpawnTimer': 0,
    'bomberSpawnTimer': 0,
    'zoneIntroTimer': 0,
    'previousZoneId': 0,
    'highScore': 0,
    'autoMode': False,
    'boss': None,
    'bossDefeated': False,
    'isBossLevel': True,
    'specialWeapons': [
        {'type': 'laser', 'charges': 3, 'maxCharges': 3, 'cooldownTimer': 0},
        {'type': 'swarm', 'charges': 6, 'maxCharges': 6, 'cooldownTimer': 0},
        {'type': 'mine', 'charges': 9, 'maxCharges': 9, 'cooldownTimer': 0}
    ],
    'selectedWeapon': -1,
    'mines': [],
    'laserBeams': [],
    'comboCount': 0,
    'comboTimer': 0,
    'comboMultiplier': 1,
    'maxCombo': 0,
    'runMissilesDestroyed': 0,
    'runBossesDefeated': 0,
    'achievementToasts': [],
    'weaponsUsedThisLevel': []
}

code1 = encode_state(base_state_1)
code2 = encode_state(base_state_5)

print(f"CODE1:\n{code1}\n")
print(f"CODE2:\n{code2}\n")

with open('code1.txt', 'w', encoding='utf-16le') as f:
    f.write(code1)
with open('code2.txt', 'w', encoding='utf-16le') as f:
    f.write(code2)
with open('codes.txt', 'w', encoding='utf-16le') as f:
    f.write(f"CODE1: {code1}\r\nCODE2: {code2}\r\n")

# Need to update README.md manually with replace_with_git_merge_diff
