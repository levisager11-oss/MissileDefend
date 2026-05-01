const fs = require('fs');

const readmeContent = fs.readFileSync('README.md', 'utf8');

// Find all base64 strings in the README
const matches = [...readmeContent.matchAll(/```\n([a-zA-Z0-9+/=]+)\n```/g)];

if (matches.length !== 2) {
    console.error("Expected to find 2 base64 strings in README.md");
    process.exit(1);
}

const updateState = (base64Str) => {
    const jsonStr = Buffer.from(base64Str, 'base64').toString('utf8');
    const data = JSON.parse(jsonStr);

    // Update state fields
    data.state.credits = data.state.score; // Or some value
    data.state.cps = 0;
    data.state.buildings = {
        "solar_farm": 0,
        "scrap_yard": 0,
        "munitions_factory": 0,
        "orbital_mine": 0,
        "defense_contract": 0,
        "ai_core": 0
    };

    // Cities hp
    data.state.cities = data.state.cities.map(city => ({
        ...city,
        hp: 100,
        maxHp: 100
    }));

    data.state.runMissilesDestroyed = 0;
    data.state.runBossesDefeated = 0;
    data.state.achievementToasts = [];
    data.state.weaponsUsedThisLevel = [];

    const newJsonStr = JSON.stringify(data);
    return Buffer.from(newJsonStr).toString('base64');
};

const newStr1 = updateState(matches[0][1]);
const newStr2 = updateState(matches[1][1]);

let newReadmeContent = readmeContent.replace(matches[0][1], newStr1);
newReadmeContent = newReadmeContent.replace(matches[1][1], newStr2);

fs.writeFileSync('README.md', newReadmeContent);
console.log("README updated successfully!");
