# Missile Command - Zone Defense

A modern, feature-rich reimagining of the classic arcade game Missile Command, built with React, TypeScript, and HTML5 Canvas.

## 🎮 Game Description

Defend your cities from relentless missile attacks across 5 distinct zones with increasing difficulty. Manage your economy, purchase upgrades, and deploy special weapons to survive the onslaught. Face off against powerful bosses every 5 levels and prestige to gain permanent bonuses.

## ✨ Features

### Core Gameplay
- **Zone Progression System**: Battle through 5 unique zones with distinct visual themes and hazards.
- **Dynamic Hazards**: Encounter heat-seeking missiles, bombers, blizzards, decoy missiles, asteroids, and EMP enemies.
- **Boss Battles**: Challenge unique bosses with special attack patterns every 5 levels.
- **Save/Load System**: Export and import your game progress using save codes.
- **Auto-Play Mode**: Unlockable AI assistant (Hint: Konami Code).

### 🏭 Economy & Buildings
Earn credits by destroying missiles and building passive income structures.
- **Solar Farm** (25 Credits): Harvests energy from the sun. (+0.4 CPS)
- **Scrap Yard** (250 Credits): Recycles debris into credits. (+4 CPS)
- **Munitions Factory** (2,500 Credits): Produces and sells ammo. (+25 CPS)
- **Orbital Mine** (15,000 Credits): Automated mining in orbit. (+120 CPS)
- **Defense Contract** (200,000 Credits): Government funding for defense. (+1,000 CPS)
- **AI Core** (2,500,000 Credits): High-frequency trading algorithms. (+6,000 CPS)

### ⚡ Research & Upgrades
Purchase upgrades to improve your defenses and unlock powerful abilities.
- **Blast Radius**: Larger counter-missile explosions.
- **Missile Velocity**: Faster counter-missiles reach targets quicker.
- **Ammo Cache**: +3 ammo per battery each wave.
- **Chain Reaction**: Secondary explosions are larger.
- **Lucky Strike**: Chance for 2x-5x bonus score on kills.
- **Multi-Shot**: Fire extra missiles per click.
- **EMP Burst**: Slow all missiles at wave start.
- **Auto Turret**: Auto-fires at nearest threats periodically.
- **Shield Generator**: Energy shields absorb hits on cities.
- **City Repair**: Rebuild one destroyed city.

**Special Weapons:**
- **Laser Beam**: Instantly destroys everything in its path.
- **Missile Swarm**: Fires 8 missiles in a spread pattern.
- **Area Mine**: Places a proximity mine that auto-detonates.

### ⭐ Orbital Command (Prestige)
Reset your run to earn Command Credits for permanent orbital upgrades.
- **Offense Wing**:
  - **Silo Expansion**: Increase max ammo per battery.
  - **Rapid Rearm**: Reduce special weapon cooldowns.
- **Defense Wing**:
  - **Bunker Tech**: Increase city HP (survive multiple hits).
  - **Aegis Overclock**: Increase shield recharge rate.
- **Economy Wing**:
  - **Automated Salvage**: Increase credits gained from kills.
  - **Market Influence**: Reduce shop prices.

### 🌍 Zones & Hazards
1. **Green Valley**: Standard combat zone.
2. **Desert Outpost**: Heat-seeking missiles track your cities.
3. **Arctic Base**: Bombers drop payloads! Blizzard reduces visibility.
4. **Volcanic Fortress**: Decoy missiles waste your ammo! Eruptions shake the screen.
5. **Space Station**: Asteroids! EMP missiles disable your batteries! All threats combined.

### 👾 Bosses
- **Mothership**: A large vessel that fires multiple salvos of missiles.
- **Fortress**: A rotating station with turrets firing in patterns.
- **Swarm Queen**: An organic entity with tentacles and erratic movement.

### 🏆 Achievements
Unlock achievements to track your progress:
- **First Blood**: Destroy your first missile.
- **Combo Master**: Get a 5x combo.
- **Combo Legend**: Get a 10x combo.
- **Boss Slayer**: Defeat a boss.
- **Triple Threat**: Defeat 3 bosses.
- **Explorer**: Reach Zone 2.
- **World Traveler**: Reach Zone 5.
- **Big Earner**: Score 10,000 in one run.
- **Millionaire**: Score 100,000 in one run.
- **Untouchable**: Complete a level with all cities intact.
- **Weapon Master**: Use all 3 special weapons.
- **Reborn**: Prestige for the first time.

## 🛠️ Technologies Used

- **React 19**: UI and game state management.
- **Vite**: Fast build tool and development server.
- **vite-plugin-singlefile**: Bundles the game into a single HTML file for easy distribution.
- **Tailwind CSS 4**: Modern styling for UI components.
- **TypeScript**: Type-safe code for game logic.
- **HTML5 Canvas**: High-performance rendering for game graphics.
- **Bun**: Fast JavaScript runtime used for running tests.

## 🚀 How to Run

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/missile-command-zone-defense.git
    cd missile-command-zone-defense
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Run tests**:
    ```bash
    bun test
    ```

5.  **Build for production**:
    ```bash
    npm run build
    ```

## 🕹️ Controls

- **Mouse Movement**: Aim crosshair.
- **Left Click**: Fire counter-missile at cursor location.
- **Number Keys (1, 2, 3)**: Select Special Weapon (Laser, Swarm, Mine).
- **0 / Esc**: Deselect Special Weapon.
- **C**: Cancel Auto-Play Mode.
- **Konami Code**: Activate Auto-Play Mode (↑ ↑ ↓ ↓ ← → ← → B A).

## 💾 Save Codes

Use these codes to jump start your game. Click on `[SAVE / LOAD]` in the bottom left corner and paste the code.

**Level 1 Head Start (10,000 Credits)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MTAwMDAsImxldmVsIjoxLCJjaXRpZXMiOlt7IngiOjQwLCJhbGl2ZSI6dHJ1ZX0seyJ4IjoxNjAsImFsaXZlIjp0cnVlfSx7IngiOjI4MCwiYWxpdmUiOnRydWV9LHsieCI6NjgwLCJhbGl2ZSI6dHJ1ZX0seyJ4Ijo4MDAsImFsaXZlIjp0cnVlfSx7IngiOjkyMCwiYWxpdmUiOnRydWV9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJzaG9wIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6NjAsIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6MCwidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6MTAsImN1cnNvclgiOjQ4MCwiY3Vyc29yWSI6MzIwLCJzdGFycyI6W10sInNjcmVlblNoYWtlIjowLCJib251c1RleHQiOltdLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjAsInN3YXJtV2VhcG9uIjowLCJtaW5lV2VhcG9uIjowfSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwiaXNCb3NzTGV2ZWwiOmZhbHNlLCJzcGVjaWFsV2VhcG9ucyI6W3sidHlwZSI6Imxhc2VyIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH1seyJ0eXBlIjoic3dhcm0iLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJtaW5lIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH1dLCJzZWxlY3RlZFdlYXBvbiI6LTEsIm1pbmVzIjpbXSwibGFzZXJCZWFtcyI6W10sImNvbWJvQ291bnQiOjAsImNvbWJvVGltZXIiOjAsImNvbWJvTXVsdGlwbGllciI6MSwibWF4Q29tYm8iOjB9fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MTAwMDAsImxldmVsIjo1LCJjaXRpZXMiOlt7IngiOjQwLCJhbGl2ZSI6dHJ1ZX0seyJ4IjoxNjAsImFsaXZlIjp0cnVlfSx7IngiOjI4MCwiYWxpdmUiOnRydWV9LHsieCI6NjgwLCJhbGl2ZSI6dHJ1ZX0seyJ4Ijo4MDAsImFsaXZlIjp0cnVlfSx7IngiOjkyMCwiYWxpdmUiOnRydWV9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJwbGF5aW5nIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6NjAsIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6MCwidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6MjAsImN1cnNvclgiOjQ4MCwiY3Vyc29yWSI6MzIwLCJzdGFycyI6W10sInNjcmVlblNoYWtlIjowLCJib251c1RleHQiOltdLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjMsInN3YXJtV2VhcG9uIjozLCJtaW5lV2VhcG9uIjozfSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwiaXNCb3NzTGV2ZWwiOnRydWUsInNwZWNpYWxXZWFwb25zIjpbeyJ0eXBlIjoibGFzZXIiLCJjaGFyZ2VzIjozLCJtYXhDaGFyZ2VzIjozLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJzd2FybSIsImNoYXJnZXMiOjYsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6Im1pbmUiLCJjaGFyZ2VzIjo5LCJtYXhDaGFyZ2VzIjo5LCJjb29sZG93blRpbWVyIjowfV0sInNlbGVjdGVkV2VhcG9uIjotMSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MH19
```

## 📝 License

This project is open source.
