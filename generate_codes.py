import json
import base64

def generate_base_state():
    return {
        "score": 10000,
        "credits": 10000,
        "cps": 0,
        "buildings": {
            "solarFarm": 0,
            "scrapYard": 0,
            "munitionsFactory": 0,
            "orbitalMine": 0,
            "defenseContract": 0,
            "aiCore": 0
        },
        "level": 1,
        "cities": [
            {"x": 40, "alive": True, "hp": 100, "maxHp": 100},
            {"x": 160, "alive": True, "hp": 100, "maxHp": 100},
            {"x": 280, "alive": True, "hp": 100, "maxHp": 100},
            {"x": 680, "alive": True, "hp": 100, "maxHp": 100},
            {"x": 800, "alive": True, "hp": 100, "maxHp": 100},
            {"x": 920, "alive": True, "hp": 100, "maxHp": 100}
        ],
        "batteries": [
            {"x": 40, "y": 580, "ammo": 10, "maxAmmo": 10, "disabled": 0},
            {"x": 480, "y": 580, "ammo": 10, "maxAmmo": 10, "disabled": 0},
            {"x": 920, "y": 580, "ammo": 10, "maxAmmo": 10, "disabled": 0}
        ],
        "incomingMissiles": [],
        "counterMissiles": [],
        "explosions": [],
        "particles": [],
        "bombers": [],
        "asteroids": [],
        "gameOver": False,
        "phase": "shop",
        "levelComplete": False,
        "levelTransitionTimer": 0,
        "missileSpawnTimer": 60,
        "missilesSpawnedThisLevel": 0,
        "totalMissilesThisLevel": 10,
        "cursorX": 480,
        "cursorY": 320,
        "stars": [],
        "screenShake": 0,
        "bonusText": [],
        "upgrades": {
            "blastRadius": 0,
            "missileSpeed": 0,
            "extraAmmo": 0,
            "chainReaction": 0,
            "armorPlating": 0,
            "multiShot": 0,
            "empBurst": 0,
            "luckyStrike": 0,
            "autoTurret": 0,
            "shieldGenerator": 0,
            "laserWeapon": 0,
            "swarmWeapon": 0,
            "mineWeapon": 0
        },
        "shopHover": -1,
        "autoTurretTimer": 0,
        "shieldHits": [0, 0, 0, 0, 0, 0],
        "empActive": 0,
        "totalSpent": 0,
        "blizzardAlpha": 0,
        "blizzardParticles": [],
        "eruptionTimer": 0,
        "eruptionActive": 0,
        "asteroidSpawnTimer": 0,
        "bomberSpawnTimer": 0,
        "zoneIntroTimer": 0,
        "previousZoneId": 0,
        "highScore": 0,
        "autoMode": False,
        "boss": None,
        "bossDefeated": False,
        "isBossLevel": False,
        "specialWeapons": [
            {"type": "laser", "charges": 0, "maxCharges": 0, "cooldownTimer": 0},
            {"type": "swarm", "charges": 0, "maxCharges": 0, "cooldownTimer": 0},
            {"type": "mine", "charges": 0, "maxCharges": 0, "cooldownTimer": 0}
        ],
        "selectedWeapon": -1,
        "mines": [],
        "laserBeams": [],
        "comboCount": 0,
        "comboTimer": 0,
        "comboMultiplier": 1,
        "maxCombo": 0,
        "runMissilesDestroyed": 0,
        "runBossesDefeated": 0,
        "achievementToasts": [],
        "weaponsUsedThisLevel": []
    }

state1 = generate_base_state()

state2 = generate_base_state()
state2["level"] = 5
state2["phase"] = "playing"
state2["totalMissilesThisLevel"] = 20
state2["isBossLevel"] = True
state2["upgrades"]["laserWeapon"] = 3
state2["upgrades"]["swarmWeapon"] = 3
state2["upgrades"]["mineWeapon"] = 3
state2["specialWeapons"][0] = {"type": "laser", "charges": 3, "maxCharges": 3, "cooldownTimer": 0}
state2["specialWeapons"][1] = {"type": "swarm", "charges": 6, "maxCharges": 6, "cooldownTimer": 0}
state2["specialWeapons"][2] = {"type": "mine", "charges": 9, "maxCharges": 9, "cooldownTimer": 0}

json1 = json.dumps({"v": 1, "state": state1})
json2 = json.dumps({"v": 1, "state": state2})

code1 = base64.b64encode(json1.encode('utf-8')).decode('utf-8')
code2 = base64.b64encode(json2.encode('utf-8')).decode('utf-8')

print("Code 1:")
print(code1)
print("\nCode 2:")
print(code2)
